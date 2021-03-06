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
    upVote: [{ type: Schema.Types.ObjectId, ref: "User" }], 
    downVote: [{ type: Schema.Types.ObjectId, ref: "User" }], 
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;