var axios = require("axios");


var helper = {

  login: function(user){
    return axios.get("/login", user);
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

  like: function(id, upVote){
    return axios.put("/like/"+id, {upVote: upVote});
  },

  dislike: function(id, downVote){
    return axios.put("/dislike/"+id, {downVote: downVote});
  },


  deletePost: function(id) {
    return axios.delete("/removePost/"+id);
  },

  deleteUser: function(id) {
    return axios.delete("/removeUser/"+id);
  },
};

module.exports = helper;
