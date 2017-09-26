var express = require("express");
var router = express.Router();
var User = require("../models/User.js");
var Post = require("../models/Post.js");
// var auth = require("../auth/initAuth")

//this is for the image upload might need to be in server file?
var multer   =  require( 'multer' );
//var upload   =  multer( { dest: 'uploads/' } );
var storage = multer.diskStorage({
  destination: './public/assets/images/uploads/',
  filename: function (req, file, cb) {
    // Mimetype stores the file type, set extensions according to filetype
    switch (file.mimetype) {
      case 'image/jpeg':
        ext = '.jpeg';
        break;
      case 'image/png':
        ext = '.png';
        break;
      case 'image/gif':
        ext = '.gif';
        break;
    }

    cb(null, file.originalname.slice(0, 4) + Date.now() + ext);
  }
});
var upload = multer({storage: storage});

//catch-all route
router.get("/profile", function (req, res){
  var path = __dirname.replace("controllers", "public/index.html")
  res.sendFile(path)
})

router.get("/home", function (req, res){
  var path = __dirname.replace("controllers", "public/index.html")
  res.sendFile(path)
})

router.get("/signup", function (req, res){
  var path = __dirname.replace("controllers", "public/index.html")
  res.sendFile(path)
})

router.get("/login", function (req, res){
  var path = __dirname.replace("controllers", "public/index.html")
  res.sendFile(path)
})

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
router.get("/user/:id", function(req, res) {
  User.findOne({
    _id: req.params.id
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
  .sort({ upVote: -1 })
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
  User.findOneAndUpdate({ "_id": req.params.id }, { $set: { 'userName': req.body.user.userName, email:req.body.user.email} }, { new: true },
    function (err, doc) {
      if (err) throw err;
      else { res.send(doc) }
    })
});

//upload image
//router.post 
router.put('/uploadHandler/:id', upload.single('file'), function (req, res, next) {
  if (req.file && req.file.originalname) {
    console.log(`Received file ${req.file.originalname}`);
    console.log(req.file);
    User.findOneAndUpdate({ "_id": req.params.id }, { $set: { 'userPhoto': req.file.path} }, { new: true },
    function (err, doc) {
      if (err) throw err;
      else { res.send(doc) }
    })
  }
  else{
    console.log(req.body);
    res.send("not sure"); 
  }

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

router.put('/like/:id', function(req, res, next) {
  console.log(req.body)
  Post.findOneAndUpdate({ _id: req.params.id }, { $set: { upVote: req.body.upVote } }, { new: true },
    function (err, doc) {
      if (err) throw err;
      else { res.send(doc) }
    })
});

router.put('/dislike/:id', function(req, res, next) {
  console.log(req.body)
  Post.findOneAndUpdate({ _id: req.params.id }, { $set: { downVote: req.body.downVote } }, { new: true },
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

router.get('/callback', function(req, res, next) {
  auth.parseHash();
})

module.exports = router;