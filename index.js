const Rubiks = require('./rubiks')

var cube = new Rubiks()

console.log(cube.toNet())
cube.checkAll()

console.log(cube.move('D').toNet())
cube.checkAll()

console.log(cube.move('F').toNet())
cube.checkAll()