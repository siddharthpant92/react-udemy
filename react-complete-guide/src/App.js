import React, { Component } from "react";
import Person from "./Person/Person";
import "./App.css";

class App extends Component {
  state = {
    persons: [
      { name: "abcd", age: "23", temp: "123" },
      { name: "efgh", age: 25 },
    ],
  };

  render() {
    return (
      <div className="App">
        <h1>I'm a react app!</h1>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
          click={this.switchNameHandler.bind(this, "a")} // passing argument
        >
          Click me and see what happens
        </Person>
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          changed={this.nameChangeHandler}
        >
          Did you get my information?
        </Person>

        <button
          onClick={(event) => {
            return this.switchNameHandler("b");
          }}
        >
          Switch Name
        </button>
      </div>
    );
  }

  switchNameHandler = (name) => {
    this.setState({
      persons: [
        { name: name, age: "23" },
        { name: "mnop", age: 25 },
      ],
    });
  };

  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        { name: "c", age: "23" },
        { name: event.target.value, age: 25 },
      ],
    });
  };
}

export default App;
