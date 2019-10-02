const File = require('./file');
const Maze = require('./maze');
const Chromosome = require('./chromosome');
const randomBetween = require('./random');

const file = new File('tests/labirinto1_10.txt');
const maze = new Maze(file.content());

class AG {
  constructor(generations, population, genes) {
    this.generations = generations;
    this.population = population;
    this.genes = genes;
    this.chromosomes = this.generateChromosomes(population);
    this.elite = null;
    this.intermerdiateMatrix = [];
    this.sortedMatrix = [];
  }

  generateChromosomes(population) {
    const chromosomes = [];

    for (let i = 0; i < population; i++) {
      const newChromosome = new Chromosome(this.genes);
      chromosomes.push(newChromosome);
    }

    return chromosomes;
  }

  calcFitness(chromosome) {
    for (let j = 0; j < this.genes; j++) {
      if (chromosome.getFoundExit()) {
        return;
      }

      const direction = chromosome.getGenes()[j];
      const score = chromosome.move(direction, maze.getMatrix());
      chromosome.accFitness(score);
    }
  }

  elitism() {
    const compare = (a, b) => {
      if (a.getFitness() > b.getFitness()) {
        return 1;
      }
      
      if (a.getFitness() < b.getFitness()) {
        return -1;
      }

      return 0;
    }
  
    this.sortedMatrix = this.chromosomes.sort(compare).reverse();
    const elite = this.sortedMatrix[0];

    let currentFitness = 0;

    if (this.elite) {
      currentFitness = this.elite.getFitness();
    }

    if (currentFitness < elite.getFitness()) {
      this.elite = elite;
    }
  }

  tournament() {
    const first = this.chromosomes[randomBetween(0, this.population - 1)];
    const second = this.chromosomes[randomBetween(0, this.population - 1)];
  
    if (first.getFitness() >= second.getFitness()) {
      return first;
    }

    return second;
  }

  crossover() {
    const sons = [];
    
    for (let i = 0; i < this.population / 2; i++) {
      const cut = maze.getFreeBlocks() / 2;
  
      // TODO: while mother === father
      const mother = this.tournament();
      const father = this.tournament();
  
      const motherGenes = [...mother.getGenes()];
      const fatherGenes = [...father.getGenes()];
  
      const halfMother = motherGenes.splice(0, cut);
      const halfFather = fatherGenes.splice(0, cut);

      const son1 = new Chromosome(this.genes);
      const son2 = new Chromosome(this.genes);
      
      son1.setGenes([...halfMother, ...fatherGenes]);
      son2.setGenes([...halfFather, ...motherGenes]);
  
      sons.push(son1);
      sons.push(son2);    
    }
  
    this.intermerdiateMatrix = sons;
  }

  mutation() {
    const randomChromosome = randomBetween(0, this.population - 1);
    const randomGene = randomBetween(1, 8);
    const randomNewGene = randomBetween(1, 8);
  
    this.intermerdiateMatrix[randomChromosome].getGenes()[randomGene] = randomNewGene;  
  }

  evolve() {
    for (let i = 0; i <= this.generations; i++) {
      console.log('');
      console.log('########### GENERATION ' + i + ' ###########');
      console.log('');

      for (let j = 0; j < this.population; j++) {
        this.calcFitness(this.chromosomes[j]);
      }

      this.elitism();

      for (let i = 0; i < this.population; i++) {
        let chromosome = '';

        for (let j = 0; j < this.genes; j++) {
          chromosome = chromosome + this.sortedMatrix[i].getGenes()[j] + ', ';
        }

        console.log('(' + i + ') ', chromosome, 'fitness: ' + this.sortedMatrix[i].getFitness());
      }

      this.crossover();
      this.mutation();
      
      this.chromosomes = this.intermerdiateMatrix;
      this.intermerdiateMatrix = [];

      let genesElite = '';

      for (let i = 0; i < this.genes; i++) {
        genesElite = genesElite + this.elite.getGenes()[i] + ', ';
      }

      console.log('');
      console.log('(EL): ', genesElite, this.elite.getFitness());
      console.log(this.elite.getPath());

      if (this.elite.getFitness() > 5000) {
        return;
      }
    }
  }
}

module.exports = AG;