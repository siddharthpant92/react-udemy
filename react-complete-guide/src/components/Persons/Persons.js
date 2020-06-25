import React, { Component } from "react";
import Person from "./Person/Person";

class Persons extends Component {
  
  // static getDerivedStateFromProps(props, state) {
  //   console.log("persons.js getDervedStateFromProps");
  //   return state;
  // }

  shouldComponentUpdate(nextProps, nextState) {
    // https://reactjs.org/docs/react-component.html#shouldcomponentupdate
    console.log("persons.js shouldComponentUpdate");
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("persons.js getSnapshotBeforeUpdate");
    return {message: "snapshot"}
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(snapshot)
    console.log("persons.js componentDidUpdate");
  }

  render() {
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

export default Persons;
