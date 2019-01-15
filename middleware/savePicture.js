const mime = require('mime');


module.exports = function(req,res,next) {
        
    req.uploadfilename = null;
    let urlImage  = null;

    if( req.files ) {

        let loadFiles = req.files.picture;
        let typeFile = mime.getExtension( req.files.picture.mimetype);
        
        urlImage = `images/image-${Date.now()}.${typeFile}`;

        loadFiles.mv('public/' + urlImage, (error) => {
            if(error) {
                res.status(400).json({success: false, message: "Failed to load picture"})
            } 
        });
    }

    req.uploadfilename = urlImage;
    next();
}