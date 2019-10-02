const File = require('./file');
const Maze = require('./maze');
const AG = require('./ag');

const file = new File(process.argv[2]);
const maze = new Maze(file.content());
const ag = new AG(process.argv[3], process.argv[4], maze.getFreeBlocks());

ag.evolve();