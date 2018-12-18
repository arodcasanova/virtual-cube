const Cube = require('cubejs')

/*
* Rubiks
* 
* main class wraping cubejs 'Cube' providing face checking, etc
* face color labeling agnostic
*/
function Rubiks() {
  var U, R, F, D, L, B;
  var URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB;
  var UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR;

  // Centers
  [U, R, F, D, L, B] = [0,1,2,3,4,5];
  // Corners
  [URF, UFL, ULB, UBR, DFR, DLF, DBL, DRB] = [0,1,2,3,4,5,6,7];
  // Edges
  [UR, UF, UL, UB, DR, DF, DL, DB, FR, FL, BL, BR] = [0,1,2,3,4,5,6,7,8,9,10,11];

  // get string representation of faces in order U1U2U3...U9R1...F..D..L..B
  this.toString = function() {
    var cubeStr = this.asString()
    // replace face names with colors
    cubeStr = cubeStr.replace(/U/g,'W')
                     .replace(/R/g,'R')
                     .replace(/B/g,'G')
                     .replace(/F/g,'B')
                     .replace(/D/g,'Y')
                     .replace(/L/g,'O')
    return cubeStr
  }

  // get net representation of the cube using the format below
  //  U
  // LFRB
  //  D
  this.toNet = function() {
    var cubeStr = this.toString()
    var _U, _R, _F, _D, _L, _B

    // extract faces out
    [_U, _R, _F, _D, _L, _B] = [0,9,18,27,36,45].map(i => cubeStr.slice(i, i+9))

    var netStr = ''

    // add faces to net string row by row
    for (var row = 0; row < 3; row++) 
      netStr += '   '+_U.slice(3*row, 3*row+3)+'\n'

    for (var row = 0; row < 3; row++) 
      netStr += _L.slice(3*row, 3*row+3) + _F.slice(3*row, 3*row+3) 
                  + _R.slice(3*row, 3*row+3) + _B.slice(3*row, 3*row+3) + '\n'

    for (var row = 0; row < 3; row++) 
      netStr += '   '+_D.slice(3*row, 3*row+3)+'\n'

    return netStr.slice(0,-1)
  }

  // predefined scrambling as dictated by prof Adrian
  this.adrianScramble = function() {
    this.move("F R' B D' R' F' D B' L2 F2 U2 B D L F2 L U' F' L B' R U F' U L'")
    return this
  }

  // get a single face of the cube as string
  this.getFace = function(face) {
    var f = face[0]
    var _U, _R, _F, _D, _L, _B
    [_U, _R, _F, _D, _L, _B] = [0,9,18,27,36,45].map(i => this.toString().slice(i, i+9))

    var faceStr

    if ('Uu'.indexOf(f) !== -1) faceStr = _U
    else if ('Rr'.indexOf(f) !== -1) faceStr = _R
    else if ('Ff'.indexOf(f) !== -1) faceStr = _F
    else if ('Dd'.indexOf(f) !== -1) faceStr = _D
    else if ('Ll'.indexOf(f) !== -1) faceStr = _L
    else if ('Bb'.indexOf(f) !== -1) faceStr = _B

    return faceStr.slice(0,3)+'\n'+faceStr.slice(3,6)+'\n'+faceStr.slice(6,9)
  }

  // check Up cross and corresponding side facelets are correct
  // treat Up side as White
  // TODO: reimplement using ep and eo
  this.checkUpCross = function() {
    var clone = this.clone()

    clone.move(clone.upright())

    var eoCorrect = [UR,UF,UL,UB].reduce((acc,i) => (acc && clone.eo[i]===0), true)
    var epCorrect = [UR,UF,UL,UB].reduce((acc,i) => (acc && clone.ep[i]===i), true)

    return eoCorrect && epCorrect
  }

  // check Up corners and corresponding side facelets are correct
  // treat Up side as White
  this.checkUpCorners = function() {
    var clone = this.clone()

    clone.move(clone.upright())

    var coCorrect = [URF,UFL,ULB,UBR].reduce((acc,i) => (acc && clone.co[i]===0), true)
    var cpCorrect = [URF,UFL,ULB,UBR].reduce((acc,i) => (acc && clone.cp[i]===i), true)

    return coCorrect && cpCorrect
  }

  // check middle layer
  this.checkMiddle = function() {
    var clone = this.clone()

    clone.move(clone.upright())

    var eoCorrect = [FR,FL,BL,BR].reduce((acc,i) => (acc && clone.eo[i]===0), true)
    var epCorrect = [FR,FL,BL,BR].reduce((acc,i) => (acc && clone.ep[i]===i), true)

    return eoCorrect && epCorrect
  }

  // check Down cross
  // treat Down side as Yellow
  this.checkDownCross = function() {
    var clone = this.clone()

    clone.move(clone.upright())

    var eoCorrect = [DR,DF,DL,DB].reduce((acc,i) => (acc && clone.eo[i]===0), true)
    var epCorrect = [DR,DF,DL,DB].reduce((acc,i) => (acc && clone.ep[i]===i), true)

    return eoCorrect && epCorrect
  }

  // check Down corners
  // treat Down side as Yellow
  this.checkDownCorners = function() {
    var clone = this.clone()

    clone.move(clone.upright())

    var coCorrect = [DFR,DLF,DBL,DRB].reduce((acc,i) => (acc && clone.co[i]===0), true)
    var cpCorrect = [DFR,DLF,DBL,DRB].reduce((acc,i) => (acc && clone.cp[i]===i), true)

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

}

Rubiks.prototype = new Cube()
Rubiks.prototype.constructor = Cube.constructor

module.exports = Rubiks