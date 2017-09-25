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
            posts: []
        }
    }

  componentDidMount() {    
      console.log("profile");
      console.log(this.props);
      console.log(this.props.location.state.user)

      console.log(this.props)
      helper.getUser(this.props.location.state.user._id).then(function (response) {
        console.log(response);
        console.log('got a user');
        this.setState({user : response.data});
        this.setState({posts: response.data.posts})
        console.log(this.state.user);
      }.bind(this));
    }

    updateUser(user){
        helper.updateUser(this.user._id, user).then(function(response){
            console.log(response);
            console.log('got a user');
            this.setState({user : response.data});
            this.setState({posts: response.data.posts})
            console.log(this.state.user);
        }.bind(this))
    }

    uploadImage(e){

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
                        <div className="row">
                            <img className="responsive-img" src="https://img.buzzfeed.com/buzzfeed-static/static/2014-01/campaign_images/webdr06/7/14/50-reasons-why-nicolas-cage-is-the-greatest-human-1-5571-1389124720-1_big.jpg" />
                        </div>
                        <div className="row">
                            <Dropzone/>
     
     
                 
                            <a className="waves-effect waves-light btn"><i className="material-icons left">insert_photo</i>Change Photo</a>
                        </div>

                    </div>
                    <div className="col m6 s12">
                        <div className="card-panel">
                            {this.props.children}
                        </div>
                    </div>
                </div>
                <div className="row">
                    {/* <div className="panel panel-default">

                        <div className="panel-heading">
                            <h3 className="panel-title">What did you learn today?</h3>
                        </div>

                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">

                                    <h5>Title</h5>
                                    <input
                                        value={this.state.title}
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        onChange={this.handleTitleChange}
                                        required
                                    />

                                    <h5>Body</h5>
                                    <input
                                        value={this.state.body}
                                        type="text"
                                        className="form-control"
                                        id="body"
                                        onChange={this.handleBodyChange}
                                        required
                                    />

                                    <button className="btn-sm btn-success" type="submit">Post</button>
                                </div>
                            </form>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col m12">
                            <h5>Most Recent Posts</h5>
                        </div>
                    </div>
                    <div className="col m12">
                        <ul>
                            {
                                this.state.posts.map((post, idx) => {

                                    return (
                                        <div className="row">
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
            </div >
        )
    }

}


