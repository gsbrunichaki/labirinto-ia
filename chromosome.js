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
       default: return 0;
    }
  }

  move(direction, matrix) {
    let x = this.currPos[0];
    let y = this.currPos[1];

    switch (direction) {
      case 1: return this.moveUp(x, y, matrix);
      case 2: return this.moveRightUp(x, y, matrix);
      case 3: return this.moveRight(x, y, matrix);
      case 4: return this.moveRightBottom(x, y, matrix);
      case 5:
      case 6:
      case 7:
      case 8:
      default:
        break;
    }
  }

  moveUp(x, y, matrix) {
    if (x === 0) {
      return this.reward('1');
    }

    const up = matrix[x - 1][y];

    if (up === '0' || up === 'E' || up === 'S') {
      this.currPos[0]--;
    }

    return this.reward(up);
  }

  moveRightUp(x, y, matrix) {
    if (x === 0 || y === matrix.length - 1) {
      return this.reward('1');
    }

    const rightUp = matrix[x - 1][y + 1];

    if (rightUp === '0' || rightUp === 'S') {
      this.currPos[0]--;
      this.currPos[1]++;
    }

    return this.reward(rightUp);
  }

  moveRight(x, y, matrix) {
    if (y === matrix.length - 1) {
      return this.reward('1');
    }

    const right = matrix[x][y + 1];

    if (right === '0' || right === 'S') {
      this.currPos[1]++;
    }

    return this.reward(right);
  }

  moveRightBottom(x, y, matrix) {
    if (x === matrix.length - 1 || y === matrix.length - 1) {
      return this.reward('1');
    }

    const rightBottom = matrix[x + 1][y + 1];

    if (rightBottom === '0' || rightBottom === 'S') {
      this.currPos[0]++;
      this.currPos[1]++;
    }

    return this.reward(rightBottom);
  }

}

module.exports = Chromosome;