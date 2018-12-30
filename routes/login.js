const express = require('express');
const router = express.Router();

/* GET login page. */
router.get('/', require('../controllers/loginController'));

module.exports = router;
