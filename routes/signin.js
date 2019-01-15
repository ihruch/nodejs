const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginCtr');

/* GET view signIN page. */
router.get('/', controller.signin);

module.exports = router;
