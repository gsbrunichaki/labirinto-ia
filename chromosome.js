const randomBetween = require('./random');

class Chromosome {

  constructor(genesLength) {
    this.genesLength = genesLength;
    this.genes = this.generateGenes();
    this.currPos = [0, 0];
  }

  getGenes() {
    return this.genes;
  }

  getGenesLength() {
    return this.genesLength;
  }

  generateGenes() {
    const genes = Array(this.genesLength).fill(0);
    return genes.map((gene) => gene = randomBetween(1, 8));
  }

  reward(destiny) {
    switch (destiny) {
      case '0': return 1;
      case '1': return -1;
      case 'E': return -1;
      case 'S': return 10000;
      default:  return 0;
    }
  }

}

module.exports = Chromosome;