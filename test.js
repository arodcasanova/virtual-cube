const Rubiks = require('./rubiks')

var cube = new Rubiks()

cube.flip()
console.log(cube.toNet())
cube.setStart()

console.log(cube.toNet())
cube.checkAll()

console.log(cube.move('D').toNet())
cube.checkAll()

console.log(cube.adrianScramble().toNet())
cube.checkAll()