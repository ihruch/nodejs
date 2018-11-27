var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.use(function(req, res, next){
//   console.log("***********************")
//       const lin = [{
//         "header": "Man must explore, and this is exploration at its greatest",
//         "subheader": "Problems look mighty small from 150 miles up",
//         "meta": "Posted by Start Bootstrap on August 24, 2018",
//         "body": "Never in all their history have men been able truly."
//       }]
//       res.json(lin);
//   next();
// })

router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  res.render("post", { title: 'Post page' })
});

module.exports = router;
