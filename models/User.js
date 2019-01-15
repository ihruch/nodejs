const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');


const userSchema = mongoose.Schema({

    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    username:  { type: String, unique: true, require: [true, 'Username is required']},
    password:  { type: String, required: [true, 'Password is required'] },
    firstName: { type: String },
    lastName:  {type: String },
    description: {type: String  },
    avatar: { type: String , default: '/images/av_u2.png' },
    email: { type: String}

});

userSchema.pre('save', function(next) {

  if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          return next(err);
        }
        bcrypt.hash(this.password, salt, null, (err, hash) =>{
          if (err) {
            return next(err);
          }
          this.password = hash;
          next();
        });
      });
  }
});


userSchema.methods.comparePassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch){
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
