var url = require('url');
module.exports = (req, res, next) => {

    const urlParse = url.parse(req.url, true);
    const objPath = {
        method: req.method,
        fullPath: urlParse.path,
        path: urlParse.pathname,
        query: urlParse.query
    }

    console.log("**************************");
    console.log(objPath);
    console.log("**************************");
    next();
}