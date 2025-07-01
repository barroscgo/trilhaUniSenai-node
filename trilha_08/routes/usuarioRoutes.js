const express = require('express');
const controller = require('../controllers/usuarioController');
const validate = require('../middlewares/validate');
const Joi = require('joi');

const router = express.Router();

const usuarioSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required()
});

router.get('/', controller.listar);
router.post('/', validate(usuarioSchema), controller.criar);
router.put('/:id', validate(usuarioSchema), controller.atualizar);
router.delete('/:id', controller.deletar);

module.exports = router;
