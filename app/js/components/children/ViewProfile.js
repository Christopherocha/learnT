import React from 'react';
import helper from '../utils/helpers';
import {Link} from "react-router"; 

export default class viewProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            user:{}
        }
 
    }

    componentDidMount() {    
        console.log(this.props);
        var profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile);
        var userId = profile.sub.replace("auth0|", "");
        helper.getUser(userId).then(function (response) {
          console.log(response);
          console.log('got a user');
          this.setState({user : response.data});
          console.log(this.state.user);
        }.bind(this));
      }


    render() {
        return (
            <div>
                <span className="black-text">
                    <div className="row valign-wrapper">
                        <div className="col m4 s12"><h5>Username</h5></div>
                        <div className="col m8 s12" id="username">{this.state.user.userName}</div>
                    </div>
                    <div className="row valign-wrapper">
                        <div className="col m4 s12" id="email"><h5>Email</h5></div>

                        <div className="col m8 s12">{this.state.user.email}</div>
                    </div>
                    <div className="row valign-wrapper">
                        <div className="col m4 s12"><h5><i className="material-icons left">location_on</i></h5></div>
                        <div className="col m8 s12">Austin, TX</div>
                    </div>
                    <div className="row valign-wrapper">
                        <div className="col m4 s12"><h5>About Me</h5></div>
                        <div className="col m8 s12">I am still Nicolas Cage all filled with rage.</div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <Link className="waves-effect waves-light btn modal-trigger" to="/edit">
                                <i className="material-icons">edit</i>Edit Info</Link>
                        </div>
                    </div>
                </span>
            </div>
        )
    }
}

