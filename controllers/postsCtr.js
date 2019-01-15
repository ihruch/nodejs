const PostModel =  require('../models/Post');
const mime = require('mime');
const fs = require('fs');

module.exports.getPost = (req, res) => {
    console.log('Running function GET POST');
       
    // PostModel.findAllPosts( function(err, postList) {
    //     if (err) {
	// 		res.status(500).json({ success: false, message: 'Error put post list' });
    //     }

    //     res.status(200).json(postList);
    // })


    PostModel.findAllPosts( function(err, posts){
        if(err) {console.log(err)}
        res.json( _addCommentEditableField(posts, req.user._id) );                    

    })
}

/************************************************************************/
module.exports.createPost = (req,res) => {
    console.log('Running function CREATE POST');

    PostModel.createPost(req , (err, post) => {
        if(err) {
            res.status(400).json({ success: false, message: 'Error create post' });
        }
        res.status(201).json({ success: true, message: 'Post created' });
    })
}
/************************************************************************/
module.exports.getSinglePost = (req,res) => {
    console.log('Running function GET SINGLE POST');

    PostModel.findSinglePost(req.params.postId, (err, post) => {
            if(err) {
                return res.status(400).json({success: false, message: "Not exist post" })    
            }
            res.status(200).json(post);
    })
}


/************************************************************************/
module.exports.updatePost = function(req,res) {
    console.log('Running function UPDATE POST');
    
    PostModel.findById(req.params.postId, (err, post) => {
        fs.unlink('public/' + post.picture, (error) => {
           if(error) new Error('Error remove picture')
       });
   })

    // const obj = PostModel.updateOne({_id: req.params.postId}, { $set: post}, (error) => {
    //     if(error) {console.log(error)}
    //     res.status(200).json({success: true, message: 'Post updated'})
    // })
 
    
    PostModel.updateSinglePost(req, (err) => {
       
        if(err) {
            res.status(400).json({ success: false, message: 'Error update  post' });
        }
        res.status(200).json({success: true, message: 'Post updated'})
    })

}
/************************************************************************/
module.exports.removePost = function(req,res) {
    console.log('Running function REMOVE POST------');    
    
    const id = req.params.postId;
  
    PostModel.findById(req.params.postId, (err, post) => {
         fs.unlink('public/' + post.picture, (error) => {
            if(error) new Error('Error remove picture')
        });
    })

    PostModel.removeSinglePost(req.params.postId, (err) => {
        if(err) {
            res.status(400).json({ success: false, message: 'Error remove post' });
        }  
        res.status(200).json({success: true, message: 'Post is deleted'})
    })
}
/************************************************************************/
const _addCommentEditableField = function(posts, authUserId) {
    return posts.map(post => {
        post.editable = post.author._id.equals(authUserId);
        return post;
    });
};