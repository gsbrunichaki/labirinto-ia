const File = require('./file');
const Maze = require('./maze');
const AG = require('./ag');

const file = new File('tests/labirinto1_10.txt');
const maze = new Maze(file.content());
const ag = new AG(100, 30, maze.getFreeBlocks());

ag.evolve();