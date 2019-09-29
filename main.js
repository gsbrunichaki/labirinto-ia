const file = require('./file');

const matrix = [];
const fileData = file(process.argv[2]);
const lines = fileData.trim().split('\n');

lines.filter((_, index) => index > 0).forEach((line) => {
  matrix.push(line.trim().split(' '));
});

console.log(matrix);