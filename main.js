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

      if(localAtual[0] === matrix.length - 1) return aptidao('1');
      if(localAtual[1] === matrix.length - 1) return aptidao('1');

      const direitaBaixo = matrix[localAtual[0] + 1][localAtual[1] + 1];

      if(direitaBaixo === '0'|| direitaBaixo === 'S') {
        localAtual[0]++;
        localAtual[1]++;
      }
      
      return aptidao(direitaBaixo);
    case 5:
      console.log(n, localAtual, 'baixo');
      if(localAtual[0] === matrix.length - 1) return aptidao('1');

      const baixo = matrix[localAtual[0] + 1][localAtual[1]];

      if(baixo === '0'|| baixo === 'S') {
        localAtual[0]++;
      }

      return aptidao(baixo);
    case 6:
      console.log(n, localAtual, 'esquerda baixo');
      if(localAtual[0] === matrix.length - 1) return aptidao('1');
      if(localAtual[1] === 0) return aptidao('1');

      const esquerdaBaixo = matrix[localAtual[0] + 1][localAtual[1] - 1];

      if(esquerdaBaixo === '0'|| esquerdaBaixo === 'S') {
        localAtual[0]++;
        localAtual[1]--;
      }

      return aptidao(esquerdaBaixo);
    case 7:
      console.log(n, localAtual, 'esquerda');
      if(localAtual[1] === 0) return aptidao('1');

      const esquerda = matrix[localAtual[0]][localAtual[1] - 1];

      if(esquerda === '0'|| esquerda === 'S'|| esquerda === 'E') {
        localAtual[1]--;
      }

      return aptidao(esquerda);
    case 8:
      console.log(n, localAtual, 'esquerda cima');
      if(localAtual[0] === 0) return aptidao('1');
      if(localAtual[1] === 0) return aptidao('1');

      const esquerdaCima = matrix[localAtual[0] - 1][localAtual[1] - 1];

      if(esquerdaCima === '0'|| esquerdaCima === 'S'|| esquerdaCima === 'E') {
        localAtual[0]--;
        localAtual[1]--;
      }

      return aptidao(esquerdaCima);
    default:
      console.log(n, 'ERRO!!!');
      break;
  }
}


console.log(populacao[0].length)


for (let i = 0; i < populacao.length; i++) {
  let aptidaoTotal = 0;
  for (let j = 0; j < populacao[0].length - 1; j++) {
    aptidaoTotal += move(populacao[i][j])
  }
  
  console.log(aptidaoTotal);
  populacao[i].push(aptidaoTotal);
}

function elitismo(populacao){
  tamanho = populacao[1].length;
  const braba = populacao[0][tamanho];
  const linhaBraba = 0;
  for (let i = 0; i < populacao.length; i++) {
    if(populacao[i][tamanho]<braba){
      braba = populacao[i][tamanho];
      linhaBraba = i;
    }
    for(let j=0;j<tamanho;j++) {
      populacao[0][j] = matrizA[linhaBraba][j];
    }
    console.log('alo'+linhaBraba);
  }
}

function torneio(populacao){
  let primeira = populacao[0].Math.random() * (populacao[0].length - 1) + 1;
  let segunda = populacao[0].Math.random() * (populacao[0].length - 1) + 1;

  return(primeira + segunda)
}


// for (let i = 0; i < populacao[0].length; i++) {
//   const m = move(populacao[0][i])
//   console.log('++++', m);
//   console.log('soma', aptidaoTotal += m);
// }

// console.log(populacao);