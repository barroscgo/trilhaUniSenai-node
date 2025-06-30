const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.simple()
  ),
  transports: [
    new transports.File({ filename: 'app.log' })
  ]
});

logger.info('Informação registrada no arquivo');
logger.error('Erro registrado no arquivo');

module.exports = logger; // Para usar em outros arquivos
