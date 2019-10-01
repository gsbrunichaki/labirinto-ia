const File = require('./file');
const Maze = require('./maze');

const file = new File('tests/labirinto1_10.txt');
const maze = new Maze(file.content());

console.log('size', maze.getSize());
console.log(maze.getMatrix());