import React from 'react';

import {Link} from "react-router"; 

import helper from './utils/helpers';

import auth from '../../../auth/initAuth';

import { Widget, addResponseMessage } from 'react-chat-widget';

export default class Main extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        user : {
          _id: ""
        },
        onlineUsers: null
      }
    }
  
    handleNewUserMessage = (newMessage) => {
      console.log(`New message incoming! ${newMessage}`);
      // Now send the message throught the backend API
      addResponseMessage(response);
    }

    componentDidMount() {
      console.log(auth.loggedIn());
      
        if(!auth.loggedIn()){
          console.log('not logged in')
          if(window.location.hash) {
            auth.parseHash(window.location.hash)
          } 

        } else {
          console.log('made it to the else')
          auth.getUser(localStorage.getItem('access_token')) //this works too
          //auth.getUser(localStorage.getItem('id_token'))
          var profile = JSON.parse(localStorage.getItem('profile'));
          console.log(profile);
          var userId = profile.sub.replace("auth0|", "");
          console.log(userId);
          this.setState({user:{ _id: userId}});
          console.log(this.state.user._id);
          
        } 

        helper.getUsers().then(function (response) {
          console.log(response);
        }.bind(this));

        helper.getPosts().then(function (response) {
          console.log(response);
          console.log('retrieved posts');
        }.bind(this));

        let socket = io.connect();
        socket.on('onlineUsers', (data) => {
          this.setState({onlineUsers: data.onlineUsers});
        });
      }

    // componentDidUpdate() {
    //   // auth.parseHash(window.location.hash)
    // }


    render() {
      return (
        <div>
        <nav className="z-depth-4">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">LearnT</Link>
                <Link to="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
                <ul className="right hide-on-med-and-down">
                  <li><Link to="/home">Home</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Signup</Link></li>
                </ul>
                <ul className="side-nav" id="mobile-demo">
                  <li><Link to="/home">Home</Link></li>
                  <li><Link to="/profile">Profile</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Signup</Link></li>
                </ul>
            </div>
	    </nav>
      <div className="container">
        <div className="jumbotron z-depth-3">
          <h1>LearnT</h1>
          <h2>What did you learn today?</h2>
          <p className="center">There are {this.state.onlineUsers} users online!</p>
        </div>
          {/* Displays search component or  saved component */}
          {this.props.children}
      </div>

      <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          title={"Howdy!"}
          subtitle={"Let's chat!"}
        />
      </div>
      )
    }
}