import React, { useState } from "react";
import Person from "./Person/Person";
import "./App.css";

const app = (props) => {
  /*
  useState works only with functional components
  useState returns 2 values: the actual state values AND a function to reset the state.
  Unlike setState in class components, setPersonsState will not update the state of existing keys, it resets the state
  and can set the state to anything. Section 3, lecture 45
  */
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: "abcd", age: "23", temp: "123" },
      { name: "efgh", age: 25 },
    ],
    otherState: "some other value",
  });

  console.log(personsState) // See the console.log before and after the button is clicked

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        { name: "ijkl", age: "23" },
        { name: "mnop", age: 25 },
      ],
    });
  };

  return (
    <div className="App">
      <h1>I'm a react app!</h1>
      <Person
        name={personsState.persons[0].name}
        age={personsState.persons[0].age}
      />
      <Person
        name={personsState.persons[1].name}
        age={personsState.persons[1].age}
      >
        Did you get my information?
      </Person>

      <button onClick={switchNameHandler}>Switch Name</button>
    </div>
  );
};

export default app;
