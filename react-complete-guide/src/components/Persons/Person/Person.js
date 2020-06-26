import React, { Component } from "react";
import PersonStyleClass from "./Person.module.css";
import Aux from "../../../hoc/Aux";
import withClass from "../../../hoc/withClass";
import PropTypes from "prop-types";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  static contextType = AuthContext;

  componentDidMount() {
    console.log("Person.js componentDidMount");
    // This gets mapped to contextType
    console.log("authenticated: ", this.context.authenticated);
  }

  render() {
    // return (
    //   <div className={PersonStyleClass.person}>
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
    //   </div>
    // );
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
        {this.context.authenticated ? (
          <p>Authenticated</p>
        ) : (
          <p>Not authenticated</p>
        )}
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

    // // higher order component with classes
    // return (
    //   <WithClass classes={PersonStyleClass.person}>
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
    //   </WithClass>
    // );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func,
};
// Spread operator is used for the props
export default withClass(Person, PersonStyleClass.person);
