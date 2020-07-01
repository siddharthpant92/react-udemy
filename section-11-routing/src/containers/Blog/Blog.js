import React, { Component } from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Posts from "./Posts/Posts";
import NewPost from "./NewPost/NewPost";
import "./Blog.module.css";

class Blog extends Component {
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/posts" exact activeClassName="myActive">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post" exact activeClassName="myActive">
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/* Switch is commented out since Posts.js has nested route, we don't need to handle for dynamic routing prefix matching issue */}
        {/* <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/new-post" exact component={NewPost} />
          <Route path="/:id" exact component={FullPost} /> */}
        {/* <Route path="/:id" exact component={FullPost} /> */}
        {/* even /new-post is treated as a matching route since :id could be anything. 
          So we could do something like /post/:id and change the path in Posts.js as well to prevent /new-post from rendering.
          The reason we register /:id after /new-post is so that inside the switch, new-post is not considered as a dynamic parameter
        */}
        {/* </Switch> */}

        <Switch>
          <Route path="/posts" component={Posts} />
          <Route path="/new-post" component={NewPost} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
