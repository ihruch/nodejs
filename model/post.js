const mongoose = require('mongoose');
const path = require('path');


const postShema = mongoose.Schema({

    author: {
        id: Number,
        name: String,
        avatar: String,
    },
    publicationDate: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        require: true
    },
    picture: { type: String }
})

const Post = mongoose.model('Post', postShema);

module.exports = Post;
// {
//     author: {
//         id: 1,
//         name: 'Jacob Thornton',
//         avatar: '/assets/img/avatar-mdo.png',
//     },
//     publicationDate: 1541589597000,
//     text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis.',
//     picture: '/assets/img/instagram_1.jpg',
//     id: 1,
// },