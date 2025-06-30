const http = require('http').createServer();
const io = require('socket.io')(http, {
  cors: {
    origin: "*"
  }
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  socket.on('mensagem', (msg) => {
    console.log('Mensagem recebida:', msg);
    io.emit('mensagem', msg); // envia pra todos
  });
});

http.listen(3000, () => {
  console.log('Servidor Socket.io rodando na porta 3000');
});
