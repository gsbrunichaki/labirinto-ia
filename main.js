const file = require('./file');
const maze = require('./maze');

// Pega nome do arquivo no parâmetro
file.setName() = process.argv[2];

// Tamanho do labirinto
maze.size = file.lines[0];

// Popula matriz com o conteúdo do arquivo .txt (pula a primeira linha)
file.lines.filter((_, index) => index > 0).forEach((line) => {
  maze.matrix.push(line.trim().split(' '));
});

// Matriz unidimensional para contar ocorrências
const flat = (acc, cur) => acc.concat(cur);
const flatMatrix = maze.matrix.reduce(flat, []);

// Número de posições livres
maze.freeways = flatMatrix.filter((element) => element === '0').length;

file.test();
