const logger = require('./logger');

function executarTarefa() {
  logger.info('Tarefa iniciada');
  try {
    // Simula erro proposital
    throw new Error('Erro proposital na tarefa');
  } catch (err) {
    logger.error('Ocorreu um erro:', err);
  }
}

executarTarefa();
