var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var CommentSchema = new Schema ({
    body: {
        type: String,
        required: true
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
    }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Post;