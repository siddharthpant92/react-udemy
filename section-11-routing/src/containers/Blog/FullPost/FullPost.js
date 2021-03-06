import React, { Component } from "react";
import axios from "../../../axios";

import "./FullPost.module.css";

class FullPost extends Component {
  state = {
    loadedPost: null,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    if (
      this.state.loadedPost &&
      this.state.loadedPost.id != this.props.match.params.id
    ) {
      this.getData();
    }
  }

  getData = () => {
    axios
      .get("/posts/" + this.props.match.params.id)
      .then((response) => {
        console.log("FullPost getData response", response);
        this.setState({ loadedPost: response.data });
      })
      .catch((error) => {
        console.log("FullPost componentDidMount axios Error:", error);
      });
  };

  deletePostHandler = () => {
    axios.delete("/posts/" + this.props.match.params.id).then((response) => {
      console.log("FullPost deletePostHandler response", response);
    });
  };

  render() {
    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
      post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button onClick={this.deletePostHandler} className="Delete">
              Delete
            </button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
