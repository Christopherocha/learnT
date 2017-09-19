var mongoose = require("mongoose");

var Schema = mongoose.Schema;


var UserSchema = new Schema ({
    userName: {
        type: String, 
        trim: true,
        required: "Username is Required"
    },
    firstName: {
        type: String,
        required: false
    }, 
    lastName: {
        type: String, 
        required: false
    }, 
    email: {
        type: String,
        required: "Email is Required", 
        unique: true,
        match: [/.+\@.+\..+/, "Please enter a valid e-mail address"]
    }, 
    password: {
        type: String,
        required: "Password is Required",
        validate: [
            function(input) {
                return input.length >= 6
            },
            "Password should be more than 5 characters"
        ]

    },
    userPhoto: {
        type: String,
        required: false
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;