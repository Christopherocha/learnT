// Import dependencies
import React from "react";
import helper from "./utils/helpers";
import Input from "./children/Input"

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
    setPost(title, body, link){
      this.setState({title: title, body: body, link: link})
    }

  componentDidUpdate(){
    //this.getPosts();
  }

  getPosts(){
    helper.getPosts().then(function (response) {
      console.log('get posts');
      console.log(response);
      this.setState({ posts: response.data})

    }.bind(this));
  }

  like(e, post){
      e.preventDefault();
      console.log(post);
      var upVote = parseInt(post.upVote)+1
      console.log(upVote);
      helper.like(post._id, upVote).then(function(response){
        console.log("updated the likes ", response);
        this.getPosts()
      }.bind(this));
  }

  dislike(e, post){
    e.preventDefault();    
    console.log(post);
    var downVote = parseInt(post.downVote)+1
    console.log(downVote);
    helper.dislike(post._id, downVote).then(function(response){
      console.log("updated the dislikes ", response);
      this.getPosts()
    }.bind(this));
  }

  render(){
    return(
      <div className="container">
        <section className="col m4 s8">
          <div className="row">
              <div className="col m12 center-align">
                  <h5>Things We've learned</h5>
              </div>
          </div>
          {/* <div className="row">
              <div className="card">
                  <div className="card-image">
                      <img className="userPostPic" src="https://scontent-dft4-2.xx.fbcdn.net/v/t31.0-8/280055_2289006864966_4414621_o.jpg?oh=f3165f65c0a69eaf222912bbbd8e1a74&oe=59F4992E" />
                      <span className="black-text card-title">UnCoolGuy1985</span>
                  </div>
                  <div className="center-align card-content">
                      <p>I learned that fish can fly sometimes.</p>
                      <p>Posted on</p>
                      <p>August 7 at 10:20pm</p>
                  </div>
              </div>
          </div> */}
         <div className="inputComp">
           <Input setPost={this.setPost} getPosts={this.getPosts}/>
         </div>
          <section className="col m4 s8">
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
                              <button onClick={(e) => this.like(e, post)} className="btn-sm btn-primary"><i className="material-icons">thumb_up</i>{post.upVote}</button>
                              <button onClick={(e) => this.dislike(e, post)} className="btn-sm btn-danger"><i className="material-icons">thumb_down</i>{post.downVote}</button>
                            </article>
                          </div>
                      )
                    })
                  }
                </ul>
         
          </section>
          </section>
      </div>
    )
  }

}