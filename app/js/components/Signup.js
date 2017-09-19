// Import dependencies
import React from "react";
import helper from "./utils/helpers";
import auth from '../../../auth/initAuth'

// Creates and exports the Signup component
export default class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      email: null,
      username: null,
      password: null
    };
  }

  handleSubmit = (e, data) => {
    e.preventDefault();
    auth.signup(this.state.email, this.state.password);

  };
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
    console.log("email", this.state.email);
  };
  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
    console.log("username", this.state.username);
    console.log(typeof{username})
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
    console.log("password", this.state.password);
  };
  handleUsernameChange = e => {
    this.setState({ username: e.target.value });
    console.log("username", this.state.username);
  };
  //Shows the Signup form for Users
  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Signup</h3>
          </div>

          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                {/* <h5>Username</h5>
                <input
                  value={this.state.topic}
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={this.handleUsernameChange}
                  required
                /> */}

                <h5>Email</h5>
                <input
                  value={this.state.topic}
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={this.handleEmailChange}
                  required
                />

                <h5>Password</h5>
                <input
                  value={this.state.password}
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={this.handlePasswordChange}
                  required
                />

                <button className="btn-sm btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
