import React from 'react';
import helper from '../utils/helpers';
import {Link} from "react-router"; 
import auth from '../../../../auth/initAuth';


export default class viewProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            user:{}
        }
 
    }

    componentDidMount() {
        if (auth.loggedIn()) {
            var profile = JSON.parse(localStorage.getItem('profile'));
            console.log(profile);
            var userId = profile.sub.replace("auth0|", "");

            helper.getUser(userId).then(function (response, err) {
                if (err) { throw err }
                else {
                    console.log(response);
                    this.setState({ user: response.data })
                    console.log("the updated user is ", this.state.user);
                    var photoUrl = response.data.userPhoto
                    if (photoUrl != undefined || photoUrl != null) {
                        photoUrl = photoUrl.replace("public", ".");
                        this.setState({ photoUrl: photoUrl });
                    }
                    console.log(photoUrl);
                }
            }.bind(this));
        }
      }

    renderProfile(){
        return (
            <div>
                <div className="col m6 s12 center-align">
                    <div className="row profilePic">
                        <img className="responsive-img" src={this.state.photoUrl} />
                    </div>

                </div>
                <div className="col m6 s12">
                    <div className="card-panel">
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
                </div>
            </div>
        )
    }

    renderTemplate(){
        return(
            <div>
                 <div className="col m6 s12 center-align">
                    <div className="row profilePic">
                        <img className="responsive-img" src="./assets/images/silhouette.png" />
                    </div>

                </div>
                <div className="col m6 s12">
                    <div className="card-panel">
                        <span className="black-text">
                            <Link to="/login">Log in to view your account</Link>
                        </span>
                    </div>
                </div>    
            </div>
        )
    }


    render() {
        return (
            <div>
                { auth.loggedIn() ? this.renderProfile() : this.renderTemplate() }
            </div>
        )
    }
}

