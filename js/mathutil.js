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

export default {
	getRandomInt, modulo, zeroifnan, minusonetoinf, extremifiedaverage, rotate
}

