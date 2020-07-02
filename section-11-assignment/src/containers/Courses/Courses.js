import React, { Component } from "react";
import "./Courses.css";
import { Link, Route } from "react-router-dom";
import Course from "../Course/Course";

class Courses extends Component {
  state = {
    courses: [
      { id: 1, title: "Angular - The Complete Guide" },
      { id: 2, title: "Vue - The Complete Guide" },
      { id: 3, title: "PWA - The Complete Guide" },
    ],
    selectedCourseId: null,
  };

  selectedCourseHandler = (courseId) => {
    console.log("post selected: ", courseId);
    this.setState({
      selectedCourseId: courseId,
    });
    // this.props.history.push({
    //   pathname: "/courses/" + courseId,
    // });
  };

  render() {
    return (
      <div>
        <h1>Amazing Udemy Courses</h1>
        <section className="Courses">
          {this.state.courses.map((course) => {
            return (
              <Link
                to={{
                  pathname: "/courses/" + course.id,
                  customParams: {
                    courseId: course.id,
                  },
                  search: "course=" + encodeURIComponent(course.title),
                }}
                key={course.id}
              >
                <article
                  className="Course"
                  onClick={this.selectedCourseHandler.bind(this, course.id)}
                >
                  {course.title}
                </article>
              </Link>
            );
          })}
        </section>
        <Route path="/courses/:id" component={Course} />
      </div>
    );
  }
}

export default Courses;
