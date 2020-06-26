import React, { useEffect, useState, useContext } from "react";
import CockpitStyleClasses from "./Cockpit.module.css";
import AuthContext from "../../context/auth-context";

const cockpit = (props) => {
  const authContext = useContext(AuthContext)
  console.log("Cockpit.js authContext: ", authContext.authenticated)
  // useEffect is componentDidMount, componentDidUpdate, and componentWillUnmount combined
  useEffect(() => {
    console.log(
      "cockpit.js useEffect called only the first time for this component"
    );

    return () => {
      console.log("Cockpit.js useEffect unmount - 1");
    };
  }, []);
  // If an empty array is not supplied, useEffect gets executed for every change

  useEffect(() => {
    console.log(
      "cockpit.js useEffect was called because persons.showPersons was changed"
    );

    return () => {
      console.log("Cockpit.js useEffect unmount - 2");
    };
  }, [props.showPersons]);

  let assignedClasses = [];
  let btnClass = [CockpitStyleClasses.button]; // from Cockpit.module.css

  if (props.personsLength <= 2) {
    assignedClasses.push(CockpitStyleClasses.red); // from Cockpit.module.css
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(CockpitStyleClasses.bold); // from Cockpit.module.css
  }
  if (props.showPersons) {
    btnClass.push(CockpitStyleClasses.button_red);
  }

  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{props.appTitle}</h1>
      <p className={assignedClasses.join(" ")}>
        Dynamic class styling. Delete a div to change the style dynamically
      </p>
      <p
        onClick={() => {
          setCount(count + 1);
        }}
      >
        click me and see console for useState: {count}
      </p>
      <button
        className={btnClass.join(" ")}
        onClick={props.togglePersonHandler}
      >
        Toggle Persons
      </button>
       <button onClick={authContext.login}>Mock Log in</button>
    </div>
  );
};

export default cockpit;
