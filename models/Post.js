var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var PostSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    link: {
        type: String, 
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    upVote: {
        type: Number,
        required: true,
        default: 0
    }, 
    downVote: {
        type: Number,
        required: true,
        default: 0
    }, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;