const mongoose = require('mongoose');

const userShema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    username:  {type : String},
    firstName: {type : String},
    lastName:  {type : String},
    password:  {type : String, required: [true, 'Password is required'] },    
    email:     {type : String}, 
    avatarUrl: {
        type: String, 
        default: 'images/term.jpeg' 
    }
     
})

const User = mongoose.model('User', userShema);

module.exports = User;
