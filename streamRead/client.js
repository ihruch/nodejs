var fs = require('fs');
var http = require('http');
var zlib = require('zlib');

var option = {
    hostname: 'localhost',
    port: 3000,
    path: '/',
    method: 'POST',
    headers: {
        'filename': 'output_data.csv',
        'Content-Type': 'application/octet-stream',
        'Content-Encoding': 'gzip'
    }
};

var req = http.request(option, function(res) {
    console.log("Server responce: " + res.statusCode);
})

fs.createReadStream('input_data.csv')
    .on('error', (err) => {
        console.error('Error readble process', err.stack);
    })
    .pipe(zlib.createGzip())
    .pipe(req)
    .on('finish', function() {
        console.log('File successfull sent');  
})
