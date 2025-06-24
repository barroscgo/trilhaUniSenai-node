const db = require('./db');

exports.listar = async (req, res) => {
  const [rows] = await db.query('SELECT * FROM usuarios');
  res.json(rows);
};

exports.criar = async (req, res) => {
  const { nome } = req.body;
  await db.execute('INSERT INTO usuarios (nome) VALUES (?)', [nome]);
  res.status(201).send('Usuário criado!');
};

exports.atualizar = async (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;
  await db.execute('UPDATE usuarios SET nome = ? WHERE id = ?', [nome, id]);
  res.send('Usuário atualizado!');
};

exports.deletar = async (req, res) => {
  const { id } = req.params;
  await db.execute('DELETE FROM usuarios WHERE id = ?', [id]);
  res.send('Usuário deletado!');
};
