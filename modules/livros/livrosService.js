// @ts-check
const { asyncHandler } = require('../../utils');
const LivrosDAL = require('./livrosDAL');

exports.create = function create (req, res, next) {
  const { id, nome } = req.body;

  // TODO: validar parâmetros

  LivrosDAL.create(id, nome)
    .then(livro => res.status(200).json(livro))
    .catch(next);
};

exports.list = function list (req, res, next) {
  LivrosDAL.list()
    .then(livros => res.status(200).json(livros))
    .catch(next);
};

exports.findById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // TODO: validar parâmetros

  const livroEncontrado = await LivrosDAL.findById(id);
  if (livroEncontrado) return res.status(200).json(livroEncontrado);

  throw Error(`O livro com id '${id}' não foi encontrado`);// §
});

exports.updateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const returnNew = req.query.return_new === 'true';
  const updatedFields = req.body;

  // TODO: validar parâmetros

  const livro = await LivrosDAL.updateById(id, updatedFields, { returnNew });
  if (livro) return res.status(200).json(livro);

  throw Error(`O livro com id '${id}' não foi encontrado`);// §
});

exports.removeById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // TODO: validar parâmetros

  const livroRemovido = await LivrosDAL.removeById(id);
  if (livroRemovido) return res.status(200).json(livroRemovido);

  throw Error(`O livro com id '${id}' não foi encontrado`);// §
});
