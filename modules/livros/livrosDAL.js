// @ts-check
/* eslint-disable class-methods-use-this */
const LivroModel = require('./livro');

// Todos os métodos devem retornar um Promise, vide https://mongoosejs.com/docs/promises.html#built-in-promises
// questão: a validação deve ser feita nos callee ou nos caller?
class LivroDAL { // usando com namespace
  // retorna o documento que foi salvo.
  create (id, nome) {
    const newLivro = new LivroModel({ id, nome });
    return newLivro.save();
  }

  // retorna o documento atualizado ou `null` se não for encontrado.
  updateById (id, newProperties, opts) {
    const { returnNew = true } = opts;

    return LivroModel.findOneAndUpdate({ id }, newProperties, { new: returnNew })
      .exec();
  }

  // retorna o documento removido ou `null` se não for encontrado.
  removeById (id) {
    return LivroModel.findOneAndRemove({ id }) // assume que o `id` é um campo único
      .exec();
    /* // Caso for usar o método `deleteOne`
      .then((doc) => {
        if (!doc.ok) throw Error(`Não foi possível executar o ${this.removeById.name}`);
        return (doc.n === 1);
      });
      */
  }

  // retorna um array com os documentos encontrados.
  list () {
    return LivroModel.find()
      .lean(true)
      .exec();
  }

  // retorna o documento ou `null` se não for encontrado.
  findById (id) { // problema: ambíguo com o método `Model.findById` do Mongoose
    return LivroModel.findOne({ id }) // assume que o `id` é um campo único
      .exec();
  }
}


module.exports = new LivroDAL();
