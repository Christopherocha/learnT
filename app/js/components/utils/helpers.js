var axios = require("axios");


var helper = {

  login: function(){
    return axios.get("/login");
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

  savePost: function(userid) {
    return axios.post("/post/"+userid, { title: title, body: body  });
  },

  signup: function() {
    return axios.post("/signup", { name: name, password: password, email:email  });
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
