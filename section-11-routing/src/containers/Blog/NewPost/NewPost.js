import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

import "./NewPost.module.css";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Max",
    newPostSubmitted: false,
  };

  componentDidMount() {
    console.log("NewPost componentDidMount props: ", this.props);
  }

  postDataHandler = () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author,
    };
    axios.post("/posts", data).then((response) => {
      console.log("NewPost postDataHandler response", response);
      // If we use 'push' instead of 'replace', we're actually pushing a new page onto the stack and navigating to it
      // The way the back button works will be different. 'replace' is similar to setting the state and conditionally redirecting with component
      // this.props.history.replace("/posts")
      this.setState({newPostSubmitted: true})
    });
  };

  render() {
    let redirect = null
    if(this.state.newPostSubmitted) {
      console.log("NewPost render redirecting")
      redirect = <Redirect to="/posts" />
    }
    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={(event) => this.setState({ author: event.target.value })}
        >
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
