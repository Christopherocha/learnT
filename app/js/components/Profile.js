// Import dependencies
import React from "react";
import helper from "./utils/helpers";

// Creates and exports the Profile component
export default class Profile extends React.Component {

  // Initial state setup
  constructor(props) {
    super(props);
  }

  componentDidMount() {
      console.log('component did mount!');
      helper.getPosts().then(function (response) {
        console.log(response);
        console.log('yay!');

      }.bind(this));
    }


render() {
      return (
        <div>
        profile

      </div>
      )
    }

}