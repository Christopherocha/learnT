// Import dependencies
import React from "react";
import helper from "./utils/helpers";

// Creates and exports the Home component
export default class Home extends React.Component {

  // Initial state setup
  constructor(props) {
    super(props);
    this.state = {
        posts: []
    }
  }

    componentDidMount() {
        helper.getPosts().then(function (response) {
          console.log('get posts');
          console.log(response);
          this.setState({ posts: response.data})

        }.bind(this));

        // var post = {
        //     title: "this is a title",
        //     body: "I like your body",
        //     creator:"59b752b9057e2232f4a43030",
        //     link: "link",
        //     followers: ["59b7542977c0e82f1cf6be8b", "59b7542977c0e82f1cf6be8d" ]
        // }
        // helper.savePost(post.creator, post).then(function(response){
        //   helper.getPosts().then(function (response) {
        //     console.log(response);
        //   }.bind(this));
        // }.bind(this))
    }

  render(){
    return(
      <div>
        <section className="col m4 s8">
          <div className="row">
              <div className="col m12 center-align">
                  <h5>Things We've learned</h5>
              </div>
          </div>
          <div className="row">
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
                </ul>
         
          </section>
      </div>
    )
  }

}