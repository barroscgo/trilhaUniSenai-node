const usuarioModel = require('../models/usuarioModel');

exports.listar = async (req, res) => {
  const { page = 1, limit = 10, nome } = req.query;
  const offset = (page - 1) * limit;
  const usuarios = await usuarioModel.findAll(offset, limit, nome);
  res.json(usuarios);
};

exports.criar = async (req, res) => {
  const usuario = await usuarioModel.create(req.body);
  res.status(201).json(usuario);
};

exports.atualizar = async (req, res) => {
  await usuarioModel.update(req.params.id, req.body);
  res.json({ mensagem: 'Registro atualizado!' });
};

exports.deletar = async (req, res) => {
  await usuarioModel.delete(req.params.id);
  res.json({ mensagem: 'Registro excluído!' });
};
