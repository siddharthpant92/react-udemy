import React, { Component } from "react";
import { connect } from "react-redux";
import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";
import ACTION_TYPES from "./../store/actions";

class Persons extends Component {
  render() {
    return (
      <div>
        <AddPerson
          personAdded={(name, age) => this.props.personAddedHandler(name, age)}
        />
        {this.props.persons.map((person) => (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.props.personDeletedHandler(person.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    personAddedHandler: (name, age) =>
      dispatch({
        type: ACTION_TYPES.ADD_PERSON,
        payload: {
          id: Math.random(), // not really unique but good enough here!
          name: name,
          age: age,
        },
      }),
    personDeletedHandler: (personId) =>
      dispatch({
        type: ACTION_TYPES.DELETE_PERSON,
        personId: personId,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Persons);
