const file = require('./file');
const maze = require('./maze');

const fileData = file.data(process.argv[2]);
const fileLines = file.lines(fileData);

// Insere o tamanho do labirinto
maze.size = fileLines[0];

// // Popula matriz com o conteúdo do arquivo .txt (pula a primeira linha)
fileLines.filter((_, index) => index > 0).forEach((line) => {
  maze.matrix.push(line.trim().split(' '));
});

console.log(maze.matrix);
const flat = (acc, cur) => acc.concat(cur);
const flatMatrix = maze.matrix.reduce(flat, []);
const countFreeways = flatMatrix.filter((value) => value === '0').length;

console.log(countFreeways);
