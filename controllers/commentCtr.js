const CommentModel =  require('../models/Comment');

module.exports.getAllPostComments = (req, res, next) => {
    CommentModel.getAllComments(req.params.postId, function(err, comments){
        if(err) {console.log(err)}
        res.json( _addCommentEditableField(comments, req.user._id) );                    

    })
}  

/*********************************************************/

module.exports.createComment = (req, res, next ) => {
    console.log('Running func "Create comment"');

    CommentModel.createSinglePost(req, (err) => {
        if(err) {
            res.status(400).json({ success: false, message: 'Error create post' });
        }
        res.status(201).json({ success: true, message: 'Post created' }); 
    })
} 
/*********************************************************/

module.exports.removeComment = (req, res, next) => {
    console.log('Running func "Remove comment"');
    
    CommentModel.removeComment(req.params.commentId, (err) => {
        if(err) {
            res.status(400).json({ success: false, message: 'Error remove comment' });
        }  
        res.status(200).json({success: true, message: 'Comment is deleted'})
    })
}

/*********************************************************/
module.exports.getSingleComment = (req, res, next) => {
    console.log('Running func "Get single comment"');
    
    CommentModel.getComment(req.params.commentId, (err, comment) => {
        if(err) {
                return res.status(400).json({success: false, message: "Not exist comment" })    
            }
            res.status(200).json(comment);
        })
}
    
    
/*********************************************************/
module.exports.updateComment = (req, res, next ) => {
        console.log('Running func "Edit comment"');
        
        CommentModel.updateSingleComment(req, (err, comment) => {
            if(err) {
                return res.status(400).json({success: false, message: "Not update comment" })    
            }
            
            res.status(200).json(comment);
        })
        
}

/*********************************************************/     
module.exports.removeAllComments = (req, res, next) => {    
    console.log('Running func "Delete All comments"');
    console.log('req comments ALL', req.body);
    // CommentModel.deleteMany();
    CommentModel.deleteMany({post: req.params.postId}, (err) => {
        if(err) console.log(err);

        res.status(200).json({success: true, message: 'Comments is deleted'})
    })
    

}

/*********************************************************/    
const _addCommentEditableField = function(comments, authUserId) {
    console.log("*******************START *********************");

    return comments.map(comment => {
        
        comment.editable = comment.author._id.equals(authUserId);
        // console.log('comment.editable --- ',  comment.editable);
        console.log('comment --- ',  comment);
        return comment;
    });
};


