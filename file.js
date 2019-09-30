const fs = require('fs');

module.exports = {
  data: (file) => fs.readFileSync(file, 'utf8'),
  lines: (fileData) => fileData.trim().split('\n'),
}