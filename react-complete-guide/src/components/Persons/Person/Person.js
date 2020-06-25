import React, { Component } from "react";
import PersonStyleClass from "./Person.module.css";

class Person extends Component {
  render() {
    return (
      <div className={PersonStyleClass.person}>
        <p onClick={this.props.click}>
          Name: {this.props.name} | Age: {this.props.age}
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
        <p>____</p>
      </div>
    );
  }
}

export default Person;
