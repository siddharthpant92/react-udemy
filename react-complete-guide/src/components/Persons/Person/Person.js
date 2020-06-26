import React, { Component } from "react";
import PersonStyleClass from "./Person.module.css";
import Aux from "../../../hoc/Aux";

class Person extends Component {
  render() {
    // returning array of elements without single root element
    // return [
    //   <br key="key_1"></br>,
    //   <br key="key_2"></br>,
    // <div key="key_3">
    //   rendering array of elements without single root element
    // </div>,
    // <div key="key_4" className={PersonStyleClass.person}>
    //   <p onClick={this.props.click}>
    //     Name: {this.props.name} | Age: {this.props.age}
    //   </p>
    //   <p>{this.props.children}</p>
    //   <input
    //     type="text"
    //     onChange={this.props.changed}
    //     value={this.props.name}
    //   />
    //   <p>____</p>
    // </div>,
    // ];

    // built-in higher order component
    // return (
    //   <React.Fragment>
    //     <p onClick={this.props.click}>
    //       Name: {this.props.name} | Age: {this.props.age}
    //     </p>
    //     <p>{this.props.children}</p>
    //     <input
    //       type="text"
    //       onChange={this.props.changed}
    //       value={this.props.name}
    //     />
    //     <p>____</p>
    //   </React.Fragment>
    // );

    // returning a higher order component which pretends to be the root element
    return (
      <Aux>
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
      </Aux>
    );
  }
}

export default Person;
