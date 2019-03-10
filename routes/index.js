// @ts-check
const router = require('express').Router();

router.use('/api', require('./api'));
router.use('/calcs', require('./calcs'));

module.exports = router;
