const fs = require('fs');

const stream = fs.createReadStream('arquivo_grande.txt', 'utf8');

stream.on('data', (chunk) => {
  console.log('Novo pedaço:', chunk);
});
