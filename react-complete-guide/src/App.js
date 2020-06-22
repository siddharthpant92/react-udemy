import React, { Component } from "react";
import Person from "./Person/Person";
import "./App.css";

class App extends Component {
  state = {
    persons: [
      { name: "abcd", age: "23" , temp:"123"},
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
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
        >
          Did you get my information?
        </Person>

        <button onClick={this.switchNameHandler}>Switch Name</button>
      </div>
    );
  }

  switchNameHandler = () => {
    this.setState({
      persons: [
        { name: "ijkl", age: "23" },
        { name: "mnop", age: 25 },
      ],
    });
    console.log(this.state)
  };
}


export default App;
