const express = require('express');
const app = express();
const pool = require('./db');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT * FROM usuarios');
    res.render('pages/index', { titulo: 'Página Inicial', usuarios });
  } catch (err) {
    res.render('pages/erro', { mensagem: 'Erro ao carregar a página inicial' });
  }
});

app.get('/usuarios', async (req, res) => {
  try {
    const [usuarios] = await pool.query('SELECT * FROM usuarios');
    res.render('pages/usuario', { titulo: 'Lista de Usuários', usuarios });
  } catch (err) {
    res.render('pages/erro', { mensagem: 'Erro ao listar usuários.' });
  }
});

app.get('/cadastro', (req, res) => {
  res.render('pages/formulario', { titulo: 'Cadastrar Usuário' });
});

app.post('/cadastro', async (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.render('pages/erro', { mensagem: 'Nome é obrigatório!' });
  }
  try {
    await pool.query('INSERT INTO usuarios (nome) VALUES (?)', [nome]);
    res.redirect('/usuarios');
  } catch (err) {
    res.render('pages/erro', { mensagem: 'Erro ao inserir usuário.' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
