import React from 'react';
import helper from '../utils/helpers';
import {Link} from "react-router"; 

export default class Input extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            about: '',
            location: ''
        };
        this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
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
                <span className="black-text">
                    <div className="row valign-wrapper">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">

                                <h5>User Name</h5>
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
        )
    }
}