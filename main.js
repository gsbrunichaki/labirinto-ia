// const file = require('./file');
// const maze = require('./maze');

// // Pega nome do arquivo no parâmetro
// file.setName() = process.argv[2];

// // Tamanho do labirinto
// maze.size = file.lines[0];

// // Popula matriz com o conteúdo do arquivo .txt (pula a primeira linha)
// file.lines.filter((_, index) => index > 0).forEach((line) => {
//   maze.matrix.push(line.trim().split(' '));
// });

// // Matriz unidimensional para contar ocorrências
// const flat = (acc, cur) => acc.concat(cur);
// const flatMatrix = maze.matrix.reduce(flat, []);

// // Número de posições livres
// maze.freeways = flatMatrix.filter((element) => element === '0').length;

// file.test();

const fs = require('fs');

const matrix = [];
const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.trim().split('\n');

lines.filter((_, index) => index > 0).forEach((line) => {
  matrix.push(line.trim().split(' '));
});

console.log(matrix);

const flat = (acc, cur) => acc.concat(cur);
const flatMatrix = matrix.reduce(flat, []);

// Número de posições livres
const freeways = flatMatrix.filter((element) => element === '0').length;

const qtdPopulacao = 30;

console.log(freeways);

function randomMove(min, max) {
  return Math.random() * (max - min) + min;
}

const populacao = [];


for (let i = 0; i < qtdPopulacao; i++) {
  const individuo = [];
  
  for (let j = 0; j < freeways; j++) {
    individuo.push(Math.round(randomMove(1, 8), 0));
  }
  
  populacao.push(individuo);
  
}

function aptidao(destino) {
  console.log(destino);
  switch (destino) {
    case '1':
      return -1;
    case '0':
      return 1;
    case 'E':
      return -1;
    case 'S':
      return 10000;
    default:
      return 0;
  }
}

let localAtual = [0, 0];

function move(n) {
  switch (n) {
    case 1:
      console.log(n, localAtual, 'cima');
      
      if (localAtual[0] === 0) return aptidao('1');

      const cima = matrix[localAtual[0] - 1][localAtual[1]];

      if (cima === '0' || cima === 'E' || cima === 'S') {
        localAtual[0]--;
      }

      return aptidao(cima);
    case 2:
      console.log(n, localAtual, 'direita cima');
      
      if (localAtual[0] === 0) return aptidao('1');
      if (localAtual[1] === matrix.length - 1) return aptidao('1');

      const direitaCima = matrix[localAtual[0] - 1][localAtual[1] + 1]

      if(direitaCima === '0' || direitaCima === 'S') {
        localAtual[0]--;
        localAtual[1]++;
      }

      return aptidao(direitaCima);
    case 3:
      console.log(n, localAtual, 'direita');

      if(localAtual[1] === matrix.length - 1) return aptidao('1');

      const direita = matrix[localAtual[0]][localAtual[1] + 1];

      if(direita === '0' || direita === 'S') {
        localAtual[1]++;
      }

      return aptidao(direita);
    case 4:
      console.log(n, localAtual, 'direita baixo');
      if(localAtual[0] === matrix.length - 1) break;
      if(localAtual[1] === matrix.length - 1) break;

      const destino4 = matrix[localAtual[0] + 1][localAtual[1] + 1];

      if(destino4 === '0'
      || destino4 === 'S') {
        localAtual[0]++;
        localAtual[1]++;
      }
      
      return aptidao(destino4);
    case 5:
      console.log(n, localAtual, 'baixo');
      if(localAtual[0] === matrix.length - 1) break;

      const destino5 = matrix[localAtual[0] + 1][localAtual[1]];

      if(destino5 === '0'
      || destino5 === 'S') {
        localAtual[0]++;
      }

      return aptidao(destino5);
    case 6:
      console.log(n, localAtual, 'esquerda baixo');
      if(localAtual[0] === matrix.length - 1) break;
      if(localAtual[1] === 0) break;

      const destino6 = matrix[localAtual[0] + 1][localAtual[1] - 1];

      if(destino6 === '0'
      || destino6 === 'S') {
        localAtual[0]++;
        localAtual[1]--;
      }

      return aptidao(destino6);
    case 7:
      console.log(n, localAtual, 'esquerda');
      if(localAtual[1] === 0) break;

      const destino7 = matrix[localAtual[0]][localAtual[1] - 1];

      if(destino7 === '0'
      || destino7 === 'S'
      || destino7 === 'E') {
        localAtual[1]--;
      }

      return aptidao(destino7);
    case 8:
      console.log(n, localAtual, 'esquerda cima');
      if(localAtual[0] === 0) break;
      if(localAtual[1] === 0) break;

      const destino8 = matrix[localAtual[0] - 1][localAtual[1] - 1];

      if(destino8 === '0'
      || destino8 === 'S'
      || destino8 === 'E') {
        localAtual[0]--;
        localAtual[1]--;
      }

      return aptidao(destino8);
    default:
      console.log(n, 'ERRO!!!');
      break;
  }
}

let aptidaoTotal = 0;

for (let i = 0; i < populacao[0].length; i++) {
  aptidaoTotal += move(populacao[0][i]);
}

console.log(aptidaoTotal);