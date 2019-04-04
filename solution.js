let rubiks = require("./src/rubiks.js")
let cube = new rubiks()

cube.randomize()
cube.setStart()

let piece = cube.findPiece("WB")
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
cube.check()