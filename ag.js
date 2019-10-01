const File = require('./file');
const Maze = require('./maze');
const Chromosome = require('./chromosome');

const file = new File('tests/labirinto1_10.txt');
const maze = new Maze(file.content());
const chromosome = new Chromosome(maze.getFreeBlocks());

const population = 30;

// console.log('size', maze.getSize());
// console.log('freeBlocks', maze.getFreeBlocks());
console.log(maze.getMatrix());

// console.log(chromosome.getGenes());
// console.log(chromosome.getGenesLength());

// console.log(chromosome.reward('S'));

console.log(chromosome.move(4, maze.getMatrix()));