var axios = require("axios");


var helper = {

  login: function(user){
    return axios.get("/login", user);
  },

  home: function(){
    return axios.get("/home", user);
  },

  profile: function(){
    return axios.get("/profile", user);
  },

  getUser: function(id) {
    return axios.get("/user/"+id);
  },

  getUsers: function() {
    return axios.get("/users");
  },

  getPosts: function() {
    return axios.get("/posts");
  },

  getUserPost: function(userid) {
    return axios.get("/user/"+userid);
  },

  savePost: function(userid, post) {
    return axios.post("/post/"+userid, post);
  },

  signup: function(user) {
    return axios.post("/signup", user);
    //{ name: name, password: password, email:email  }
  },

  updateUser: function(id, user){
      return axios.put("/user/"+id, {user: user});
  },

  undoPhotoUpload: function(id, oldPhoto){
    return axios.put("/undoPhotoUpload/"+id, {userPhoto: oldPhoto});    
  },

  like: function(id, userid){
    return axios.put("/like/"+id, {userid: userid});
  },

  dislike: function(id, userid){
    return axios.put("/dislike/"+id, {userid: userid});
  },


  deletePost: function(id) {
    return axios.delete("/removePost/"+id);
  },

  deleteUser: function(id) {
    return axios.delete("/removeUser/"+id);
  },
};

module.exports = helper;
