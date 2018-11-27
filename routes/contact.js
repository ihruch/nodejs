var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render('contact.hbs', {title: 'Page contact form'})
});

router.post('/', function(req, res, next){
  let user = req.body;
  console.log('------------------------------')
  console.info(user)
  console.log('------------------------------')
  
  if( user.name !== '' && user.email !== '' && user.phone !== '' ) {
    res.status(201).end('User is created')
  }else {
    res.status(401).end('Bad response');
  }

})


module.exports = router;
