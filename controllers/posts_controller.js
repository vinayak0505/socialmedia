const Post = require('../models/post');
const User = require('../models/user');
const Comment = require('../models/comment');
const { response } = require('express');

module.exports.create = async function (req, res) {
    try {

        var post = await Post.create({
            content: req.body.content,
            user: req.user._id
        })
        post.user = req.user;
        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post
                },
                message:'Post Created!'
            });
        }
        req.flash('success','Post Published');
        return res.redirect('back');

    } catch (error) {
        req.flash('error',err);
        return res.redirect('back');
    }
}


module.exports.destroy = async function (req, res) {
    try {

        var post = await Post.findById(req.params.id)

        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();
            var deleted = await Comment.deleteMany({ post: req.params.id });
            console.log("deleted");
            console.log(deleted);
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id:req.params.id
                    },
                    message:"post deleted"
                })
            }
            req.flash('success','Post Deleted');
            return res.redirect('back');
        } else {
            req.flash('error','You cannot delete this post');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash('error',error);
        return res.redirect('back');
    }

}