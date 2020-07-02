import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import "./Courses.css";
import { Link, Route, Redirect } from "react-router-dom";
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
    let sectionContent = null;
    if (this.state.selectedCourseId) {
      sectionContent = <Route path="/courses/:id" component={Course} />;
    } else {
      sectionContent = (
        <Aux>
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
          <Redirect from="courses/:id" to="/courses" />
        </Aux>
      );
    }

    return <div>{sectionContent}</div>;
  }
}

export default Courses;
