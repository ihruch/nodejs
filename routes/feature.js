var express = require('express');
var router = express.Router();

var getList = require('../controllers/getList');
var getSingleItem = require('../controllers/getSingleItem');
var countTime = require('../controllers/hrtimer.js');

var setHeaders = require('../middlewares/setHeaders');
var diffTime = require('../middlewares/diffTime');

router.use(setHeaders);
router.use(diffTime);

router.get('/getList', getList );
router.get('/getListItemById/:id', getSingleItem);
router.get('/hrtime', countTime);

module.exports = router;
