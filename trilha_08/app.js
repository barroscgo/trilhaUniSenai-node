const express = require('express');
const usuarioRoutes = require('./routes/usuarioRoutes');
const logger = require('./middlewares/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerDoc = require('./docs/swagger.json');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/usuarios', usuarioRoutes);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.listen(3000, () => console.log('API rodando na porta 3000'));
