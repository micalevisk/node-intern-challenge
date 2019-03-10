// @ts-check
const {
  Schema,
  ModelFactory,
} = require('../../db');

const LivroSchema = new Schema({

  'id': {
    unique: true,
    required: true,
    type: Number,
  },

  'nome': {
    required: true,
    type: String,
  },

});


module.exports = ModelFactory('Livro', LivroSchema);
