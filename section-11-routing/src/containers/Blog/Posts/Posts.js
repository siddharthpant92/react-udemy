import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import { Link } from "react-router-dom";
import "./Posts.module.css";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentDidMount() {
    console.log("Posts componentDidMount props: ", this.props);
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max",
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log( response );
      })
      .catch((error) => {
        // console.log(error);
        this.setState({ error: true });
      });
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Link
            to={{
              pathname: "/" + post.id,
              customProps: "temp",
            }}
            key={post.id}
            params={{ temp: "temp" }}
          >
            <Post
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          </Link>
        );
      });
    }

    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
