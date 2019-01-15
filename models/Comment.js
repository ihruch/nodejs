const mongoose = require('mongoose');


const commentSchema = mongoose.Schema({
     _id:             { type: mongoose.Schema.Types.ObjectId, auto: true},
     post:            { type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
     author:          { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
     text:            { type: String, required: [true, 'Text is required']},
     publicationDate: { type: Date, default: Date.now()}
});

commentSchema.statics.getAllComments = function(id, cb) {
    return this.find({}).where({ post: id }).sort({publicationDate: -1}).lean().populate("author").exec(cb);
}

/** */
commentSchema.statics.createSinglePost = function(req, cb) {
    const newComment = this.initProps(req);
    return this.create(newComment, cb)
}
/** */
commentSchema.statics.getComment = function(id, cb){
    return this.where({_id: id }).findOne().exec(cb);
}

/** */
commentSchema.statics.updateSingleComment = function(req, cb) {
    const newComment = this.initProps(req);
    return this.where({_id: req.params.commentId}).updateOne({$set: newComment}).exec(cb);
}

/** */
commentSchema.statics.removeComment = function(id,cb){
    return this.where({_id: id}).deleteOne().exec(cb)
}

/** */
commentSchema.statics.removeAllPostComments = function(id,cb){
    
}

/** */
commentSchema.statics.initProps = function(req) {
            
    const comment = {};
        
    if (req.body.text) {
        comment.text = req.body.text;
    }
    if (req.params.postId) {
        comment.post = req.params.postId;
    }

    comment.author = req.user._id;
     
    return comment;
}  

module.exports = mongoose.model('Comment', commentSchema)

