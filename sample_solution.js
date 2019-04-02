/*
 * Sample solution intended to be implemented by students.
 * Implement a solver function. Should be called by another file.
 */

// solver function
// take a cube object as an input and manipulate it
function solve(cube) {

// white cross
/*
// for each side color
cube.middleColors.forEach((color) => {
  // focus on Up Right edge
  // TODO: shorten function names?
  //var focusColor = cube.getCorrectPieceColor('UR')
  var focucColor = 'W'+color
  var currentPosition = cube.findPiece(focusColor)
  cube.moveToUpRightFrom(currentPosition)
  if (cube.edgeIsReversed('UR')) {
    cube.move("R' U F' U'")
  }
  
  cube.move('y')
})
*/

cube.setStart()

var piece

piece = cube.findPiece("WB")
cube.moveToUpFront(piece)
if (cube.edgeIsReversed('UF')) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

piece = cube.findPiece("WR")
cube.moveToUpFront(piece)
if (cube.edgeIsReversed('UF')) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

piece = cube.findPiece("WG")
cube.moveToUpFront(piece)
if (cube.edgeIsReversed('UF')) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

piece = cube.findPiece("WO")
cube.moveToUpFront(piece)
if (cube.edgeIsReversed('UF')) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

// done white cross

// start white corners

piece = cube.findPiece('WRB')
if (cube.onFace(piece, 'U')) { // make wrapper function
  cube.moveFromUpToDown(piece)
}
while (!cube.pieceCompare(cube.findPiece('WRB'), 'DFR')) { // make wrapper function?
  cube.move('D')
}
while (cube.cornerUpFrontRightNotCorrect('WRB')) {
  cube.move("R' D' R D")
}

cube.rotateCW()

piece = cube.findPiece('WGR')
if (cube.onFace(piece, 'U')) { // make wrapper function
  cube.moveFromUpToDown(piece)
}
while (!cube.pieceCompare(cube.findPiece('WGR'), 'DFR')) { // make wrapper function?
  cube.move('D')
}
while (cube.cornerUpFrontRightNotCorrect('WGR')) {
  cube.move("R' D' R D")
}

cube.rotateCW()

piece = cube.findPiece('WOG')
if (cube.onFace(piece, 'U')) { // make wrapper function
  cube.moveFromUpToDown(piece)
}
while (!cube.pieceCompare(cube.findPiece('WOG'), 'DFR')) { // make wrapper function?
  cube.move('D')
}
while (cube.cornerUpFrontRightNotCorrect('WOG')) {
  cube.move("R' D' R D")
}

cube.rotateCW()

piece = cube.findPiece('WBO')
if (cube.onFace(piece, 'U')) { // make wrapper function
  cube.moveFromUpToDown(piece)
}
while (!cube.pieceCompare(cube.findPiece('WBO'), 'DFR')) { // make wrapper function?
  cube.move('D')
}
while (cube.cornerUpFrontRightNotCorrect('WBO')) {
  cube.move("R' D' R D")
}

cube.rotateCW()

// done white corners

}

module.exports = solve