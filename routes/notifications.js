const express = require('express');
const router = express.Router();

/* GET notifications page. */
router.get('/', require('../controllers/notifController'));

module.exports = router;
