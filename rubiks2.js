const Cube = require('cubejs')

/*
* Rubiks
* 
* main class wraping cubejs 'Cube' providing face checking, etc
* face color labeling agnostic
*/
function Rubiks() {

  // get string representation of faces in order U1U2U3...U9R1...F..D..L..B
  this.toString = function() {
    return this.asString()
  }

  // get net representation of the cube using the format below
  //  U
  // LFRB
  //  D
  this.toNet = function() {
    var cubeStr = this.toString()
    var _U, _R, _F, _D, _L, _B

    // extract faces out
    [_U, _R, _F, _D, _L, _B] = [0,9,18,27,36,45,54,63,72].map(i => cubeStr.slice(i, i+9))

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
    [_U, _R, _F, _D, _L, _B] = [0,9,18,27,36,45,54,63,72].map(i => this.toString().slice(i, i+9))

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
  this.checkUpCross = function() {
    var _U, _R, _F, _D, _L, _B
    [_U, _R, _F, _D, _L, _B] = [0,9,18,27,36,45,54,63,72].map(i => this.toString().slice(i, i+9))

    var correctCross = [1,3,5,7].reduce((acc,cur) => acc && (_U[cur] === _U[4]), true)
    var correctSides = _L[1]===_L[4] && _F[1]===_F[4] && _R[1]===_R[4] && _B[1]===_B[4]

    return correctCross && correctSides
  }

  // check Up corners and corresponding side facelets are correct
  // treat Up side as White
  this.checkUpCorners = function() {
    var _U, _R, _F, _D, _L, _B
    [_U, _R, _F, _D, _L, _B] = [0,9,18,27,36,45,54,63,72].map(i => this.toString().slice(i, i+9))

    var correctCorners = [0,2,6,8].reduce((acc,i) => acc && (_U[i] === _U[4]), true)
    var correctSides = [_L,_F,_R,_B].reduce((acc,face) => acc && (face[0]===face[4]) && (face[2]===face[4]), true)
  
    return correctCorners && correctSides
  }

  // check middle layer
  this.checkMiddle = function() {
    var _U, _R, _F, _D, _L, _B
    [_U, _R, _F, _D, _L, _B] = [0,9,18,27,36,45,54,63,72].map(i => this.toString().slice(i, i+9))

    var correctMiddle = [_R, _F, _L, _B].reduce((acc,face) => acc && (face[3]===face[4]) && (face[4]===face[5]), true)

    return correctMiddle
  }

  // check Down cross
  // treat Down side as Yellow
  this.checkDownCross = function() {
    var _U, _R, _F, _D, _L, _B
    [_U, _R, _F, _D, _L, _B] = [0,9,18,27,36,45,54,63,72].map(i => this.toString().slice(i, i+9))

    var correctCross = [1,3,5,7].reduce((acc,i) => acc && (_D[i] === _D[4]), true)
    var correctSides = [_L,_F,_R,_B].reduce((acc,face) => acc && (face[7]===face[4]), true)

    return correctCross && correctSides
  }

  // check Down corners
  // treat Down side as Yellow
  this.checkDownCorners = function() {
    var _U, _R, _F, _D, _L, _B
    [_U, _R, _F, _D, _L, _B] = [0,9,18,27,36,45,54,63,72].map(i => this.toString().slice(i, i+9))

    var correctCorners = [0,2,6,8].reduce((acc,i) => acc && (_D[i] === _D[4]), true)
    var correctSides = [_L,_F,_R,_B].reduce((acc,face) => acc && (face[6]===face[4]) && (face[8]===face[4]), true)
  
    return correctCorners && correctSides
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
Rubiks.prototype.constructor = Rubiks

exports.Rubiks = Rubiks