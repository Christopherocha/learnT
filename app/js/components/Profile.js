// Import dependencies
import React from "react";
import helper from "./utils/helpers";
import Dropzone from "./DropzoneComponent";

// Creates and exports the Profile component
export default class Profile extends React.Component {

    // Initial state setup
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: [], 
            photoUrl: "./assets/images/silhouette.png"
        }
        
    }

  componentDidMount() {    

      var profile = JSON.parse(localStorage.getItem('profile'));
      console.log(profile);
      var userId = profile.sub.replace("auth0|", "");

      helper.getUser(userId).then(function (response) {
        console.log(response);
        console.log('got a user');
        this.setState({user : response.data});
        this.setState({posts: response.data.posts});
        var photoUrl = response.data.userPhoto.replace("public", ".");
        console.log(photoUrl);
        this.setState({photoUrl: photoUrl});
        console.log(this.state.user);
      }.bind(this));
    }

    updateUser(user){
        helper.updateUser(this.state.user._id, user).then(function(response){
            console.log(response);
            console.log('updated a user');
            this.setState({user : response.data});
            this.setState({posts: response.data.posts})
            console.log(this.state.user);
        }.bind(this))
    }

    render() {
        const style = {visibility: 'hidden',
         position: 'absolute',
         top: '0px', left: '0px', height: '0px', width: '0px'
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col m6 s12 center-align">
                        <div className="row profilePic">
                            <img className="responsive-img" src={this.state.photoUrl} />
                            <Dropzone user={this.state.user} id="widget-upload"/>                 
                        </div>

                    </div>
                    <div className="col m6 s12">
                        <div className="card-panel">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <div className="row">
                        <div className="row">
                            <div className="col m12">
                                <h5>Most Recent Posts</h5>
                            </div>
                        </div>

                        <ul>
                            {
                                this.state.posts.map((post, idx) => {

                                    return (
                                        <div>
                                            <article className="card">
                                                <li key={idx}>
                                                    {/* create a post component <Article article={article} />*/}
                                                    <p> {post.title} </p>
                                                    <p> {post.body} </p>
                                                </li>
                                                <p><i className="material-icons">thumb_up</i>{post.upVote}</p>
                                                <p><i className="material-icons">thumb_down</i>{post.downVote}</p>
                                            </article>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div >
        )
    }

}


