// @ts-check
const router = require('express').Router();

router.use('/livros', require('../../modules/livros').routes);


module.exports = router;
