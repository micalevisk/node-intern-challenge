// @ts-check
/* eslint-disable no-console */
const mongoose = require('mongoose');

const {
  username,
  password,
  host,
  port,
  name,
} = require('../config').dbConfig;

const isDevelopment = process.env.NODE_ENV === 'development';

// Fix all deprecation warnings for all connections:
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const isConnected = () => mongoose.connection.readyState === 1;

// mongodb://[username:password@]host1[:port1][,...hostN[:portN]]][/[database][?options]]
const URI = `mongodb://${!isDevelopment ? (`${username}:${password}@`) : ''}${host}:${port}/${name}`;

/**
 * @param {string} strURI URI para a conexão
 * @returns {mongoose.Connection} O objeto que representa a conexão estabelecida; o mesmo que database.
 */
function connect (strURI) {
  mongoose.connect(strURI);
  const conn = mongoose.connection;

  conn.on('connected', console.log.bind(console, `[MongoDB] connection is open to: '${host}:${port}/${name}'`));

  conn.on('error', (err) => {
    console.log(`[MongoDB] Failed to connect to DB '${name}' on startup`, err);
  });

  conn.on('disconnected', console.log.bind(console, `[MongoDB] connection to DB '${name}' is disconnected`));


  function gracefulExit (signal, exitCode = 0) {
    // o estado da conexão deve ser `connected`
    if (isConnected()) {
      conn.close(() => {
        console.log(`[MongoDB] connection to DB '${name}' is disconnected through app termination`);
        process.exit(exitCode);
      });
    } else {
      process.exit(exitCode);
    }
  }

  // If the Node process ends, close the Mongoose connection
  process
    .on('SIGINT', gracefulExit)
    .on('SIGTERM', gracefulExit)
    .on('uncaughtException', (err) => {
      console.error('Caught exception:', err);
      gracefulExit(1);
    });

  return conn;
}


module.exports = {
  Schema: mongoose.Schema,
  ModelFactory: mongoose.model,
  isConnected,
  connect: connect.bind(null, URI),
};
