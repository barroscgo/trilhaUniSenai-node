
const { parentPort } = require('worker_threads');

setTimeout(() => {
  parentPort.postMessage('Tarefa concluída pelo worker!');
}, 2000);
