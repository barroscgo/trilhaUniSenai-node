const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bem-vindo ao Node.js!');
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
