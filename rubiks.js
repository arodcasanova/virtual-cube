function Rubiks() {
  //this.colors = ['r','b','y','w','g','o']
  //this.colors = ['red ','blue ','yellow ','white ','green ','orange ']
  this.colors=[1,2,3,4,5,6]
  this.faces = []
  this.faceEnum = {'F':0,'U':1,'R':2,'B':3,'D':4,'L':5}
  // [F, U, R, B, D, L]
  /*
               +------------+
               | U1  U2  U3 |
               |            |
               | U4  U5  U6 |
               |            |
               | U7  U8  U9 |
  +------------+------------+------------+------------+
  | L1  L2  L3 | F1  F2  F3 | R1  R2  R3 | B1  B2  B3 |
  |            |            |            |            |
  | L4  L5  L6 | F4  F5  F6 | R4  R5  R6 | B4  B5  B6 |
  |            |            |            |            |
  | L7  L8  L9 | F7  F8  F9 | R7  R8  R9 | B7  B8  B9 |
  +------------+------------+------------+------------+
               | D1  D2  D3 |
               |            |
               | D4  D5  D6 |
               |            |
               | D7  D8  D9 |
               +------------+
  */

  // initialize faces
  for (var i = 0; i < 6; i++) {
    this.faces.push([])
    for (var j = 0; j < 3; j++) {
      this.faces[i].push(Array(3).fill(this.colors[i]))
    }
  }

  //====================================================
  this.moveF = function() {
    var temp = this.faces[this.faceEnum.F][0][0]
    this.faces[this.faceEnum.F][0][0] = this.faces[this.faceEnum.F][2][0]
    this.faces[this.faceEnum.F][2][0] = this.faces[this.faceEnum.F][2][2]
    this.faces[this.faceEnum.F][2][2] = this.faces[this.faceEnum.F][0][2]
    this.faces[this.faceEnum.F][0][2] = temp
    temp = this.faces[this.faceEnum.F][0][1]
    this.faces[this.faceEnum.F][0][1] = this.faces[this.faceEnum.F][1][0]
    this.faces[this.faceEnum.F][1][0] = this.faces[this.faceEnum.F][2][1]
    this.faces[this.faceEnum.F][2][1] = this.faces[this.faceEnum.F][1][2]
    this.faces[this.faceEnum.F][1][2] = temp

    temp = this.faces[this.faceEnum.U][2].slice(0)
    for (var i = 0; i < 3; i++) {
      this.faces[this.faceEnum.U][2][i] = this.faces[this.faceEnum.L][2-i][2]
      this.faces[this.faceEnum.L][2-i][2] = this.faces[this.faceEnum.D][0][2-i]
      this.faces[this.faceEnum.D][0][2-i] = this.faces[this.faceEnum.R][i][0]
      this.faces[this.faceEnum.R][i][0] = temp[i]
    }
  }

  // Add rest of opperatinos 

  // Add "scramble" function: F R' B D' R' F' D B' L2 F2 U2 B D L F2 L U' F' L B' R U F' U L'
  // Note: "'" denotes "inverse," 2 denotes "twice."  

  // Add "check" function
  // This function should check a report completion of the following stages:
  // 1. White Cross: perfect / not perfect
  // 2. White Corners: perfect / not perfect 
  // 3. Middle Layer: perfect / not perfect
  // 4. Yellow Cross: perfect / not perfect
  // 5. Yellow Corners 1: perfect / not perfect
  // 6. Yellow Corners 2: perfect / not perfect

  // If all stages complete, only report congratulatory message that the cube is solved.  

  //====================================================

  this.printAllFaces = function() {
    var printStr = '===\n'

    for (var face = 0; face < 6; face++) {
      for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
          printStr += this.faces[face][row][col]
        }
        printStr += '\n'
      }
      printStr += '===\n'
    }

    console.log(printStr)
  }

  this.printNet = function() {
    var printStr = ''
    this.faces[this.faceEnum.U].map(function(row, i) {
      printStr += '   ' + row.join('') + '\n'
    })
    for (var row = 0; row < 3; row++) {
      printStr += this.faces[this.faceEnum.L][row].join('')
      printStr += this.faces[this.faceEnum.F][row].join('')
      printStr += this.faces[this.faceEnum.R][row].join('')
      printStr += this.faces[this.faceEnum.B][row].join('')
      printStr += '\n'
    }
    this.faces[this.faceEnum.D].map(function(row, i) {
      printStr += '   ' + row.join('') + '\n'
    })
    console.log(printStr)
  }

  this.printFace = function(faceNum) {
    var printStr = ''

    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        printStr += this.faces[faceNum][row][col]
      }
      printStr += '\n'
    }

    console.log(printStr)
  }
}

exports.Rubiks = Rubiks