const fs = require('fs');

class File {
  constructor(name) {
    this.name = name;
  }

  setName(name) {
    this.name = name;
  }

  data() {
    return fs.readFileSync(this.name, 'utf8');
  }

  lines() {
    return data().trim().split('\n');
  }
}

module.exports = File;