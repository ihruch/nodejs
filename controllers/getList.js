var list = require('../data/list');

module.exports = function(req, res, next) {
    res.json(list);
   // res.render('index', { title: 'Express', json: JSON.stringify( list )  });
}