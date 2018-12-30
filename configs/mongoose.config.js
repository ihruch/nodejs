const mongoose = require('mongoose');
const url = 'mongodb://ds147033.mlab.com:47033/data-posts';
const credentials = {
    user: 'admin',
    pass: 'admin2018',
    useNewUrlParser: true 
}

mongoose.connect(url, credentials);

mongoose.connection.on('connected', () => {
    console.log("Mongoose connected to : " + url);
} )
mongoose.connection.on('error', () => {
    console.log("Mongoose connection error : " + url);
} )

module.exports = mongoose;