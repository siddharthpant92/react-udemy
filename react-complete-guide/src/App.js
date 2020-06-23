import React, { Component } from "react";
import Person from "./Person/Person";
import "./App.css";

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
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                key={person.id}
                // click={this.deletePersonHandler.bind(this, index)}
                click={() => this.deletePersonHandler(index)}
                changed={(event) => this.nameChangeHandler(event, person.id)}
              ></Person>
            );
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>I'm a react app!</h1>
        {persons}
        <button onClick={this.togglePersonHandler}>Toggle Persons</button>
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
