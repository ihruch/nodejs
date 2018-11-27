var fs = require('fs');
var http = require('http');
var zlib = require('zlib');

const hostname = '127.0.0.1';
const port = 3000;

var server = new http.Server(function(req,res) {
   
    var filename = req.headers.filename;
    console.log("File requested : " + filename);
    
    req
        .on("error", (error) => { 
            res.writeHead(500, { 'Content-Type': 'text/plain'}) ;
            res.end();  
            console.error("Error " + error.stack)
        })
        .pipe(zlib.Unzip())
        
        .pipe(fs.createWriteStream(filename))
        .on('finish',() => { 
            res.writeHead(201,{ 'Content-Type': 'text/plain'})
            res.end();
            
        })
})

server.listen(3000, "127.0.0.1");
console.info('Server is running');

