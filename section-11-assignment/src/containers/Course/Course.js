import React, { Component } from "react";

class Course extends Component {
  render() {
    console.log("Course render() props:", this.props);
		let courseTitle = decodeURIComponent(this.props.location.search).split("=")[1];

    return (
      <div>
        <h1>{courseTitle}</h1>
        <p>You selected the Course with ID: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default Course;
