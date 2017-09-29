import React, { Component } from 'react';
import auth from '../../../auth/initAuth';
import helper from "./utils/helpers";
import { Link } from "react-router"; 

class Login extends Component {
    constructor(props){
        super(props)
this.state = {
            email: null,
            password: null
        }
    }

componentDidMount(){
     console.log(this.props);
}
handleSubmit = (e, data) => {
        e.preventDefault()
        console.log(this.state.email + "\n" + this.state.password)
        auth.login(this.state.email, this.state.password)
}
handleEmailChange = (e) => {
        this.setState({
            email: e.target.value,
        })
    }
handlePasswordChange = (e) => {
        this.setState( {password: e.target.value} )
    }
logout = () => {
        auth.logout()
    }
renderLoginForm = () => {
        return(
          <div className="container">
            <div className="panel panel-default">

              <div className="panel-heading">
                <h3 className="panel-title">Login</h3>
              </div>

              <div className="panel-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">

                    <h5>Email</h5>
                    <input
                      value={this.state.email}
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

                    <button className="btn-sm btn-primary" type="submit">Submit</button>
                  </div>
                </form>
              </div>
              
            </div>
          </div>
        )
    }
renderLogout = () => {
        return(
            <div className="container center">
                <Link to="/login"><button className="loggedInbtn btn-sm btn-warning center" onClick={ this.logout }>You are logged in! Click to logout!</button></Link> 
            </div>
        )
    }
render(){
        return(
            <div>
                { auth.loggedIn() ? this.renderLogout() : this.renderLoginForm() }
            </div>
        )
    }
}
export default Login
