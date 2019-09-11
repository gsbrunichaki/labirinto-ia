const readLine = require('readline');
const fs = require('fs');

const fileData = [];
const MATRIX = [];

const file = readLine.createInterface({
  input: fs.createReadStream('labirinto2_10.txt'),
});

file.on('line', (line) => {
  fileData.push(line);
});

file.on('close', () => {
  fileData.filter((elem, index) => index > 0).forEach((line) => {
    MATRIX.push(line.trim().split(' '));
  });
  console.log('matrix', MATRIX);
});

