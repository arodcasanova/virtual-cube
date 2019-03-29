const Rubiks = require('./rubiks')

var cube = new Rubiks()

console.log(cube.shareFace('wb','wr'))
console.log(cube.shareFace('wb', 'wbr'))
console.log(cube.shareFace('wb','wb'))
console.log(cube.shareFace('oby','yrg'))

cube.move('R')
cube.printNet()
console.log(!cube.shareFace('wb','wr'))
console.log(cube.shareFace('oby','yrg'))