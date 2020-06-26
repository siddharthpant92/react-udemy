import React, { Component } from "react";
import Person from "./Person/Person";
import PropTypes from "prop-types";

class Persons extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   console.log("persons.js getDervedStateFromProps");
  //   return state;
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // https://reactjs.org/docs/react-component.html#shouldcomponentupdate
    console.log("persons.js shouldComponentUpdate");
    /*
    if we directly return true (or don't have this lifecycle mthod at all), then everytime
    the Cockpit component is toggled, this gets re-rendered. See log statements to verify.
    In App.js, if anything changes, even if it's not supposed to affect the Persons component,
    the render method is called which causes the re-render

    The below if-else prevents the re-rendering
    */
    if (nextProps.persons !== this.props.persons) {
      return true;
    } else {
      return false;
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("persons.js getSnapshotBeforeUpdate");
    return { message: "snapshot" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot);
    console.log("persons.js componentDidUpdate");
  }

  render() {
    console.log("Persons.js render....");
    return this.props.persons.map((person, index) => {
      return (
        <Person
          name={person.name}
          age={person.age}
          key={person.id}
          // click={this.deletePersonHandler.bind(this, index)}
          click={() => this.props.clicked(index)}
          changed={(event) => this.props.changed(event, person.id)}
        ></Person>
      );
    });
  }
}

Persons.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  id: PropTypes.string,
  clicked: PropTypes.func,
  changed: PropTypes.func,
};

export default Persons;
