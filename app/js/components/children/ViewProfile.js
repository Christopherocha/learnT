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
                        <div className="col m4 s12"><h5>Name</h5></div>
                        <div className="col m8 s12" id="username">{this.state.user.userName}</div>
                    </div>
                    <div className="row valign-wrapper">
                        <div className="col m4 s12" id="email"><h5>Email</h5></div>

                        <div className="col m8 s12">{this.state.user.email}</div>
                    </div>
                    <div className="row valign-wrapper">
                        <div className="col m4 s12"><h5><i className="material-icons left">location_on</i></h5></div>
                        <div className="col m8 s12">{this.state.user.location}</div>
                    </div>
                    <div className="row valign-wrapper">
                        <div className="col m4 s12"><h5>About Me</h5></div>
                        <div className="col m8 s12">{this.state.user.about}</div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                        <Link className="modal-trigger" to="/edit"><button className="btn-sm btn-primary">
                                <i className="material-icons center">edit</i>Edit Info</button></Link>
                        </div>
                    </div>
                </span>
            </div>
        )
    }
}

