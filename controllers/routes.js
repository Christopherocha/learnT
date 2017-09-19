var express = require("express");
var router = express.Router();
var User = require("../models/User.js");
var Post = require("../models/Post.js");

//get list of all the users... might not need this route
router.get("/users", function(req, res) {
  User.find({})
  .populate("posts")
  .populate("favorites")
  .exec(function(err, users){
    if(err) throw err;
    else{
      res.send(users)
    }
  })
});

//login get user info to fill out profile page and stuff
router.get("/user/:email", function(req, res) {
  User.findOne({
    email: req.params.email
}).populate("posts")
  .exec(function(err, user){
    if(err) throw err
    else{
      res.send(user)
    }
  })
});

//login get user info to fill out profile page and stuff
router.get("/login", function(req, res) {
  console.log(req.body)
  User.findOne({
    email: req.body.email,
    password: req.body.password
}).populate("posts")
  .exec(function(err, user){
    if(err) throw err
    else{
      res.send(user)
    }
  })
});

//find all of the posts to populate feed and other things
router.get("/posts", function(req, res) {
  Post.find({})
  .populate('creator')
  .populate('followers')
  .exec( function(err, posts){
    if(err) throw err;
    else{
      res.send(posts)
    }
  })
});

//get a specific post
router.get("/post/:id", function(req, res) {
  Post.findOne(
    {"_id":req.params.id}
  )
  .populate('creator')
  .populate('followers')
  .exec(function(err, post){
    if(err) throw err
    else{
      res.send(post)
    }
  })
});

//create a user
router.post("/signup", function(req, res) {
  console.log(req);
  var newUser = new User(req.body);
  newUser.save(function(err, doc){
    if(err) throw err;
    else{ res.send(doc);}

  })
});

//create a post requires user
router.post("/post/:userid", function(req, res) {
  var newPost = new Post(req.body);
  newPost.save(function(err, doc){
    if(err) throw err;
    else{
      User.findOneAndUpdate({"_id":req.params.userid}, {$push: {'posts': doc._id}}, {new:true}, 
      function(err, doc){   
        if(err) throw err;
        else{res.send(doc)}
      })
    }
  })
});

//update user info and profile
router.put('/user/:id', function(req, res, next) {
  console.log(req.body)
  User.findOneAndUpdate({ "_id": req.params.id }, { $set: { 'user': req.body } }, { new: true },
    function (err, doc) {
      if (err) throw err;
      else { res.send(doc) }
    })
});

//add favorite to user
router.put('/user/:id', function(req, res, next) {
  console.log(req.body)
  User.findOneAndUpdate({ "_id": req.params.id }, { $push: { favorites: req.body.postid } }, { new: true },
    function (err, doc) {
      if (err) throw err;
      else { res.send(doc) }
    })
});

//add a follower to post
router.put('/post/:id', function(req, res, next) {
  console.log(req.body)
  Post.findOneAndUpdate({ _id: req.params.id }, { $push: { followers: req.body.userid } }, { new: true },
    function (err, doc) {
      if (err) throw err;
      else { res.send(doc) }
    })
});



//remove a post
router.delete('/removePost/:id', function(req, res, next) {
  Post.findById(req.params.id, function (err, doc) {
    if(err) { return next(err); }
    doc.remove(function(err, doc) {
      if(err) { return handleError(res, err); }
      res.send(doc);
    });
  });
});

//remove a user
router.delete('/removeUser/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, doc) {
    if(err) { return next(err); }
    doc.remove(function(err, doc) {
      if(err) { return handleError(res, err); }
      res.send(doc);
    });
  });
});

module.exports = router;