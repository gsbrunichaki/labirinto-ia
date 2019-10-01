class Maze {

  constructor(lines) {
    this.size = lines[0];
    this.matrix = this.generateMatrix(lines);
    this.flatMatrix = this.generateFlatMatrix();
    this.freeBlocks = this.countFreeBlocks();
  }

  getFreeBlocks() {
    return this.freeBlocks;
  }

  getMatrix() {
    return this.matrix;
  }

  getSize() {
    return this.size;
  }
  
  generateMatrix(lines) {
    const withoutFirstLine = lines.filter((_, index) => index > 0);
    return withoutFirstLine.map((line) => line.trim().split(' '));
  }

  generateFlatMatrix() {
    const flat = (acc, cur) => acc.concat(cur);
    return this.matrix.reduce(flat, []);
  }

  countFreeBlocks() {
    return this.flatMatrix.filter((pos) => pos === '0').length;
  }

}

module.exports = Maze;