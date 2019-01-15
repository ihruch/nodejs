const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GET home page. */


router.get('/', require('../controllers/indexCtr'));

module.exports = router;
