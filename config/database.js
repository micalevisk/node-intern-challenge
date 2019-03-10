//@ts-check
const REQUIRED_ENV_VAR_NAMES = [
  'DB_USERNAME', // não usado em dev. deixar vazio no arquivo .env.dev
  'DB_PASSWORD', // não usado em dev. deixar vazio no arquivo .env.dev
  'DB_HOST',
  'DB_NAME',
  'DB_PORT',
];

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST, // Problema: não permite múltiplos hosts
  port: process.env.DB_PORT,
  name: process.env.DB_NAME,
};


module.exports = {
  REQUIRED_ENV_VAR_NAMES,
  config,
};
