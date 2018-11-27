var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('*', require('../controllers/controller.js') );

module.exports = router;
