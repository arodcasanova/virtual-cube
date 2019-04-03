// function to solve a cube
// take a Rubiks object as an input and manipulate it directly
function solve(cube) {

cube.setStart()

var piece

// start white cross

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

// start white corners

piece = cube.findPiece('WRB')
if (piece.includes('U')) { // make wrapper function
  cube.moveFromUpToDown(piece)
}
while (cube.findPiece('WRB') != 'DFR') { // make wrapper function?
  cube.move('D')
}
while (cube.cornerUpFrontRightNotCorrect('WRB')) {
  cube.move("R' D' R D")
}

cube.rotateCW()

piece = cube.findPiece('WGR')
if (piece.includes('U')) { // make wrapper function
  cube.moveFromUpToDown(piece)
}
while (cube.findPiece('WGR') != 'DFR') { // make wrapper function?
  cube.move('D')
}
while (cube.cornerUpFrontRightNotCorrect('WGR')) {
  cube.move("R' D' R D")
}

cube.rotateCW()

piece = cube.findPiece('WOG')
if (piece.includes('U')) { // make wrapper function
  cube.moveFromUpToDown(piece)
}
while (cube.findPiece('WOG') != 'DFR') { // make wrapper function?
  cube.move('D')
}
while (cube.cornerUpFrontRightNotCorrect('WOG')) {
  cube.move("R' D' R D")
}

cube.rotateCW()

piece = cube.findPiece('WBO')
if (piece.includes('U')) { // make wrapper function
  cube.moveFromUpToDown(piece)
}
while (cube.findPiece('WBO') != 'DFR') { // make wrapper function?
  cube.move('D')
}
while (cube.cornerUpFrontRightNotCorrect('WBO')) {
  cube.move("R' D' R D")
}

cube.rotateCW()

// done white corners

}

// export solve function out to be integrated elsewhere
module.exports = solve