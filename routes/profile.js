const express = require('express');
const router = express.Router();

/* GET profile page. */
router.get('/', require('../controllers/profileController'));

module.exports = router;
