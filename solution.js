let rubiks = require("./src/rubiks.js")
let cube = new rubiks()

cube.randomize()
cube.setStart()



cube.check()