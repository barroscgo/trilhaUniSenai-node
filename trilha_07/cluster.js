
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master PID: ${process.pid} - Iniciando ${numCPUs} workers`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  const http = require('http');
  http.createServer((req, res) => {
    res.end(`Worker ${process.pid} atendendo requisição!\n`);
  }).listen(3000);
  console.log(`Worker PID: ${process.pid} rodando`);
}
