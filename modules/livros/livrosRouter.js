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

/*
// Middleware para informar em caso de parâmetros inválidos
router.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(422).json({ errors: errors.array() });
  }

  next();
});
*/


module.exports = router;
