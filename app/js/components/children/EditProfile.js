import React from 'react';
import helper from '../utils/helpers';
import {Link} from "react-router"; 
import Dropzone from "../DropzoneComponent";

export default class EditProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            about: '',
            location: '',
            user:{}
        };
        this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.props)

        var profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile);
        var userId = profile.sub.replace("auth0|", "");
        
        helper.getUser(userId).then(function (response, err) {
            if(err){throw err}
            else{
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

    handleChange(e) {
        var newState = {};

        newState[e.target.id] = e.target.value;
        this.setState(newState);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log("click");
        var profile = JSON.parse(localStorage.getItem('profile'));
        console.log(profile);
        var userId = profile.sub.replace("auth0|", "");
        console.log(userId);
        var user = {
            userName : this.state.userName,
            email: this.state.email,
            about: this.state.about,
            location: this.state.location
        }
        helper.updateUser(userId, user).then(function(response){
            console.log("updated user");
            console.log(response);
        }.bind(this));
    }

    render() {
        return (
            <div>
            <div className="col m6 s12 center-align">
                <div className="row profilePic">
                    <Dropzone user={this.state.user} id="widget-upload" />
                </div>
                </div>
                <div className="col m6 s12">
                <div className="card-panel">
                <span className="black-text">
                    <div className="row valign-wrapper">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">

                                <h5>Name</h5>
                                <input
                                    value={this.state.userName}
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    onChange={this.handleChange}
                                    required
                                />

                                <h5>Email</h5>
                                <input
                                    value={this.state.email}
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    onChange={this.handleChange}
                                    required
                                />

                                <h5>About</h5>
                                <input
                                    value={this.state.about}
                                    type="text"
                                    className="form-control"
                                    id="about"
                                    onChange={this.handleChange}
                                    required
                                />

                                <h5>Location</h5>
                                <input
                                    value={this.state.location}
                                    type="text"
                                    className="form-control"
                                    id="location"
                                    onChange={this.handleChange}
                                    required
                                />

                                <button className="btn-sm btn-success" type="submit">Update</button>
                                <Link className="modal-trigger" to="/view"><button className="btn-sm btn-primary">
                                    Done</button></Link>
                            </div>
                        </form>
                    </div>

                </span>
                </div>
                </div>
            </div>
        )
    }
}