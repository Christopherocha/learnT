// Import dependencies
import React from "react";
import helper from "./utils/helpers";
import Input from "./children/Input";
import { Link } from "react-router";
import moment from 'moment';
import auth from '../../../auth/initAuth'; 

// Creates and exports the Home component
export default class Home extends React.Component {

  // Initial state setup
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      user:{}
    }

    this.setPost = this.setPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
  }

  componentDidMount() {
    this.getPosts();
    console.log(this.props)

    if (auth.loggedIn()) {

      var profile = JSON.parse(localStorage.getItem('profile'));
      var userId = profile.sub.replace("auth0|", "");

      helper.getUser(userId).then(function (response) {
        console.log(response);
        console.log('got a user');
        this.setState({ user: response.data });
        this.setState({ posts: response.data.posts });

      }.bind(this));

    }

  }
  //pass up info from Input component
  setPost(title, body, link) {
    this.setState({ title: title, body: body, link: link })
  }

  getPosts() {
    helper.getPosts().then(function (response) {
      console.log('get posts');
      console.log(response);
      this.setState({ posts: response.data })

    }.bind(this));
  }

  like(e, post) {
    e.preventDefault();
    console.log(post);
    console.log(post.upVote.includes(this.state.user._id))
    console.log(post.upVote.indexOf(this.state.user._id))
    if (this.state.user._id && post.upVote.includes(this.state.user._id) == false) {
      helper.like(post._id, this.state.user._id).then(function (response) {
        console.log("updated the likes ", response);
        this.getPosts()
      }.bind(this));
    }
  }

  dislike(e, post) {
    e.preventDefault();
    console.log(post);
    if (this.state.user._id && post.downVote.includes(this.state.user._id) == false ) {
      helper.dislike(post._id, this.state.user._id).then(function (response) {
        console.log("updated the dislikes ", response);
        this.getPosts()
      }.bind(this));
    }
  }

  renderPostForm(){ 
    return( 
      <Input setPost={this.setPost} getPosts={this.getPosts} /> 
    ) 
  } 
 
  renderWithoutForm(){ 
    return( 
      <div className="row"> 
      <div className="panel z-depth-2"> 
 
          <div className="panel-heading panel-primary"> 
              <h3 className="panel-title">What did you learn today?</h3> 
          </div> 
 
          <div className="panel-body"> 
              <Link to="/login">Log in to submit your post!</Link> 
          </div> 
      </div> 
  </div> 
    ) 
  } 

  render() {
    return (
      <div>
        <div className="headingTop">
          <h3 className="panel-title">Things We've Learned</h3>
        </div>
          <div className="inputComp">
          { auth.loggedIn() ? this.renderPostForm() : this.renderWithoutForm() } 
          </div>
          <section className="col m4 s8">
            <ul>
              {
                this.state.posts.map((post) => {

                  return (
                    <div className="row">
                      <div className="panel z-depth-2">
                        <li key={post._id}>
                          {/* create a post component <Article article={article} />*/}
                          {/* <Link to={post.link}><p>{post.title}</p></Link> */}
                          {/* link to external site */}
                          <Link to={post.link} target="_blank" className="linkOut">
                            <div className="panel-heading panel-primary">
                              TIL: {post.title}
                            </div>
                          </Link>
                          <div className="panel-body">
                            <div className="row">
                              <div className="col s10">
                                <p> {post.body} </p>
                              </div>
                              <div className="col s1 right-align">
                                <button onClick={(e) => this.like(e, post)} className="btn-sm btn-primary"><i className="material-icons">thumb_up</i>{post.upVote.length}</button>
                              </div>
                              <div className="col s1 left-align">
                                <button onClick={(e) => this.dislike(e, post)} className="btn-sm btn-danger"><i className="material-icons">thumb_down</i>{post.downVote.length}</button>
                              </div>
                            </div>
                            <div className="row right-align">
                              <p> posted by: {post.creator.email} on <i>{moment(post.date).format('lll')}</i></p>
                            </div>
                          </div>
                        </li>
                      </div>
                    </div>
                  )
                })
              }
            </ul>

          </section>
      </div>
    )
  }

}