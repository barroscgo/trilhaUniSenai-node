const fs = require('fs');

try {
  const conteudo = fs.readFileSync('inexistente.txt', 'utf8');
  console.log(conteudo);
} catch (error) {
  console.error('Arquivo não encontrado:', error.message);
}
