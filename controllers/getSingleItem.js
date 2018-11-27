var list = require('../data/list');

module.exports = function(req, res, next) {
    var id = req.params.id;
    var single = list.find( item => {return item.id === id})

    if(single){
        res.status(200).send(single);
    }else {
        res.status(404).send('нет такого id');
    }
   
}