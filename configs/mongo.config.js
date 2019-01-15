
const mongoose = require('mongoose');
const urlDB = 'mongodb://ds129926.mlab.com:29926/data-posts-comments';
const credentials = {
    user: 'admin',
    pass: 'admin2018',
    useNewUrlParser: true 
}

mongoose.connect(urlDB, credentials);

mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to ' + urlDB);
});

mongoose.connection.on('error', () => {
    console.log('Mongoose default connection error: ' + urlDB);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection disconnected'); 
});

process.on('signin', () => {  
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    });
})

module.exports = mongoose;

