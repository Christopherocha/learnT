// Import dependencies
import React from "react";
import helper from "./utils/helpers";
import Input from "./children/Input";
import { Link } from "react-router";
import moment from 'moment';

// Creates and exports the Home component
export default class Home extends React.Component {

  // Initial state setup
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }

    this.setPost = this.setPost.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.like = this.like.bind(this);
    this.dislike = this.dislike.bind(this);
  }

  componentDidMount() {
    this.getPosts();
    console.log(this.props)

  }
  //pass up info from Input component
  setPost(title, body, link) {
    this.setState({ title: title, body: body, link: link })
  }

  componentDidUpdate() {
    //this.getPosts();
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
    var upVote = parseInt(post.upVote) + 1
    console.log(upVote);
    helper.like(post._id, upVote).then(function (response) {
      console.log("updated the likes ", response);
      this.getPosts()
    }.bind(this));
  }

  dislike(e, post) {
    e.preventDefault();
    console.log(post);
    var downVote = parseInt(post.downVote) + 1
    console.log(downVote);
    helper.dislike(post._id, downVote).then(function (response) {
      console.log("updated the dislikes ", response);
      this.getPosts()
    }.bind(this));
  }

  render() {
    return (
      <div className="panel z-depth-3 content">

        <div className="panel-heading center">
          <h3 className="panel-title">Things We've Learned</h3>
        </div>
        <div className="panel-body">
          <div className="inputComp">
            <Input setPost={this.setPost} getPosts={this.getPosts} />
          </div>
          <section className="col m4 s8">
            <ul>
              {
                this.state.posts.map((post, idx) => {

                  return (
                    <div className="row">
                      <div className="panel z-depth-2">
                        <li key={idx}>
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
                                <button onClick={(e) => this.like(e, post)} className="btn-sm btn-primary"><i className="material-icons">thumb_up</i>{post.upVote}</button>
                              </div>
                              <div className="col s1 left-align">
                                <button onClick={(e) => this.dislike(e, post)} className="btn-sm btn-danger"><i className="material-icons">thumb_down</i>{post.downVote}</button>
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
      </div>
    )
  }

}