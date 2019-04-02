const Rubiks = require('./rubiks')

// TODO: parametrize so that no explicit edge color is used i.e. W, Y

function printUp(cube) {
  cube.move("x'")
  cube.printNet()
  console.log('------------')
  cube.move("x")
}

var cube = new Rubiks()

cube.adrianScramble()

// start white cross

for (var side = 0; side < 4; side++) {
  printUp(cube)
  // find out color of right face
  var rColor = cube.getFaceColor('R')
  console.log(cube.getFace('R'))
  console.log('right color:', rColor)
  var focusPiece = 'W'+rColor
  console.log('position of the piece:', cube.findPiece(focusPiece))

  var mv = cube.findPiece(focusPiece)
  var newMv
  mv.split('').map(c => {if(c!='U')newMv=c})
  console.log('move to make:', newMv)

  var count = 0
  while (!cube.findPiece(focusPiece).includes('D')) {
    cube.move(newMv)
    count++
  }

  printUp(cube)

  cube.move('D')
  for (var i = 0; i < count; i++) cube.move(newMv+"'")
  while (!cube.findPiece(focusPiece).includes('R')) cube.move('D')
  while (!cube.findPiece(focusPiece).includes('U')) cube.move('R')

  printUp(cube)

  if (cube.edgeIsReversed('UR')) cube.move("R' U F' U'")

  printUp(cube)
  console.log('Done color', rColor)

  cube.move('y')
}

// done white cross

console.log('Done white cross')

// start white corner

for (var side = 0; side < 4; side++) {
  printUp(cube)

  var rColor = cube.getFaceColor('R')
  var fColor = cube.getFaceColor('F')
  var focusPiece = 'W'+rColor+fColor
  console.log('Piece to find:', focusPiece)
  var pos = cube.findPiece(focusPiece)
  console.log('Current position:', pos)

  if (pos.includes('U')) {
    cube.move(pos[2])
    cube.move('D')
    cube.move(pos[2]+"'")
  }

  while (cube.findPiece(focusPiece) != 'DFR') cube.move('D')
  while (cube.findPiece(focusPiece) != 'URF' || cube.cornerIsDisoriented('URF')) cube.move("R' D' R D")

  printUp(cube)
  console.log('Done color', focusPiece)
  cube.move('y')
}

// done white corners

console.log('Done white corners')

cube.move('z2')

// start middle layer

for (var side = 0; side < 4; side++) {
  printUp(cube)

  var fColor = cube.getFaceColor('F')
  var rColor = cube.getFaceColor('R')
  var focusPiece = fColor+rColor

  console.log('Color to find:', focusPiece)
  console.log('Current position:', cube.findPiece(focusPiece))

  if (!cube.findPiece(focusPiece).includes('U')) {
    var count = 0
    while (cube.findPiece(focusPiece)!='FR') {
      cube.move('y')
      count++
    }
    cube.move("U R U' R' U' F' U F")
    for (var i = 0; i < count; i++) cube.move("y'")
  }

  printUp(cube)

  while (!cube.findPiece(focusPiece).includes('F')) cube.move('U')
  if (cube.getFace('F')[1] == fColor) {
    cube.move("U R U' R' U' F' U F")
  } else {
    cube.move('y')
    cube.move("U'")
    cube.move("U' L' U L U F U' F'")
    cube.move("y'")
  }

  printUp(cube)
  console.log('Done color', focusPiece)

  cube.move('y')
}

// done middle layer

console.log('Done middle layer')

function checkYellowCross(cube) {
  var s = cube.getFaceStr('U')
  if (s[1]==cube.FACE_COLORS[3] &&
      s[3]==cube.FACE_COLORS[3] &&
      s[4]==cube.FACE_COLORS[3] &&
      s[5]==cube.FACE_COLORS[3] &&
      s[7]==cube.FACE_COLORS[3]) {
    return true
  }
  return false
}

function getYellowLine(cube) {
  for (var i = 0; i < 2; i++) {
    var s = cube.getFaceStr('U')
    if (s[3]==cube.FACE_COLORS[3] &&
        s[4]==cube.FACE_COLORS[3] &&
        s[5]==cube.FACE_COLORS[3]) {
      return true
    }
    cube.move('U')
  }
  return false
}

function getYellowElbow(cube) {
  for (var i = 0; i < 4; i++) {
    var s = cube.getFaceStr('U')
    if (s[1]==cube.FACE_COLORS[3] &&
        s[3]==cube.FACE_COLORS[3] &&
        s[4]==cube.FACE_COLORS[3]) {
      return true
    }
    cube.move('U')
  }
  return false
}

// start yellow cross

if (!checkYellowCross(cube)) {
  if (!getYellowLine(cube)) {
    if (!getYellowElbow(cube)) {
      cube.move("F R U R' U' F'")
      getYellowElbow(cube)
    }
    cube.move("F R U R' U' F'")
    getYellowLine(cube)
  }
  cube.move("F R U R' U' F'")
}

printUp(cube)

// done yellow cross

console.log('Done yellow cross')

// start yellow edges

var fColor = cube.getFaceColor('F')
var focusPiece = 'Y'+fColor
while (!cube.findPiece(focusPiece).includes('F')) cube.move('U')
cube.move("y'")

// loop only 2 times since the first and last one must be correct
for (var side = 0; side < 2; side++) {
  var fColor = cube.getFaceColor('F')
  var focusPiece = 'Y'+fColor
  var pos = cube.findPiece(focusPiece)
  if (pos.includes('L')) {
    cube.move("R U R' U R U U R' U")
  } else if (pos.includes('B')) {
    cube.move("y'")
    cube.move("R U R' U R U U R' U")
    cube.move("y")
    cube.move("R U R' U R U U R' U")
  }
  cube.move("y'")
}

printUp(cube)

// done yellow edges

console.log('Done yellow edges')

// start yellow corner positions

function atLeastOneYellowCornerPositionCorrect(cube) {
  //var c = cube.clone()
  for (var i = 0; i < 4; i++) {
    if (cube.checkCorrectPiece('URF')) return true
    cube.move('y')
  }
  return false
}

function allYellowCornerPositionCorrect(cube) {
  return (
    cube.checkCorrectPiece('URF') &&
    cube.checkCorrectPiece('UFL') &&
    cube.checkCorrectPiece('ULB') &&
    cube.checkCorrectPiece('UBR') 
  )
}

while (!atLeastOneYellowCornerPositionCorrect(cube)) {
  cube.move("U R U' L' U R' U' L")
}
while (!allYellowCornerPositionCorrect(cube)) {
  cube.move("U R U' L' U R' U' L")
}

printUp(cube)

// done yellow corner positions

console.log('Done yellow corner positions')

// start yellow corner orientations

function yellowCornerCorrectPiece(cube) {
  var fColor = cube.getFaceStr('F')[1]
  var rColor = cube.getFaceStr('R')[1]
  var focusPiece = 'y'+rColor+fColor
  return cube.findPiece(focusPiece) == 'URF'
}

for (var side = 0; side < 4; side++) {
  while (cube.cornerIsDisoriented('URF') || !yellowCornerCorrectPiece(cube)) {
    cube.move("R' D' R D")
  }
  printUp(cube)
  cube.move('U')
}

printUp(cube)

cube.move('z2')

printUp(cube)