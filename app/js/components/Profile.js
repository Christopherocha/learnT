// Import dependencies
import React from "react";
import helper from "./utils/helpers";

// Creates and exports the Profile component
export default class Profile extends React.Component {

  // Initial state setup
  constructor(props) {
    super(props);
    this.state = {
        user : {},
        posts: []
    }
  }

  componentDidMount() {
      var user = {
          email: "sarah@aol.com",
          password: "password" 
        }
    
      console.log('component did mount');
      helper.getUser(user.email).then(function (response) {
        console.log(response);
        console.log('yay!');
        this.setState({user : response.data});
        this.setState({posts: response.data.posts})
        console.log(this.state.user);
      }.bind(this));
    }


render() {
      return (
      <div className="container">
      <div className="row">
        <div className="col m6 s12 center-align">
            <div className="row">
                <img className="responsive-img" src="https://img.buzzfeed.com/buzzfeed-static/static/2014-01/campaign_images/webdr06/7/14/50-reasons-why-nicolas-cage-is-the-greatest-human-1-5571-1389124720-1_big.jpg" />
            </div>
            <div className="row">
                <a className="waves-effect waves-light btn"><i className="material-icons left">insert_photo</i>Change Photo</a>
            </div>
        </div>
        <div className="col m6 s12">
            <div className="card-panel">
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
                                <a className="waves-effect waves-light btn modal-trigger" href="#edit-user">
                                <i className="material-icons">edit</i>Edit Info</a>
                            </div>
                        </div>
                    </span>
            </div>
            </div>
          </div>
          <div className="row">
            <div className="panel panel-default">

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
          </div>
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
                              <button className="btn-sm btn-primary">Upvote</button>
                              <button className="btn-sm btn-danger">Downvote</button>
                            </article>
                          </div>
                      )
                    })
                  }
                </ul>
          </div>
          </div>
          </div>
      )
    }

}