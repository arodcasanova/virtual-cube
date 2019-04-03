/* 
 * Test sample solution by calling solve function from sample_solution.js
 */

const Rubiks = require('../rubiks')
const solve = require('../solution')

function printUp(cube) {
  cube.move("x'")
  cube.printNet()
  console.log('------------')
  cube.move("x")
}

var cube = new Rubiks()
cube.scramble()
solve(cube)

printUp(cube)

var cube2 = new Rubiks()
cube2.scramble()
solve(cube2)

printUp(cube2)