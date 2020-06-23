import React, { Component } from "react";
import Person from "./Person/Person";
import UserInput from "./UserInput/UserInput";
import UserOutput from "./UserOutput/UserOutput";
import "./App.css";

class App extends Component {
  state = {
    persons: [
      { name: "abcd", age: "23", temp: "123" },
      { name: "efgh", age: 25 },
    ],
    username: "random_username"
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

        <h1>Assignment</h1>

        <UserInput
          changeUsername={this.updateUserName}
          currentValue={this.state.username}
        />
        <UserOutput userName="username_1"> para 1 </UserOutput>
        <UserOutput userName={this.state.username}> para 2 </UserOutput>
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

  updateUserName = (event) => {
    this.setState({username: event.target.value})
  }
}

export default App;
