const randomBetween = require('./random');

class Chromosome {

  constructor(genesLength) {
    this.genesLength = genesLength;
    this.genes = this.generateGenes();
    this.currPos = [0, 0];
    this.path = [];
    this.fitness = 0;
    this.foundExit = false;
  }

  getPath() {
    return this.path;
  }

  getFoundExit() {
    return this.foundExit;
  }

  accFitness(value) {
    this.fitness += value;
  }

  getFitness() {
    return this.fitness;
  }

  getGenes() {
    return this.genes;
  }

  setGenes(genes) {
    this.genes = genes;
  }

  getCurrPos() {
    return this.currPos;
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
      case 5: return this.moveBottom(x, y, matrix);
      case 6: return this.moveLeftBottom(x, y, matrix);
      case 7: return this.moveLeft(x, y, matrix);
      case 8: return this.moveLeftUp(x, y, matrix);
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
      this.foundExit = up === 'S';
      this.currPos[0]--;
    }

    this.path.push([x - 1, y]);

    return this.reward(up);
  }

  moveRightUp(x, y, matrix) {
    if (x === 0 || y === matrix.length - 1) {
      return this.reward('1');
    }

    const rightUp = matrix[x - 1][y + 1];

    if (rightUp === '0' || rightUp === 'S') {
      this.foundExit = rightUp === 'S';
      this.currPos[0]--;
      this.currPos[1]++;
    }

    this.path.push([x - 1, y + 1]);

    return this.reward(rightUp);
  }

  moveRight(x, y, matrix) {
    if (y === matrix.length - 1) {
      return this.reward('1');
    }

    const right = matrix[x][y + 1];

    if (right === '0' || right === 'S') {
      this.foundExit = right === 'S';
      this.currPos[1]++;
    }

    this.path.push([x, y + 1]);

    return this.reward(right);
  }

  moveRightBottom(x, y, matrix) {
    if (x === matrix.length - 1 || y === matrix.length - 1) {
      return this.reward('1');
    }

    const rightBottom = matrix[x + 1][y + 1];

    if (rightBottom === '0' || rightBottom === 'S') {
      this.foundExit = rightBottom === 'S';
      this.currPos[0]++;
      this.currPos[1]++;
    }

    this.path.push([x + 1, y + 1]);

    return this.reward(rightBottom);
  }

  moveBottom(x, y, matrix) {
    if (x === matrix.length - 1) {
      return this.reward('1');
    }

    const bottom = matrix[x + 1][y];

    if (bottom === '0' || bottom === 'S') {
      this.foundExit = bottom === 'S';
      this.currPos[0]++;
    }

    this.path.push([x + 1, y]);

    return this.reward(bottom);
  }

  moveLeftBottom(x, y, matrix) {
    if (x === matrix.length - 1 || y === 0) {
      return this.reward('1');
    }

    const leftBottom = matrix[x + 1][y - 1];

    if (leftBottom === '0' || leftBottom === 'S') {
      this.foundExit = leftBottom === 'S';
      this.currPos[0]++;
      this.currPos[1]--;
    }

    this.path.push([x + 1, y - 1]);

    return this.reward(leftBottom);
  }

  moveLeft(x, y, matrix) {
    if (y === 0) {
      return this.reward('1');
    }

    const left = matrix[x][y - 1];

    if (left === '0' || left === 'S' || left === 'E') {
      this.foundExit = left === 'S';
      this.currPos[1]--;
    }

    this.path.push([x, y - 1]);

    return this.reward(left);
  }

  moveLeftUp(x, y, matrix) {
    if (x === 0 || y === 0) {
      return this.reward('1');
    }

    const leftUp = matrix[x - 1][y - 1];

    if (leftUp === '0' || leftUp === 'S' || leftUp === 'E') {
      this.foundExit = leftUp === 'S';
      this.currPos[0]--;
      this.currPos[1]--;
    }

    this.path.push([x - 1, y - 1]);

    return this.reward(leftUp);
  }

}

module.exports = Chromosome;