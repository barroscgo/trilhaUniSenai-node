const fs = require('fs');

// Cria um arquivo
fs.writeFileSync('arquivo.txt', 'Palmeiras melhor do Brasil');

// Lê o arquivo
const conteudo = fs.readFileSync('arquivo.txt', 'utf8');
console.log(conteudo);
