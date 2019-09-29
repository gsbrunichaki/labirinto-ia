const fs = require('fs');

const data = (file) => fs.readFileSync(file, 'utf8');

module.exports = data;