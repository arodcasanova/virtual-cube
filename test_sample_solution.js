/* 
 * Test sample solution by calling solve function from sample_solution.js
 */

const Rubiks = require('./rubiks')
const solve = require('./sample_solution')

function printUp(cube) {
  cube.move("x'")
  cube.printNet()
  console.log('------------')
  cube.move("x")
}

var cube = new Rubiks()
solve(cube)

printUp(cube)