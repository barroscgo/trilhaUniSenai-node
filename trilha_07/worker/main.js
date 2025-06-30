
const { Worker } = require('worker_threads');
const { createLogger, transports } = require('winston');

const logger = createLogger({
  transports: [new transports.File({ filename: 'worker.log' })]
});

const worker = new Worker('./worker.js');
worker.on('message', msg => {
  logger.info(msg);
  console.log('Mensagem do worker:', msg);
});
worker.on('error', err => {
  logger.error('Erro do worker:', err);
});
