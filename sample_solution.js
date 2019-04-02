/*
 * Sample solution intended to be implemented by students.
 * Implement a solver function. Should be called by another file.
 */

cube.setStart()

let solveWhiteCross = () => {
  let wbEdge = cube.findPiece("WB")
  cube.moveToUpFront(wbEdge)
  if (cube.edgeIsReversed(wbEdge)) {
    cube.rotateCCW()
    cube.move("R' U F' U'")
    cube.rotateCW()
  }
  
  cube.rotateCW()

  let woEdge = cube.findPiece("WO")
  cube.moveToUpFront(woEdge)
  if (cube.edgeIsReversed(woEdge)) {
    cube.rotateCCW()
    cube.move("R' U F' U'")
    cube.rotateCW()
  }

  cube.rotateCW()

  let wgEdge = cube.findPiece("WG")
  cube.moveToUpFront(wgEdge)
  if (cube.edgeIsReversed(wgEdge)) {
    cube.rotateCCW()
    cube.move("R' U F' U'")
    cube.rotateCW()
  }

  cube.rotateCW()

  let wrEdge = cube.findPiece("WR")
  cube.moveToUpFront(wrEdge)
  if (cube.edgeIsReversed(wrEdge)) {
    cube.rotateCCW()
    cube.move("R' U F' U'")
    cube.rotateCW()
  }

  cube.rotateCW()
}

  // done white cross

  // start white corners

  // piece = cube.findPiece('WRB')
  // if (piece.includes('U')) { // make wrapper function
  //   cube.moveFromUpToDown(piece)
  // }
  // while (cube.findPiece('WRB') != 'DFR') { // make wrapper function?
  //   cube.move('D')
  // }
  // while (cube.cornerUpFrontRightNotCorrect('WRB')) {
  //   cube.move("R' D' R D")
  // }

  // cube.rotateCW()

  // done white corners

}

