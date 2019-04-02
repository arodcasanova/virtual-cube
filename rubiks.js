const Cube = require('cubejs')
const fs = require('fs')
/*
* Rubiks
* 
* main class wraping cubejs 'Cube' providing face checking, etc
* face color labeling agnostic
*/
function Rubiks() {
  // These are the definitions of piece indices.
  // Code becomes much more readible when these variable names are just used 
  // as opposed to using a map.
  // Also the same convention as cubejs source.
  var U, R, F, D, L, B;
  var URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB;
  var UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR;

  // Centers
  [U, R, F, D, L, B] = [0, 1, 2, 3, 4, 5];
  // Corners
  [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0, 1, 2, 3, 4, 5, 6, 7];
  // Edges
  [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  var CORNER_NAMES = ['URF', 'UFL', 'ULB', 'UBR', 'DFR', 'DLF', 'DBL', 'DRB']
  var EDGE_NAMES = ['UR', 'UF', 'UL', 'UB', 'DR', 'DF', 'DL', 'DB', 'FR', 'FL', 'BL', 'BR']
  var FACE_NAMES = ['U', 'R', 'F', 'D', 'L', 'B']
  var FACE_COLORS = ['W', 'R', 'B', 'Y', 'O', 'G']

  this.CORNER_NAMES = CORNER_NAMES
  this.EDGE_NAMES = EDGE_NAMES
  this.FACE_NAMES = FACE_NAMES
  this.FACE_COLORS = FACE_COLORS

  // get string representation of faces in order U1U2U3...U9R1...F..D..L..B
  this.toString = function() {
    var cubeStr = this.asString()
    // replace face names with colors
    cubeStr = cubeStr.split('').map(function(face) {
      return FACE_COLORS[FACE_NAMES.indexOf(face)]
    })
    return cubeStr.join('')
  }

  // get net representation of the cube using the format below
  //  U
  // LFRB
  //  D
  this.toNet = function() {
    var cubeStr = this.toString()
    var _U, _R, _F, _D, _L, _B

    // extract faces out
    [_U, _R, _F, _D, _L, _B] = [0, 9, 18, 27, 36, 45].map(i => cubeStr.slice(i, i+9))

    var netStr = ''

    // add faces to net string row by row
    for (var row = 0; row < 3; row++) 
      netStr += '   '+_U.slice(3*row, 3*row+3)+'\n'

    for (var row = 0; row < 3; row++) 
      netStr += _L.slice(3*row, 3*row+3) + _F.slice(3*row, 3*row+3) 
                  + _R.slice(3*row, 3*row+3) + _B.slice(3*row, 3*row+3) + '\n'

    for (var row = 0; row < 3; row++) 
      netStr += '   '+_D.slice(3*row, 3*row+3)+'\n'

    return netStr.slice(0, -1)
  }

  this.printNet = function() {
    console.log(this.toNet())
  }

  // predefined scrambling as dictated by prof Adrian
  this.scramble = function() {
    this.move("F R' B D' R' F' D B' L2 F2 U2 B D L F2 L U' F' L B' R U F' U L'")
    return this
  }

  // get a single face of the cube as string
  this.getFace = function(face) {
    var f = face[0]
    var _U, _R, _F, _D, _L, _B
    [_U, _R, _F, _D, _L, _B] = [0, 9, 18, 27, 36, 45].map(i => this.toString().slice(i, i+9))

    var faceStr

    if ('Uu'.includes(f)) faceStr = _U
    else if ('Rr'.includes(f)) faceStr = _R
    else if ('Ff'.includes(f)) faceStr = _F
    else if ('Dd'.includes(f)) faceStr = _D
    else if ('Ll'.includes(f)) faceStr = _L
    else if ('Bb'.includes(f)) faceStr = _B

    return faceStr.slice(0, 3)+'\n'+faceStr.slice(3, 6)+'\n'+faceStr.slice(6, 9)
  }

  this.getFaceStr = function(face) {
    var f = face[0]
    var _U, _R, _F, _D, _L, _B
    [_U, _R, _F, _D, _L, _B] = [0, 9, 18, 27, 36, 45].map(i => this.toString().slice(i, i+9))

    var faceStr

    if ('Uu'.includes(f)) faceStr = _U
    else if ('Rr'.includes(f)) faceStr = _R
    else if ('Ff'.includes(f)) faceStr = _F
    else if ('Dd'.includes(f)) faceStr = _D
    else if ('Ll'.includes(f)) faceStr = _L
    else if ('Bb'.includes(f)) faceStr = _B

    return faceStr
  }

  // check Up cross and corresponding side facelets are correct
  // treat Up side as White
  // TODO: reimplement using ep and eo
  this.checkUpCross = function() {
    var clone = this.clone()

    clone.move(clone.upright())

    // 2 4 5 6 8, [2, 5]
    let stateString = this.toString()
    let whiteIndices = [2, 4, 5, 6, 8]
    let faceletIndices = [2, 5]

    whiteIndices.forEach(i => {
      if (stateString[i] != 'W') {
        return false
      }
    })

    

    var eoCorrect = [UR, UF, UL, UB].reduce((acc, i) => (acc && clone.eo[i]===0), true)
    var epCorrect = [UR, UF, UL, UB].reduce((acc, i) => (acc && clone.ep[i]===i), true)

    return eoCorrect && epCorrect
  }

  // check Up corners and corresponding side facelets are correct
  // treat Up side as White
  this.checkUpCorners = function() {
    var clone = this.clone()

    let whiteCrossDone = this.checkUpCross()

    clone.move(clone.upright())

    var coCorrect = [URF, UFL, ULB, UBR].reduce((acc, i) => (acc && clone.co[i]===0), true)
    var cpCorrect = [URF, UFL, ULB, UBR].reduce((acc, i) => (acc && clone.cp[i]===i), true)

    return whiteCrossDone && coCorrect && cpCorrect
  }

  // check middle layer
  this.checkMiddle = function() {
    var clone = this.clone()

    let whiteCornersDone = this.checkUpCorners()

    clone.move(clone.upright())

    var eoCorrect = [FR, FL, BL, BR].reduce((acc, i) => (acc && clone.eo[i]===0), true)
    var epCorrect = [FR, FL, BL, BR].reduce((acc, i) => (acc && clone.ep[i]===i), true)

    return whiteCornersDone && eoCorrect && epCorrect
  }

  // check Down cross
  // treat Down side as Yellow
  this.checkDownCross = function() {
    var clone = this.clone()

    let middleLayerDone = this.checkMiddle()

    clone.move(clone.upright())

    var eoCorrect = [DR, DF, DL, DB].reduce((acc, i) => (acc && clone.eo[i]===0), true)
    var epCorrect = [DR, DF, DL, DB].reduce((acc, i) => (acc && clone.ep[i]===i), true)

    return middleLayerDone && eoCorrect && epCorrect
  }

  this.checkYellowEdges = function() {
    var clone = this.clone()

    let yellowCrossDone = this.checkDownCross()


  }

  // check Down corners
  // treat Down side as Yellow
  this.checkDownCorners = function() {
    var clone = this.clone()

    clone.move(clone.upright())

    var coCorrect = [DFR, DLF, DBL, DRB].reduce((acc, i) => (acc && clone.co[i]===0), true)
    var cpCorrect = [DFR, DLF, DBL, DRB].reduce((acc, i) => (acc && clone.cp[i]===i), true)

    return coCorrect && cpCorrect
  }

  this.checkAll = function() {
    if (this.checkUpCross()) {
      console.log('Up cross OK...')
    } else {
      console.log('Up cross not finished')
      return
    }

    if (this.checkUpCorners()) {
      console.log('Up corners OK...')
    } else {
      console.log('Up corners not finished')
      return
    }

    if (this.checkMiddle()) {
      console.log('Middle layer OK...')
    } else {
      console.log('Middle layer not finished')
      return
    }

    if (this.checkDownCross()) {
      console.log('Down cross OK...')
    } else {
      console.log('Down cross not finished')
      return
    }

    if (this.checkDownCorners()) {
      console.log('Down corners OK...')
      console.log('ALL FINISHED PERFECT. GREAT JOB')
    } else {
      console.log('Down corners not finished')
      return
    }
  }

  // rotate the cube to an upright position (white up, blue front)
  this.setStart = function() {
    this.move(this.upright())
  }

  // flip the cube upside down, with front side unchanged
  this.flip = function() {
    this.move('z2')
  }

  // translate a string of face colors into string of face names
  this.colorToFaceName = function(colorStr) {
    var faceStr = colorStr.toUpperCase().split('').map(function(color) {
      return FACE_NAMES[FACE_COLORS.indexOf(color)]
    }).join('')

    return faceStr
  }

  // find an edge specified by edgeColor
  // return names of the 2 faces in a string ex: 'FR'
  // edgeColor should be like 'WB', 'RY'
  // TODO: check for invalid colors
  this.findEdge = function(edgeColor) {
    var edgeToFind = edgeColor.toUpperCase().replace(/[WRBYOG]/g, token => {
      return FACE_NAMES[FACE_COLORS.indexOf(token)]
    })
    var edgeIdx

    for (var i = 0; i < EDGE_NAMES.length; i++) {
      var match = edgeToFind.split('')
                            .map(t => EDGE_NAMES[i].indexOf(t))
                            .reduce((acc, cur) => (acc && cur!==-1), true)
      if (match) {
        edgeIdx = i
        break
      }
    }

    return EDGE_NAMES[this.ep.indexOf(edgeIdx)]
  }

  // check if an edge has to be flipped
  // edgeName should be like 'UF', 'FR'
  // TODO: check for invalid name
  this.edgeIsReversed = function(edgeName) {
    edgeName = edgeName.toUpperCase()
    if (!EDGE_NAMES.includes(edgeName)) {
      var temp = edgeName[0]
      edgeName[0] = edgeName[1]
      edgeName[1] = temp
    }
    var edgeIdx = EDGE_NAMES.indexOf(edgeName)
    return this.eo[edgeIdx]===1
  }

  // find the position of the corner with specified colors
  // return names of the faces involved in a string ex: 'UFR'
  // cornerColor should be like 'WBR', 'WRG'
  // TODO: check for invalid colors
  this.findCorner = function(cornerColor) {
    // translate colors to face names
    var cornerToFind = cornerColor.toUpperCase().replace(/[WRBYOG]/g, token => {
      return FACE_NAMES[FACE_COLORS.indexOf(token)]
    })
    var cornerIdx

    // iterate through corners
    for (var i = 0; i < CORNER_NAMES.length; i++) {
      var match = cornerToFind.split('')
                            .map(t => CORNER_NAMES[i].indexOf(t))
                            .reduce((acc, cur) => (acc && cur!==-1), true)
      if (match) {
        cornerIdx = i
        break
      }
    }

    return CORNER_NAMES[this.cp.indexOf(cornerIdx)]
  }

  // find the orientation of a corner at a specified position
  // cornerName should be like 'URF', 'UFR' (in any order)
  // return:
  // - 0 if orientation is correct
  // - 1 or 2 if orientation is incorrect, one of the two ways
  // warning: not meaningful if corner in the position is not the right pieces
  this.cornerIsDisoriented = function(cornerName) {
    var cornerIdx

    cornerName = cornerName.toUpperCase()
    // get index of this cornerName
    for (var i = 0; i < CORNER_NAMES.length; i++) {
      for (var j = 0; j < 3; j++) {
        if (CORNER_NAMES[i].indexOf(cornerName[j]) === -1) continue
      }
      cornerIdx = i
      // return the value of co (corner orientation)
      return this.co[cornerIdx]
    }

    return false
  }

  // find any piece with specified color
  // TODO: throw error for wrong color length
  this.findPiece = function(pieceColor) {
    if (pieceColor.length === 2) return this.findEdge(pieceColor)
    else if (pieceColor.length === 3) return this.findCorner(pieceColor)
    else return undefined
  }

  this.shareFace = function(color1, color2) {
    var loc1 = this.findPiece(color1)
    var loc2 = this.findPiece(color2)

    var re = new RegExp('['+loc1+']')
    if (loc2.match(re)) return true
    else return false
  }

  this.getFaceColor = function(face) {
    return this.getFace(face)[5]
  }

  this.checkCorrectPiece = function(piece) {
    var correctColor = piece.split('').map(f => this.getFaceColor(f)).join('')
    return this.findPiece(correctColor) == piece
  } 

  // components specific to beginner solution used in the summer camp

  this.middleColors = [FACE_COLORS[1], FACE_COLORS[2], FACE_COLORS[4], FACE_COLORS[5]]

  this.getCorrectPieceColor = function(pos) {
    var focusPiece = pos.split('').map(p => this.getFaceColor(p)).join('')
    return focusPiece
  }

  this.getEdgePieceColorAt = function(pos) {
    var edgeName = EDGE_NAMES[this.ep[EDGE_NAMES.indexOf(pos)]]
    var focusColor = edgeName.split('')
                             .map(p => FACE_COLORS[FACE_NAMES.indexOf(p)])
                             .join('')
    return focusColor
  }

  this.getCornerPieceColorAt = function(pos) {
    var cornerName = CORNER_NAMES[this.cp[CORNER_NAMES.indexOf(pos)]]
    var focusColor = cornerName.split('')
                               .map(p => FACE_COLORS[FACE_NAMES.indexOf(p)])
                               .join('')
    return focusColor
  }

  this.moveToUpRightFrom = function(pos) {
    var focusColor = this.getEdgePieceColorAt(pos)

    var newMv
    // find the move that will get the to the Down face
    pos.split('').map(c => {if(c!='U')newMv=c})

    var count = 0
    while (!this.findPiece(focusColor).includes('D')) {
      this.move(newMv)
      count++
    }

    this.move('D')
    for (var i = 0; i < count; i++) this.move(newMv+"'")
    while (!this.findPiece(focusColor).includes('R')) this.move('D')
    while (!this.findPiece(focusColor).includes('U')) this.move('R')
  }

  this.moveToUpFront = function(pos) {
    var focusColor = this.getEdgePieceColorAt(pos)

    var newMv
    // find the move that will get the to the Down face
    pos.split('').map(c => {if(c!='U')newMv=c})

    var count = 0
    while (!this.findPiece(focusColor).includes('D')) {
      this.move(newMv)
      count++
    }

    this.move('D')
    for (var i = 0; i < count; i++) this.move(newMv+"'")
    while (!this.findPiece(focusColor).includes('F')) this.move('D')
    while (!this.findPiece(focusColor).includes('U')) this.move('F')
  }

  this.rotateCW = function() {
    this.move("y")
  }

  this.rotateCCW = function() {
    this.move("y'")
  }

  this.cornerUpFrontRightNotCorrect = function(color) {
    return this.cornerIsDisoriented('URF') || this.findPiece(color)!='URF'
  }

  this.moveFromUpToDown = function(pos) {
    this.move(pos[2])
    this.move('D')
    this.move(pos[2]+"'")
  }

  this.check = function() {
    let cubeState = {
      "whiteCross": this.checkUpCross(),
      "whiteCorners": this.checkUpCorners(),
      "middleLayer": this.checkMiddle(),
      "yellowCross": this.checkDownCross(),
      "yellowEdges": this.checkYellowEdges(),
      "yellowCornersPlacement": false,
      "yellowCornersOrientation": false,
      "state": this.toString()
    }
    let fs = require('fs');
    let json = JSON.stringify(cubeState)
    fs.writeFile('cube-state.json', json, 'utf8', (err) => {
      if (err) {
        console.log("Error writing JSON")
      }
    });
  }
}

Rubiks.prototype = new Cube()
Rubiks.prototype.constructor = Cube.constructor

module.exports = Rubiks