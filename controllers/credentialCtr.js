
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports.signup = (req,res) => {
    console.log('Function SIGN UP is running');
  
    if( !req.body.username || !req.body.password ){
        res.json({ success: false, message: 'Enter username or password' });
    } else {
        let newUser = new User(req.body);
        
        newUser.save( (err) => {
            if(err) {
                return res.json({ success: false, message: 'Username already exist' }); // return обязательно
            }
            res.json({ success: true, message: 'Successful new user created' });
        })
    }
}


module.exports.signin = (req,res) => {
    console.log('Function SIGN IN is running');
    
    User.findOne({username: req.body.username}, function(err, user){
        
        if(err) {
             return res.status(400).json({ success: false, message: 'Enter correct username' });
        }
        if(!user) {
            return res.status(401).send({success: false, message: "Authentication failed. User not found"})
        }
        user.comparePassword(req.body.password, function(err, isMatch) {
            if(isMatch && !err) {
                let token = jwt.sign(user.toObject(), 'secret-word', {expiresIn: "1d"} );
                return res.status(200).json({success: true, message: 'Authentication is successful', token: 'JWT ' + token});
            }
            res.status(401).send({success: false, message: "Authentication failed. Wrong password"})
        })

    })
} 

