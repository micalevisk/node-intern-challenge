// @ts-check
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../',
    process.env.NODE_ENV === 'development' ? '.env.dev' : '.env'),
});

const database = require('./database');

const allRequiredVarNames = Array.prototype.concat(
  database.REQUIRED_ENV_VAR_NAMES,
);

// Verifica se está faltando alguma variável de ambiente dada como obrigatória
for (const envVarName of allRequiredVarNames) {
  if (!(envVarName in process.env)) { // o valor vazio pode ser usado como bypass
    throw Error(`Env. variable '${envVarName}' is missing`);
  }
}


module.exports = {
  dbConfig: database.config,
};
