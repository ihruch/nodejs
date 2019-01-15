const mongoose = require('mongoose');
const User = require('../models/User');
const fs = require('fs');

const postSchema  =  mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    publicationDate: {type: Date, default: Date.now() },
    text: {type: String},
    picture: {type: String}
});

postSchema.statics.createPost = function(req, cb) {
    const post = this.initProps(req);
    return this.create(post, cb);
}

postSchema.statics.findAllPosts = function(cb) {
    return this.find({})
        .lean()
        .populate("author")
        .exec(cb);
} 

postSchema.statics.findSinglePost = function(id, cb) {
    return this.where({_id: id }).findOne().exec(cb)
}

postSchema.statics.updateSinglePost = function(req,cb) {
    const upPost = this.initProps(req);
    return this.where({_id: req.params.postId}).updateOne({$set: upPost}).exec(cb);
}


postSchema.statics.removeSinglePost = function(id,cb){
    return this.where({_id: id}).deleteOne().exec(cb)
}

postSchema.statics.deletePicture = function(id,cb) {
    return this.where({_id: id}).findOne().exec(cb );
}

postSchema.statics.initProps = function(req) {
    const post = {};
        
    if (req.body.text) {
        post.text = req.body.text;
    }
        
    if (req.uploadfilename) {
        post.picture = req.uploadfilename ; 
    }
    // else {
    //     post.picture = 'https://via.placeholder.com/346x335.png'
    // }

    if(!post.author) {
        post.author = req.user._id;
    }

    return post;
}



module.exports = mongoose.model('Post', postSchema);