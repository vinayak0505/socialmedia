const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId
    },
    // this define the object id of like object
    likeable: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel',
    },
    onModel: {
        type: String,
        required: true,
        enum: ['Post', 'Comment']
    }
}, {
    timeStamps: true
})

const Like = mongoose.model('like', likeSchema);
module.exports = Like;