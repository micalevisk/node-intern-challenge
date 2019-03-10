// @ts-check
const LivrosDAL = require('./livrosDAL');

exports.create = function (req, res, next) {
  const { id, nome } = req.body;

  // TODO: validar parâmetros

  LivrosDAL.create(id, nome)
    .then(livro => res.status(200).json(livro))
    .catch(next);
};

exports.list = function (req, res, next) {
  LivrosDAL.list()
    .then(livros => res.status(200).json(livros))
    .catch(next);
};

exports.findById = async function (req, res, next) {
  const { id } = req.params;

  // TODO: validar parâmetros

  try {
    const livroEncontrado = await LivrosDAL.findById(id);
    if (livroEncontrado) return res.status(200).json(livroEncontrado);

    throw Error(`O livro com id '${id}' não foi encontrado`);
  } catch (error) {
    next(error);
  }
};

exports.updateById = async function (req, res, next) {
  const { id } = req.params;
  const returnNew = req.query['return_new'] === 'true';
  const updatedFields = req.body;

  // TODO: validar parâmetros

  try {
    const livro = await LivrosDAL.updateById(id, updatedFields, { returnNew });
    if (livro) return res.status(200).json(livro);

    throw Error(`O livro com id '${id}' não foi encontrado`);
  } catch (error) {
    next(error);
  }

};

exports.removeById = async function (req, res, next) {
  const { id } = req.params;

  // TODO: validar parâmetros

  try {
    const livroRemovido = LivrosDAL.removeById(id);
    if (livroRemovido) return res.status(200).json(livroRemovido)

    throw Error(`O livro com id '${id}' não foi encontrado`);
  } catch (error) {
    next(error);
  }
};


