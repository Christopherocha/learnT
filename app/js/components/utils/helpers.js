var axios = require("axios");


var helper = {

  login: function(user){
    return axios.get("/login", user);
  },

  getUser: function(email) {
    return axios.get("/user/"+email);
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

  updateUser: function(id){
      return axios.put("/user/"+id, {user: user});
  },

  deletePost: function(id) {
    return axios.delete("/removePost/"+id);
  },

  deleteUser: function(id) {
    return axios.delete("/removeUser/"+id);
  },
};

module.exports = helper;
