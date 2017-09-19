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
      <div>
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

          <section className="col m4 s8">
          <div className="row">
              <div className="col m12 center-align">
                  <h5>Most Recent Posts</h5>
              </div>
          </div>

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
                            </article>
                          </div>
                      )
                    })
                  }
                </ul>*
          <div className="row">
              <div className="card">
                  <div className="center-align card-content">
                      <p>TIL</p>
                      <p>I like cats!</p>
                      <p>Posted on</p>
                      <p>August 7 at 10:20pm</p>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="card">
                  <div className="center-align card-content">
                      <p>TIL</p>
                      <p>I am a cat!</p>
                      <p>Posted on</p>
                      <p>August 4 at 9:03pm</p>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="card">
                  <div className="center-align card-content">
                      <p>TIL</p>
                      <p>I have 4 cats.</p>
                      <p>Posted on</p>
                      <p>August 2 at 3:34pm</p>
                  </div>
              </div>
          </div>
          </section>
          </div>
      )
    }

}