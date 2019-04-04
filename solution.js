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

// start middle layer

cube.flip()

piece = cube.findPiece("OB")
if (!cube.onFace(piece, "U")) {
  cube.moveMiddleToUp("OB")
}
while (cube.findPiece("OB") != "UF") {
  cube.move("U")
}
if (cube.frontColorMatchCenter()) {
  cube.move("U R U' R' U' F' U F") // right algorithm
} else {
  cube.move("U'")
  cube.rotateCW()
  cube.move("U' L' U L U F U' F'") // left algorithm
  cube.rotateCCW()
}

cube.rotateCW()

piece = cube.findPiece("GO")
if (!cube.onFace(piece, "U")) {
  cube.moveMiddleToUp("GO")
}
while (cube.findPiece("GO") != "UF") {
  cube.move("U")
}
if (cube.frontColorMatchCenter()) {
  cube.move("U R U' R' U' F' U F") // right algorithm
} else {
  cube.move("U'")
  cube.rotateCW()
  cube.move("U' L' U L U F U' F'") // left algorithm
  cube.rotateCCW()
}

cube.rotateCW()

piece = cube.findPiece("RG")
if (!cube.onFace(piece, "U")) {
  cube.moveMiddleToUp("RG")
}
while (cube.findPiece("RG") != "UF") {
  cube.move("U")
}
if (cube.frontColorMatchCenter()) {
  cube.move("U R U' R' U' F' U F") // right algorithm
} else {
  cube.move("U'")
  cube.rotateCW()
  cube.move("U' L' U L U F U' F'") // left algorithm
  cube.rotateCCW()
}

cube.rotateCW()

piece = cube.findPiece("BR")
if (!cube.onFace(piece, "U")) {
  cube.moveMiddleToUp("BR")
}
while (cube.findPiece("BR") != "UF") {
  cube.move("U")
}
if (cube.frontColorMatchCenter()) {
  cube.move("U R U' R' U' F' U F") // right algorithm
} else {
  cube.move("U'")
  cube.rotateCW()
  cube.move("U' L' U L U F U' F'") // left algorithm
  cube.rotateCCW()
}

cube.rotateCW()



}
// export solve function out to be integrated elsewhere
module.exports = solve