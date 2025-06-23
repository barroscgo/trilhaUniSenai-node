const fs = require('fs');

fs.readFile('usuario.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
  } else {
    const usuario = JSON.parse(data);
    console.log('Informações do usuário:', usuario);
  }
});
