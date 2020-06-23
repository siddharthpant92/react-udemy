import React, { Component } from "react";
import Person from "./Person/Person";
import ValidationComponent from "./ValidationComponent/ValidationComponent";
import CharComponent from "./CharComponent/CharComponent";
import "./App.css";

class App extends Component {
  state = {
    persons: [
      { id: "rytuj", name: "abcd", age: "23", temp: "123" },
      { id: "rfvec", name: "efgh", age: 25 },
    ],
    showPersons: false,
    text: "",
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

        <h1>Section 4 - Assignment</h1>
        <input
          type="text"
          onChange={(event) => this.calculateLength(event)}
          value={this.state.text}
        ></input>
        <p>Text Length: {this.state.text.length}</p>
        <ValidationComponent textLength={this.state.text.length} />
        <CharComponent
          enteredText={this.state.text}
          deleteCharacter={(indexToBeDeleted) =>
            this.deleteCharacter(indexToBeDeleted)
          }
        />
      </div>
    );
  }

  calculateLength = (event) => {
    const enteredText = event.target.value;
    const calculatedTextLength = enteredText.length;
    this.setState({ text: enteredText, textLength: calculatedTextLength });
  };

  deleteCharacter = (indexToBeDeleted) => {
    let udpatedTextArray = this.state.text.split("");
    udpatedTextArray.splice(indexToBeDeleted, 1)
    
    const updatedText = udpatedTextArray.join("")

    this.setState({ text: updatedText, textLength: updatedText.length });
  };

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
