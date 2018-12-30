const PostModel = require('../model/post')
const mime = require('mime');
const fs = require('fs');

module.exports.getPosts = (req, res) => {
        PostModel.find(
            {}, 
            // {sort: {publicationDate: -1}},
            (error, posts) => {
                if(error) console.log(error);
                // console.log(posts);
                res.status(200).json(posts);
            }
    ) 
}

const savePost = (req) => {
    let urlImage  = null;

    let imageFile = req.files.picture;
    let typeFile = mime.getExtension( req.files.picture.mimetype);
    urlImage = `images/image-${Date.now()}.${typeFile}`;
    
    imageFile.mv('public/' + urlImage, (error) => {
        if(error) {
            console.log(error);
        } 
    });
    return urlImage;
}

module.exports.createPost = (req, res) => {
    console.log('Running function create new post');
    let pathImage = null;
    
    if (req.files) {
        pathImage = savePost(req);
    }/* end if block */

    const body = {
        author: {
            id: 1,
            name: 'Jacob Thornton',
            avatar: '/assets/img/avatar-mdo.png',
        },
        publicationDate: Date.now(),
        text: req.body.text,
        picture: pathImage || req.body.picture,
    }

    PostModel.create(body, (error, post) => {
        if(error) return console.log(error);
        console.log('New post was create');
        res.status(201).json(post);
    } )

}
module.exports.getSinglePost = (req, res) => {
    console.log('Running function getSinglePost new post');
    const postSingleId = req.params.postId;

    PostModel.findById(postSingleId, (error, post) => {
        if(error) {console.log(error)}
        // console.log(post);
        res.json(post)
    })
}

module.exports.editPost = (req,res) => {
    console.log('Running function PATCH post');
    
    const postSingleId = req.body._idPost;  // id передаеться с фронта как параметр запроса
    let pathPic = req.body._pathPic;   // путь картинки исходной до изменения передаеться с фронта как параметр запроса
    let pic = req.body.picture;
    let text = req.body.text;
    
    if (req.files) { 
        pic = savePost(req)
        fs.unlink('public/' + pathPic, (error) => {
            if(error) new Error('Error remove picture')
        });
    
    }
    
    const body = {
        text: text,
        picture: pic,
    }


    PostModel.findByIdAndUpdate(postSingleId, body, (error, updatePost) => {
        if(error) {console.log(error)}
        res.status(200).json(updatePost)
    })

}

module.exports.removePost = (req, res) => {
    console.log('Running function DELETE post');
    const postId = req.params.postId;
    
    PostModel.findByIdAndDelete(postId, (error, post) => {
        if(error) {console.log(error)};
        // console.log('remove post', post);

        fs.unlink('public/' + post.picture, (error) => {
            if(error) new Error('Error remove picture')
        });
        res.status(204).json({ success: true });
    })
}
