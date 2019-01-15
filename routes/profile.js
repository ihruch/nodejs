const express = require('express');
const router = express.Router();

/* GET profile page. */
router.get('/', require('../controllers/profileCtr'));

module.exports = router;
