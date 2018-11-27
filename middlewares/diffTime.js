
module.exports = function(req, res, next){
    
    var time = process.hrtime();
    req.on('end', () => {
        var diff = process.hrtime(time);
        console.log(`Benchmark took ${diff[0] * 1e9 + diff[1]} nanoseconds`);
    })
    next();
}