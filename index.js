const Rubiks = require('./rubiks')

var cube = new Rubiks()

console.log(cube.toNet()) 
console.log(cube.toString())

console.log(cube.checkUpCross())
// cube.checkAll()

console.log("scrambling: ")
console.log(cube.scramble().toNet())
// cube.checkAll()

// console.log(cube.move('F').toNet())
// cube.checkAll()

// console.log(cube.check())

// cube.rotateCW()

console.log(cube.toString())
console.log(cube.checkUpCross())

console.log(cube.toNet())
console.log(cube.toString())

cube.check()