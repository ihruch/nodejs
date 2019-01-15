const express = require('express');
const router = express.Router();
const controller = require('../controllers/loginCtr');

/* GET view sign UP page */
router.get('/', controller.signup);

module.exports = router;
