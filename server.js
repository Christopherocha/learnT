//dependencies
var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// //this is for the image upload might need to be in router file?
// var multer   =  require( 'multer' );
// var upload   =  multer( { dest: 'uploads/' } );
// var sizeOf   =  require( 'image-size' );


mongoose.Promise = Promise;


// initialize express
var app = express();

app.set('port', process.env.PORT || 8080);

// use morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(methodOverride("_method"));

app.use(express.static("public"));

var routes = require("./controllers/routes.js")
app.use("/", routes);


var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };       
 
var mongodbUri = 'mongodb://lernt:burnunit@ds133814.mlab.com:33814/lernt';
 
mongoose.connect(mongodbUri, options);
var db = mongoose.connection;             
 
db.on('error', console.error.bind(console, 'connection error:'));  
 
db.once('open', function() {
  // Wait for the database connection to establish, then start the app.
  console.log('Connected to '+ mongodbUri);                         
});

//socket.io
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

io.sockets.on('connection', function(socket){
  onlineUsers++;

  io.sockets.emit('onlineUsers', {onlineUsers: onlineUsers});

  socket.on('disconnect', function(){
    onlineUsers--;
    io.sockets.emit('onlineUsers', {onlineUsers: onlineUsers});
  })
})


server.listen(app.get('port'), function() {
  console.log("App running!");
});
