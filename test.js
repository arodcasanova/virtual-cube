const Rubiks = require('./rubiks2')

var cube = new Rubiks()

console.log(cube.toNet())
cube.checkAll()

console.log(cube.move('D').toNet())
cube.checkAll()

console.log(cube.adrianScramble().toNet())
cube.checkAll()