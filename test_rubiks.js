const { Rubiks } = require('./rubiks2')

var cube = new Rubiks()

console.log(cube.toNet())
console.log(cube.checkUpCross())
console.log(cube.checkUpCorners())
console.log(cube.checkMiddle())
console.log(cube.checkDownCross())
console.log(cube.checkDownCorners())

console.log(cube.move('D').toNet())
console.log(cube.checkUpCross())
console.log(cube.checkUpCorners())
console.log(cube.checkMiddle())
console.log(cube.checkDownCross())
console.log(cube.checkDownCorners())

console.log(cube.adrianScramble().toNet())
console.log(cube.checkUpCross())
console.log(cube.checkUpCorners())
console.log(cube.checkMiddle())
console.log(cube.checkDownCross())
console.log(cube.checkDownCorners())