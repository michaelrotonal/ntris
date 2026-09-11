// get a random integer between the range of [min,max]
// @see https://stackoverflow.com/a/1527820/2124254
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function modulo(a, b) {
  return ((a % b) + b) % b;
}

function zeroifnan(number) {
  if (number > 0 || number < 0 || number == 0) {
    return number;
  } else {
    return 0;
  }
}

function minusonetoinf(element) {
  return element == -1 ? Infinity : element;
}

function extremifiedaverage(array) {
  let X = (Math.max(...array) + Math.min(...array)) / 2;
  return X;
}

function rotate(matrix, hex=false) {
  if (hex) {return hexRotate(matrix)} else {
    let result = [];
    for (let i = 0; i < matrix[0].length; i++) {
      result.push([]);
      for (let j = 0; j < matrix.length; j++) {
        result[i].push(matrix[matrix.length - 1 - j][i])
      }
    }
    return result;
  }
}

function isMatrixHex(matrix) { // I'm not dealing with non-square hexagonal matrices!
  if (matrix.length != matrix[0].length) {return false;}
  if (matrix.length % 2 == 0) {return false;}
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (Math.abs(i - j) > matrix.length / 2) {
        if (matrix[i][j] != 0) {return false;}
      }
    }
  }
  return true;
}

function toHexified(array) {
  let matrix = array.map(r => r.toSpliced());
  while (matrix.length < matrix[0].length || matrix.length % 2 == 0) {
    matrix.unshift(new Array(matrix[0].length).fill(0));
  }
  while (matrix[0].length < matrix.length) {
    matrix.map(l => l.unshift(0)); // just another bit of javascript trickery. good luck porting this to a different language
  }
  while (!isMatrixHex(matrix)) {
    matrix = addZeros(matrix);
  }
  return matrix;
}

function hexRotate(array) {
  let result = [];
  let matrix = toHexified(array);
  for (let i = 0; i < matrix.length; i++) {
    result.push([]);
    for (let j = 0; j < matrix.length; j++) {
      if (Math.abs(i - j) > matrix.length / 2) {
        result[i].push(0);
      } else {
        result[i].push(matrix[i - j + (matrix.length - 1)/2][i]);
      }
    }
  }
  return result;
}

// Cleverness preserved
// let cellCount = this.matrix.reduce((acc,row) => acc + row.reduce((acc2, cell) => cell ? acc2 + 1 : acc2, 0), 0); 
function countCells(matrix) {
  let cells = 0; 
  for(let i = 0; i < matrix.length; i++) {
    for(let j = 0; j < matrix.length; j++) {
      if(matrix[i][j]) { cells++; }
    }
  }

  return cells; 
}

function countNeighbors(matrix, i, j, adjacencies) {
  let localMatrix = matrix.map(r => r.toSpliced());
  localMatrix = addZeros(localMatrix); 

  i += 1;
  j += 1;

  let count = 0; 
  for(let k = 0; k < adjacencies.length; k++) {
    count += localMatrix[i+adjacencies[k][0]][j+adjacencies[k][1]];
  }

  return count; 
}

function cellTouchesEdge(matrix) {
  if(matrix[0].indexOf(1) != -1)                 { return true; }
  if(matrix[matrix.length - 1].indexOf(1) != -1) { return true; }
  for(let i = 0; i < matrix.length; i++) {
    if(matrix[i][0] == 1) { return true; }
    if(matrix[i][matrix[i].length-1] == 1) { return true; }
  }
  return false; 
}

function addZeros(matrix) {
  let array = matrix.map(l => l.toSpliced());
  array.push(new Array(array[0].length).fill(0));
  array.unshift(new Array(array[0].length).fill(0));
  for (let i = 0; i < array.length; i++) {
    array[i].push(0);
    array[i].unshift(0);
  }
  return array;
}

function perimeter(matrix, hex=false) {
  let p = 0;
  let array = addZeros(matrix);
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length; j++) {
      if (array[i][j] == 1) {
        p += 4 - (array[i][j+1] + array[i][j-1] + array[i-1][j] + array[i+1][j]) + (hex ? 2 - (array[i+1][j+1] + array[i-1][j-1]) : 0);
      }
    }
  }
  return p;
}

function toCentered(grid, hex = false) {
  if (countCells(grid) > 0) {
    let matrix = grid.map(h => h.toSpliced());
    let Isum = 0;
    let Jsum = 0;
    let total = 0;
    for (let i=0; i<matrix.length; i++) {
      for (let j=0; j<matrix[i].length; j++) {
        if (matrix[i][j]) {
          Isum += i;
          Jsum += j;
          total += 1;
        }
      }
    }
    let centercoords = [Isum / total, Jsum / total];
    let dcc = [1 + (Math.round(centercoords[0] + centercoords[1]) + Math.round(centercoords[0] - centercoords[1])), 1 + (Math.round(centercoords[0] + centercoords[1]) - Math.round(centercoords[0] - centercoords[1]))];
    if (dcc[0] > matrix.length) {
      for (let i = matrix.length; i < dcc[0]; i++) {
        matrix.push(new Array(matrix[0].length).fill(0));
      }
    } else {
      for (let i = matrix.length; i > dcc[0]; i--) {
        matrix.unshift(new Array(matrix[0].length).fill(0));
      }
    }
    if (dcc[1] > matrix[0].length) {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = matrix[i].length; j < dcc[1]; j++) {
          matrix[i].push(0);
        }
      }
    } else {
      for (let i = 0; i < matrix.length; i++) {
        for (let j = matrix[i].length; j > dcc[1]; j--) {
          matrix[i].unshift(0);
        }
      }
    }
    if (matrix.length < matrix[0].length) {
      while (matrix.length < matrix[0].length) {
        matrix.push(new Array(matrix[0].length).fill(0));
        matrix.unshift(new Array(matrix[0].length).fill(0));
      }
    } else {
      while (matrix[0].length < matrix.length) {
        for (let i=0; i < matrix.length; i++) {
          matrix[i].push(0);
          matrix[i].unshift(0);
        }
      }
    }
    while (matrix[0].indexOf(1) == -1 && matrix[matrix.length-1].indexOf(1) == -1 && matrix.every(trerr => trerr[0] == 0 && trerr[trerr.length-1] == 0)) {
      matrix = matrix.slice(1, -1);
      matrix = matrix.map(nswttt => nswttt.slice(1, -1));
    }
    if (hex) {
      matrix = hexify(matrix); // Hexagonal matrices may be biased to the upper left
    }
  return matrix;
  } else {
    return [[1]]; // doesn't crash on empty array anymore!
  }
}

function isGreater(array1, array2) {
  if (array1.length > array2.length) {return true;}
  if (array2.length > array1.length) {return false;}
  for (let X = 0; X < Math.min(array1.length, array2.length); X++) {
    if (typeof(array1[X]) == 'number') {
      if (array1[X] > array2[X]) {return true;}
      if (array2[X] > array1[X]) {return false;}
    } else {
      if (isGreater(array1[X], array2[X])) {return true;}
      if (isGreater(array2[X], array1[X])) {return false;}
    }
  }
  return false;
}

function removeZeros(matrix) {
  while (matrix[0].indexOf(1) == -1) {
    matrix = matrix.slice(1, matrix.length);
  }
  while (matrix[matrix.length-1].indexOf(1) == -1) {
    matrix = matrix.slice(0, matrix.length-1);
  }
  while (matrix.every(trerr => trerr[0] == 0)) {
    matrix = matrix.map(nswttt => nswttt.slice(1, nswttt.length));
  }
  while (matrix.every(trerr => trerr[trerr.length-1] == 0)) {
    matrix = matrix.map(nswttt => nswttt.slice(0, nswttt.length-1));
  }
  return matrix;
}

function standardOrientation(matrix, hex=false) {
  let h;
  if (hex) {
    h = [toHexified(matrix), hexRotate(matrix), hexRotate(hexRotate(matrix)), hexRotate(hexRotate(hexRotate(matrix))), hexRotate(hexRotate(hexRotate(hexRotate(matrix)))), hexRotate(hexRotate(hexRotate(hexRotate(hexRotate(matrix)))))];
  } else {
    h = [matrix, rotate(matrix), rotate(rotate(matrix)), rotate(rotate(rotate(matrix)))];
  }
  let J = h[0];
  for(let i = 0; i < h.length; i++) {
    if (isGreater(J, h[i])) {J = h[i];}
  }
  return J;
}

function isConnected(matrix, adjacencies) {
  let h = addZeros(matrix.map(l => l.toSpliced()));
  let foundOneYet = false;
  for (let i = 0; i < h.length; i++) {
    for (let j = 0; j < h[0].length; j++) {
      if (h[i][j] == 1) {
        if (foundOneYet) {
          for (let k = 0; k < adjacencies.length; k++) {
            if (h[i+adjacencies[k][0]][j+adjacencies[k][1]] == 2) {
              h[i][j] = 2;
              i = 0; // don't worry about the reset, it can only happen as many times as there are 1s in the shape
              j = 0;
              break;
            }
          }
        } else {
          foundOneYet = true;
          h[i][j] = 2;
        }
      }
    }
  }
  return !(h.findIndex(row => row.findIndex(l => l == 1) > -1) > -1);
}

function clamp (matrix, i) {return Math.max(0, Math.min(i, matrix.length - 1));}


// function isAdjacent(matrix, a, b){return (matrix[a][b] == 0 && !(
//                                               matrix[clamp(matrix, a+1)][clamp(matrix[0], b)] == 0 &&
//                                               matrix[clamp(matrix, a-1)][clamp(matrix[0],b)] == 0 &&
//                                               matrix[clamp(matrix, a)][clamp(matrix[0],b+1)] == 0 &&
//                                               matrix[clamp(matrix, a)][clamp(matrix[0],b-1)] == 0));}

function isAdjacent(matrix, a, b, adjacencies) {
  if (matrix[a][b] == 1) {return false;}
  if (countNeighbors(matrix, a, b, adjacencies) > 0) {return true;} else {return false;}
}

function mirror(matrix) {
  let result = [];
  for (let i = 0; i < matrix[0].length; i++) {
    result.push([]);
    for (let j = 0; j < matrix.length; j++) {
      result[i].push(matrix[j][i])
    }
  }
  return result;
}

function allchiralorientations(matrix, hex=false) {
  if (hex) {
    return [toHexified(matrix), hexRotate(matrix), hexRotate(hexRotate(matrix)), hexRotate(hexRotate(hexRotate(matrix))), hexRotate(hexRotate(hexRotate(hexRotate(matrix)))), hexRotate(hexRotate(hexRotate(hexRotate(hexRotate(matrix)))))];
  } else {
    return [matrix, rotate(matrix), rotate(rotate(matrix)), rotate(rotate(rotate(matrix)))];
  }
}

function allorientations(matrix, hex=false) {
  let result = allchiralorientations(matrix, hex);
  return result.concat(result.map(l => mirror(l)));
}

export default {
	getRandomInt, modulo, zeroifnan, minusonetoinf, extremifiedaverage, rotate, allorientations, toCentered, addZeros, clamp, isAdjacent, removeZeros, standardOrientation, isGreater,
  countCells, cellTouchesEdge, countNeighbors, isConnected, perimeter, allchiralorientations, mirror, hexRotate, toHexified
}
// isn't that like, all the functions in here?
