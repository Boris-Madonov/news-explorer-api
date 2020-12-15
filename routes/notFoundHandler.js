const router = require('express').Router();
const notFoundHandler = require('../controllers/notFoundHandler');

router.all('*', notFoundHandler);

module.exports = router;
