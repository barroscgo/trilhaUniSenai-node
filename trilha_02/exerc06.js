const fs = require('fs');

const dados = { nome: 'João', idade: 30 };
fs.writeFileSync('usuario.json', JSON.stringify(dados));

const conteudo = fs.readFileSync('usuario.json', 'utf8');
const usuario = JSON.parse(conteudo);
console.log(usuario);
