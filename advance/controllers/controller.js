
var fs = require('fs');
var split2 = require('split2');
const through2 = require('through2');
const JSONStream = require('JSONStream');
const result = [];

module.exports = function(req, res, next){
    console.info(' Controller is running!!! ');

    res.setHeader('Content-Type', 'application/json');
   
    fs.createReadStream('./data/data.csv')
        .on('error', err => next(err))
        .pipe(split2())
        .pipe(parseCSV())
        .pipe(JSONStream.stringify())
        .pipe(res)
        // .on('data', (data) => {
        //     console.log("data all", data);
        //     result.push(data);
        // })
        // .on('end', () => {
            
        //     res.writeHead(200, { 'Content-Type': 'application/json' });
        //     res.end(JSON.stringify(result));
        // })
}
    const parseCSV = () => {
        let templateKeys = [];
        let headerLine = true;
       
        return through2.obj((chunk, enc, cb) => {      
            if (headerLine) {
                templateKeys = chunk.toString().split(' ');
                // console.log('templateKeys ', templateKeys )
                headerLine = false;
                return cb(null, null);                    
            }

            const entries = chunk.toString().split(' ');
            // console.log('entries:  ', entries)
            const obj = {};

            templateKeys.forEach((el, index) => {       
                obj[el] = entries[index];
            });
            // console.log("object", obj)
            return cb(null, obj);                       
        });
    };   
