function Rubiks() {
  //this.colors = ['r','b','y','w','g','o']
  //this.colors = ['red ','blue ','yellow ','white ','green ','orange ']
  this.colors=[1,2,3,4,5,6]
  this.faces = []
  this.faceEnum = {'F':0,'U':1,'R':2,'B':3,'D':4,'L':5}
  // [F, U, R, B, D, L]
  /*
               +------------+
               | U0  U1  U2 |
               |            |
               | U3  U4  U5 |
               |            |
               | U6  U7  U8 |
  +------------+------------+------------+------------+
  | L0  L1  L2 | F0  F1  F2 | R0  R1  R2 | B0  B1  B2 |
  |            |            |            |            |
  | L3  L4  L5 | F3  F4  F5 | R3  R4  R5 | B3  B4  B5 |
  |            |            |            |            |
  | L6  L7  L8 | F6  F7  F8 | R6  R7  R8 | B6  B7  B8 |
  +------------+------------+------------+------------+
               | D0  D1  D2 |
               |            |
               | D3  D4  D5 |
               |            |
               | D6  D7  D8 |
               +------------+
  */

  // initialize faces
  for (var i = 0; i < 6; i++) {
    this.faces.push(Array(9).fill(this.colors[i]))
  }

  //====================================================
  this.moveFOld = function() {
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

  this.moveF = function() {
    var newFaces = this.faces.map(function(face) {
      return face.slice()
    })

    var FCross = [1, 5, 7, 3]
    var FCorner = [0, 2, 8, 6]
    var sideTargets = [[6, 7, 8], [0, 3, 6], [2, 1, 0], [8, 5, 2]]
    var sideFaces = [this.faceEnum.U, this.faceEnum.R, this.faceEnum.D, this.faceEnum.L]

    // move F face
    for (var i = 0; i < 4; i++) {
      newFaces[this.faceEnum.F][FCross[i]] = this.faces[this.faceEnum.F][FCross[(i-1+4)%4]]
      newFaces[this.faceEnum.F][FCorner[i]] = this.faces[this.faceEnum.F][FCorner[(i-1+4)%4]]
    }

    // move side faces
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 3; j++) {
        newFaces[sideFaces[i]][sideTargets[i][j]] = this.faces[sideFaces[(i-1+4)%4]][sideTargets[(i-1+4)%4][j]]
        console.log(i, j, ':', newFaces[sideFaces[i]][sideTargets[i][j]], this.faces[sideFaces[(i-1+4)%4]][sideTargets[(i-1+4)%4][j]])
      }
    }
  }

  // copy 'fromCell' cells from 'fromFace' into 'toCell' in 'toFace' 
  // and return the modified 'toFace'
  this.copyCells = function(fromFace, toFace, cellInd) {
    var newFace = this.faces[toFace].slice()
    cellInd.map(function(val, ind) {
      newFace[ind] = this.faces[fromFace][val]
    })
    return newFace
  }

  this.moveFInv = function() {
    var newFaces = this.faces.map(function(face) {
      return face.slice()
    })

    newFaces[this.faceEnum.F] = copyCells(this.faceEnum.F, this.faceEnum.F, [6, 3, 0, 7, 4, 1, 8, 5, 2])
    newFaces[this.faceEnum.U] = copyCells(this.faceEnum.L, this.faceEnum.U, [])
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

  this.rotateFaceCW = function(face) {
    var newFace = face.map(function(arr) {
      return arr.slice()
    })

    var cross = [1, 5, 7, 3]
    var corner = [0, 2, 8, 6]

    for (var i = 0; i < 4; i++) {
      newFace[cross[i]] = face[cross[(i+3)%4]]
      newFace[corner[i]] = face[corner[(i+3)%4]]
    }
  }

  this.checkWhiteCross = function() {
    // if the F face has white cross
    var isCross = this.faces[this.faceEnum.F].reduce(function(acc, val, ind) {
      return acc && (val===this.colors[0] || (ind%2==0 && ind!==4))
    }, true)

    // if the side colors match with centers
    var isCorrectSides = this.faces[this.faceEnum.U][7]===this.faces[this.faceEnum.U][4]
      && this.faces[this.faceEnum.L][5]===this.faces[this.faceEnum.L][4]
      && this.faces[this.faceEnum.D][1]===this.faces[this.faceEnum.D][4]
      && this.faces[this.faceEnum.R][3]===this.faces[this.faceEnum.R][4]

    return isCross && isCorrectSides
  }

  this.checkWhiteFace = function() {
    var isFace = this.faces[this.faceEnum.F].reduce(function(acc, val) {
      return acc && (val==this.colors[0])
    }, true)

    var targetFaces = [this.faceEnum.U, this.faceEnum.R, this.faceEnum.D, this.faceEnum.L]
    var targetCells = [[6, 7, 8], [0, 3, 6], [0, 1, 2], [2, 5, 8]]

    var isCorrectSides = targetFaces.reduce(function(acc, face, ind) {
      return acc && targetCells[ind].reduce(function(acc2, cell, ind2) {
        return acc2 && (this.faces[face][4]===this.faces[face][cell])
      }, true)
    }, true)

    return isFace && isCorrectSides
  }



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

    for (var row = 0; row < 3; row++) {
      printStr += '   ' + this.faces[this.faceEnum.U].slice(row*3, row*3+3).join('') + '\n'
    }
    for (var row = 0; row < 3; row++) {
      printStr += this.faces[this.faceEnum.L].slice(row*3, row*3+3).join('')
      printStr += this.faces[this.faceEnum.F].slice(row*3, row*3+3).join('')
      printStr += this.faces[this.faceEnum.R].slice(row*3, row*3+3).join('')
      printStr += this.faces[this.faceEnum.B].slice(row*3, row*3+3).join('')
      printStr += '\n'
    }
    for (var row = 0; row < 3; row++) {
      printStr += '   ' + this.faces[this.faceEnum.D].slice(row*3, row*3+3).join('') + '\n'
    }
    console.log(printStr)
  }

  this.printFace = function(faceNum) {
    var printStr = ''

    for (var row = 0; row < 3; row++) {
      for (var col = 0; col < 3; col++) {
        printStr += this.faces[faceNum][row*3+col]
      }
      printStr += '\n'
    }

    console.log(printStr)
  }
}

exports.Rubiks = Rubiks