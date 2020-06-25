import React, { useEffect } from "react";
import CockpitStyleClasses from "./Cockpit.module.css";

const cockpit = (props) => {
  // useEffect is componentDidMount, componentDidUpdate, and componentWillUnmount combined
  useEffect(() => {
    console.log(
      "cockpit.js useEffect called only the first time for this component"
    );

    return (() => {
      console.log("Cockpit.js useEffect unmount - 1")
    })
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

  return (
    <div>
      <h1>{props.appTitle}</h1>
      <p className={assignedClasses.join(" ")}>
        Dynamic class styling. Delete a div to change the style dynamically
      </p>
      <button
        className={btnClass.join(" ")}
        onClick={props.togglePersonHandler}
      >
        Toggle Persons
      </button>
    </div>
  );
};

export default cockpit;
