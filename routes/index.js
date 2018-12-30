const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', require('../controllers/indexController') );

module.exports = router;
