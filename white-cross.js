let rubiks = require("./src/rubiks.js")
let cube = new rubiks()

cube.randomize()
cube.setStart()

let wb = cube.findPiece("WB")
cube.moveToUpFront(wb)
if (cube.edgeIsReversed("UF")) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

let wr = cube.findPiece("WR")
cube.moveToUpFront(wr)
if (cube.edgeIsReversed("UF")) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

let wg = cube.findPiece("WG")
cube.moveToUpFront(wg)
if (cube.edgeIsReversed("UF")) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.rotateCW()

let wo = cube.findPiece("WO")
cube.moveToUpFront(wo)
if (cube.edgeIsReversed("UF")) {
  cube.rotateCCW()
  cube.move("R' U F' U'")
  cube.rotateCW()
}

cube.check()