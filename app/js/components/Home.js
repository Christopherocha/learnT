// Import dependencies
import React from "react";
import helper from "./utils/helpers";

// Creates and exports the Home component
export default class Home extends React.Component {

  // Initial state setup
  constructor(props) {
    super(props);
  }

    componentDidMount() {
        helper.getPosts().then(function (response) {
          console.log('get posts');
          console.log(response);
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
          <div className="row">
              <div className="card">
                  <div className="card-image">
                      <img className="userPostPic" src="https://images-na.ssl-images-amazon.com/images/M/MV5BMjA3NTM2OTU5M15BMl5BanBnXkFtZTcwOTExNjM0Mg@@._V1_UX214_CR0,0,214,317_AL_.jpg" />
                      <span className="black-text card-title">SporkOnTheBeach</span>
                  </div>
                  <div className="center-align card-content">
                      <p>I learned that cats are the best!</p>
                      <p>Posted on</p>
                      <p>August 4 at 9:03pm</p>
                  </div>
              </div>
          </div>
          <div className="row">
              <div className="card">
                  <div className="card-image">
                      <img className="userPostPic" src="https://vignette3.wikia.nocookie.net/theoffice/images/8/89/110714office-jenna1.jpg/revision/latest?cb=20130513021443" />
                      <span className="black-text card-title">SrirchaPam</span>
                  </div>
                  <div className="center-align card-content">
                      <p>I learned that dogs are pretty heckin great.</p>
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