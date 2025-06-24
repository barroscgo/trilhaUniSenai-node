const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();
app.use(express.json());

// Middleware (questão 3)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Banco de dados (questões 2, 4, 5, 6, 7, 9)
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Rota GET /
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Rota GET /usuarios (listar todos)
app.get('/usuarios', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (err) {
    res.status(500).send('Erro ao buscar usuários');
  }
});

// Rota POST /usuarios
app.post('/usuarios', async (req, res) => {
  const { nome } = req.body;
  await pool.execute('INSERT INTO usuarios (nome) VALUES (?)', [nome]);
  res.status(201).send('Usuário criado');
});

// Rota PUT /usuarios/:id
app.put('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  await pool.execute('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, id]);
  res.send('Usuário atualizado');
});

// Rota DELETE /usuarios/:id
app.delete('/usuarios/:id', async (req, res) => {
  const { id } = req.params;
  await pool.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  res.send('Usuário deletado');
});

// Rota GET /usuarios/nome/:nome (prepared statement seguro)
app.get('/usuarios/nome/:nome', async (req, res) => {
  const { nome } = req.params;
  const [rows] = await pool.execute('SELECT * FROM usuarios WHERE nome = ?', [nome]);
  res.json(rows);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
