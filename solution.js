let rubiks = require("./src/rubiks.js")
let cube = new rubiks()

cube.randomize()
cube.setStart()

cube.whiteEdgesNames().forEach(edgeName => {
  edge = cube.findPiece(edgeName)
  cube.moveToUpFront(edge)
  if (cube.edgeIsReversed("UF")) {
      cube.rotateCCW()
      cube.move("R' U F' U'")
      cube.rotateCW()
  }
  cube.rotateCW()
})

cube.check()