const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Página inicial');
  } else if (req.url === '/sobre') {
    res.end('Página sobre');
  } else {
    res.end('Página não encontrada');
  }
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
