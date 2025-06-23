const fs = require('fs');

fs.readFile('texto.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
  } else {
    console.log('Conteúdo do arquivo:', data);
  }
});
