import React, { Component } from "react";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
// works only with react-scripts@2.0.0 and higher. For renaming css file see https://stackoverflow.com/questions/53062306/css-modules-not-working-for-react-version-16-6-0
import styleClasses from "./App.module.css";

class App extends Component {
  state = {
    persons: [
      { id: "rytuj", name: "abcd", age: "23", temp: "123" },
      { id: "rfvec", name: "efgh", age: 25 },
    ],
    showPersons: false,
  };

  render() {
    let persons = null;

    if (this.state.showPersons) {
      persons = (
        // You can use for-each, but then you have to add each new Person object to an array and return that array to 'persons' to be rendered. array.map does that
        <Persons
          persons={this.state.persons}
          clicked={(index) => this.deletePersonHandler(index)}
          changed={(event, personId) => this.nameChangeHandler(event, personId)}
        />
      );
    }

    return (
      <div className={styleClasses.App}>
        <Cockpit
          personsLength={this.state.persons.length}
          showPersons={this.state.showPersons}
          togglePersonHandler={this.togglePersonHandler}
        />
        {persons}
      </div>
    );
  }

  nameChangeHandler = (event, personId) => {
    const personIndex = this.state.persons.findIndex((p) => p.id === personId);
    // Good practice to not mutate state directly
    const updatedPersons = [...this.state.persons];

    updatedPersons[personIndex].name = event.target.value;

    this.setState({ persons: updatedPersons });
  };

  deletePersonHandler = (personIndex) => {
    // const person = this.state.persons
    // Creating a copy of the original array, so that the original array is untouched - good practice
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonHandler = () => {
    this.setState({ showPersons: !this.state.showPersons });
  };
}

export default App;
