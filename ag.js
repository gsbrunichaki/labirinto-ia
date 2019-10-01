const File = require('./file');
const Maze = require('./maze');
const Chromosome = require('./chromosome');
const randomBetween = require('./random');

const file = new File('tests/labirinto1_10.txt');
const maze = new Maze(file.content());
const chromosome = new Chromosome(maze.getFreeBlocks());

class AG {
  constructor(population) {
    this.population = population;
    this.chromosomes = [];
  }
}

const population = 30;
const chromosomes = [];

// console.log('size', maze.getSize());
// console.log('freeBlocks', maze.getFreeBlocks());
console.log(maze.getMatrix());

// console.log(chromosome.getGenes());
// console.log(chromosome.getGenesLength());

// console.log(chromosome.reward('S'));

console.log(chromosome.move(5, maze.getMatrix()));

function generatePopulation(popAmount) {
  for (let i = 0; i < popAmount; i++) {
    const newChromosome = new Chromosome(maze.getFreeBlocks());

    for (let j = 0; j < maze.getFreeBlocks(); j++) {
      const direction = newChromosome.getGenes()[j];
      const score = newChromosome.move(direction, maze.getMatrix());
      
      newChromosome.accFitness(score);
    }

    chromosomes.push(newChromosome);
  }
}

generatePopulation(population);

// console.log(chromosomes);

function elitism(chromosomes) {
  const compare = (a, b) => {
    if (a.getFitness() > b.getFitness()) return 1;
    if (a.getFitness() < b.getFitness()) return -1;

    return 0;
  }

  const sortByFitnessDesc = chromosomes.sort(compare).reverse();
  const elite = sortByFitnessDesc[0];
  // console.log(elite);
}

elitism(chromosomes);

function tournament(chromosomes) {
  const first = chromosomes[randomBetween(0, 29)];
  const second = chromosomes[randomBetween(0, 29)];

  // console.log('first', first.getFitness());
  // console.log('second', second.getFitness());

  if (first.getFitness() >= second.getFitness()) return first;

  return second;
}

tournament(chromosomes);

function crossover(chromosomes, population) {
  const intermerdiateMatrix = [];
  
  for (let i = 0; i < population / 2; i++) {
    const cut = maze.getFreeBlocks() / 2;

    // TODO: while mother === father
    const mother = tournament(chromosomes);
    const father = tournament(chromosomes);

    const motherGenes = [...mother.getGenes()];
    const fatherGenes = [...father.getGenes()];

    const halfMother = motherGenes.splice(0, cut);
    const halfFather = fatherGenes.splice(0, cut);
    
    const son1 = [...halfMother, ...fatherGenes];
    const son2 = [...halfFather, ...motherGenes];

    intermerdiateMatrix.push(son1);
    intermerdiateMatrix.push(son2);    
  }

  return intermerdiateMatrix;
}

const intermerdiateMatrix = crossover(chromosomes, population);

console.log('oaskdoakd', alo.length);

function mutation() {
  const randomChromosome = randomBetween(0, 29);
  const randomGene = randomBetween(1, 8);
  const randomNewGene = randomBetween(1, 8);

  intermerdiateMatrix[randomChromosome].getGenes()[randomGene] = randomNewGene;  
}
