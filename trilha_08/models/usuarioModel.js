const pool = require('../db');

exports.findAll = async (offset = 0, limit = 10, filtro = '') => {
  let query = 'SELECT * FROM usuarios';
  let params = [];
  if (filtro) {
    query += ' WHERE nome LIKE ?';
    params.push(`%${filtro}%`);
  }
  query += ' LIMIT ? OFFSET ?';
  params.push(Number(limit), Number(offset));
  const [rows] = await pool.query(query, params);
  return rows;
};

exports.findById = async (id) => {
  const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
  return rows[0];
};

exports.create = async (usuario) => {
  const { nome, email } = usuario;
  const [result] = await pool.query(
    'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
    [nome, email]
  );
  return { id: result.insertId, ...usuario };
};

exports.update = async (id, usuario) => {
  const { nome, email } = usuario;
  await pool.query(
    'UPDATE usuarios SET nome = ?, email = ? WHERE id = ?',
    [nome, email, id]
  );
};

exports.delete = async (id) => {
  await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
};
