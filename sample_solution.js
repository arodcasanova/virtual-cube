/*
 * Sample solution intended to be implemented by students.
 * Implement a solver function. Should be called by another file.
 */

// solver function
// take a cube object as an input and manipulate it
function solve(cube) {

// white cross

// for each side color
cube.middleColors.forEach((color) => {
  // focus on Up Right edge
  // TODO: shorten function names?
  var focusColor = cube.getCorrectPieceColor('UR')
  var currentPosition = cube.findPiece(focusColor)
  cube.moveToUpRightFrom(currentPosition)
  if (cube.edgeIsReversed('UR')) {
    cube.move("R' U F' U'")
  }

  cube.move('y')
})

}

module.exports = solve