// @ts-check
const router = require('express').Router();
// const { check, validationResult } = require('express-validator/check');

const livros = require('./livrosService');

// TODO: middleware para validar parâmetros usando o `express-validator`

router.route('/')
  .get(livros.list)
  .post(livros.create);

router.route('/:id')
  .get(livros.findById)
  .put(livros.updateById)
  .delete(livros.removeById)


module.exports = router;
