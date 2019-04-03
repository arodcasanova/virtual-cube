// function to solve a cube
// take a Rubiks object as an input and manipulate it directly
function solve(cube) {

cube.setStart()

var piece

piece = cube.findPiece("WB")
cube.moveToUpFront(piece)
if (cube.edgeIsReversed("UF")) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

piece = cube.findPiece("WR")
cube.moveToUpFront(piece)
if (cube.edgeIsReversed("UF")) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

piece = cube.findPiece("WG")
cube.moveToUpFront(piece)
if (cube.edgeIsReversed("UF")) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

piece = cube.findPiece("WO")
cube.moveToUpFront(piece)
if (cube.edgeIsReversed("UF")) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

// done white cross

}

// export solve function out to be integrated elsewhere
module.exports = solve