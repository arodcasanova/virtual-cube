/*
 * Sample solution intended to be implemented by students.
 * Implement a solver function. Should be called by another file.
 */
let Rubiks = require('./rubiks')
let cube = new Rubiks()

let solveWhiteCross = () => {
  let wbEdge = cube.findPiece("WB")
  cube.moveToUpFront(wbEdge)
  if (cube.edgeIsReversed("UF")) {
    cube.rotateCCW()
    cube.move("R' U F' U'")
    cube.rotateCW()
  }
}

let solveCube = () => {
  cube.setStart()
  solveWhiteCross()
  cube.check()
}

solveCube()