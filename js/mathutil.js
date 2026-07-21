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

function rotate(matrix) {
  const N = matrix.length - 1;
  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  );

  return result;
}

function toCentered(grid) {
  let matrix = grid;
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
  return matrix;
}

function allorientations(matrix) {
  return [matrix,rotate(matrix),rotate(rotate(matrix)),rotate(rotate(rotate(matrix))), matrix.toReversed(), rotate(matrix.toReversed()), rotate(rotate(matrix.toReversed())), rotate(rotate(rotate(matrix.toReversed())))];
}

export default {
	getRandomInt, modulo, zeroifnan, minusonetoinf, extremifiedaverage, rotate, allorientations, toCentered
}

