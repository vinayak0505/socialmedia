const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function (req, res) {
    try {

        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');

    } catch (error) {
        console.log('error in creating a post', error);
        return;
    }
}


module.exports.destroy = async function (req, res) {
    try {

        var post = await Post.findById(req.params.id)

        // .id means converting the object id into string
        if (post.user == req.user.id) {
            post.remove();
            Comment.deleteMany({ post: req.params.id }, function (err) {
                return res.redirect('back');
            });
        } else {
            return res.redirect('back');
        }
    } catch (error) {
        console.log('error in destroy a post', error);
        return res.redirect('back');
    }

}