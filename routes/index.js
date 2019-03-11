// @ts-check
const router = require('express').Router();
const { isConnected } = require('../db');

router.use('/calcs', require('./calcs'));

// middleware para verificar o estado do BD, que será usada por `/api`
router.use((req, res, next) => {
  if (isConnected()) return next();
  throw new Error(`Database is not connected`);
});

router.use('/api', require('./api'));

module.exports = router;
