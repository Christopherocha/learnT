// Import dependencies
import React from "react";
import helper from "./utils/helpers";

// Creates and exports the Signup component
export default class Signup extends React.Component {

  // Initial state setup
  constructor(props) {
    super(props);

    this.state = {}
  }

  // During initial load...
  componentDidMount() {

    // Grab the user from the database
    helper.login().then(data => {
      
      // Sets articles from the db to the results array
      this.setState({results: data}); 
    });
  }

  // Render the component: displays the saved articles 
  // or notifies user to start saving articles
  render() {

    return (
      <div>
        <div className="panel panel-default">

          <div className="panel-heading">
            <h3 className="panel-title">Signup</h3>
          </div>

          <div className="panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">

              <h5>Username</h5>
                <input
                   value={this.state.topic}
                  type="text"
                  className="form-control"
                  id="username"
                  onChange={this.handleChange}
                  required
                />

                <h5>Email</h5>
                <input
                   value={this.state.topic}
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={this.handleChange}
                  required
                />

                <h5>Password</h5>
                <input
                   value={this.state.password}
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={this.handleChange}
                  required
                />

                <button className="btn-sm btn-primary" type="submit">Submit</button>
              </div>
            </form>
          </div>
          
        </div>
      </div>
    );
  }
}