const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const SECRET = 'minha_super_senha';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS – permite só seu domínio
app.use(cors({
  origin: 'http://localhost:3000', // Troque pelo domínio desejado
  credentials: true
}));

// Cookies e Sessão
app.use(cookieParser());
app.use(session({
  secret: 'super_secreto',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));

// Set cookie seguro
app.get('/setcookie', (req, res) => {
  res.cookie('meuToken', '123', {
    httpOnly: true,
    secure: false, // true se HTTPS
    sameSite: 'strict'
  });
  res.send('Cookie seguro enviado!');
});

// Sessão simples
app.post('/login-session', (req, res) => {
  req.session.usuario = { nome: 'Gabriel' };
  res.send('Sessão criada!');
});

app.get('/session-info', (req, res) => {
  res.json(req.session.usuario || 'Nenhuma sessão');
});

const csrfSetup = require('./csrf');
csrfSetup(app);

// Login com JWT
app.post('/login', async (req, res) => {
  const { nome, senha } = req.body;
  const [users] = await pool.execute(
    'SELECT * FROM usuarios WHERE nome = ? AND senha = ?', [nome, senha]
  );
  if (users.length) {
    const token = jwt.sign(
      { nome: users[0].nome, role: users[0].role },
      SECRET, { expiresIn: '1h' }
    );
    res.json({ token });
  } else {
    res.status(401).send('Login inválido');
  }
});

// Middleware de autenticação JWT
function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Middleware de roles
function roleMiddleware(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) next();
    else res.status(403).send('Acesso negado.');
  }
}

// Rota protegida por JWT
app.get('/jwt-protegido', authMiddleware, (req, res) => {
  res.send('Você acessou uma rota protegida por JWT');
});

// Rota só para admin
app.get('/admin', authMiddleware, roleMiddleware('admin'), (req, res) => {
  res.send('Bem-vindo admin!');
});

// Rota de formulário com CSRF
app.get('/form', (req, res) => {
  res.send(`<form action="/processa" method="POST">
    <input type="hidden" name="_csrf" value="${req.csrfToken()}">
    <button type="submit">Enviar</button>
  </form>`);
});

app.post('/processa', (req, res) => {
  res.send('Token CSRF validado!');
});

// Consulta segura (prepared statement)
app.get('/busca', async (req, res) => {
  const nome = req.query.nome;
  const [rows] = await pool.execute('SELECT * FROM usuarios WHERE nome = ?', [nome]);
  res.json(rows);
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
