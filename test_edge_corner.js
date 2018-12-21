const Rubiks = require('./rubiks2')

var cube = new Rubiks()

console.log(cube.findEdge('WB')==='UF') // UF
console.log(cube.findEdge('BW')==='UF') // UF
console.log(cube.findEdge('YR')==='DR') // DR
console.log(cube.findEdge('WY')) // undefined

console.log()

console.log(cube.edgeIsReversed('UR')===false) // false
cube.move('R D R\'')
console.log(cube.edgeIsReversed('UR')===false) // true
console.log(cube.toNet())

console.log()
cube.identity()

console.log(cube.findCorner('WBR')==='URF') // URF
console.log(cube.findCorner('wBr')==='URF') // URF
cube.move('R')
console.log(cube.findCorner('WBR')==='UBR') // UBR

cube.identity()
console.log(cube.cornerIsDisoriented('urf')===0)
console.log(cube.cornerIsDisoriented('ulf')===0)
cube.move('R U')
console.log(cube.cornerIsDisoriented('urf')===1)
cube.move('R U')
console.log(cube.cornerIsDisoriented('urf')===2)