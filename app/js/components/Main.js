import React from 'react';

import {Link} from "react-router"; 

import helper from './utils/helpers';

export default class Main extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        user : {
          _id: "59b752b9057e2232f4a43030"
        }
      }
    }

    componentDidMount() {
        helper.getUsers().then(function (response) {
          console.log(response);
        }.bind(this));

        helper.getPosts().then(function (response) {
          console.log(response);
          console.log('yay!');
        }.bind(this));
    }

    componentDidUpdate() {

    }


    render() {
      return (
        <div>
        <nav className="z-depth-4">
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo">learnT</Link>
                <Link to="#" data-activates="mobile-demo" className="button-collapse"><i className="material-icons">menu</i></Link>
                <ul className="right hide-on-med-and-down">
                  <li><Link to="/home">Home</Link></li>
                  <li><Link to={{pathname:"/profile", state:{user:this.state.user, setUser:this.state.setUser}}}>Profile</Link></li>
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

        <div className="jumbotron">
          <div>
          <h1>LearnT</h1>
          <h2>What did you learn today?</h2>
          </div>
        </div>

        <div>
          {/* Displays search component or  saved component */}
          {this.props.children}
        </div>

      </div>
      )
    }
}