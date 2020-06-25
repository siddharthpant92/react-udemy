import React from "react";
import CockpitStyleClasses from "./Cockpit.module.css";

const cockpit = (props) => {
  let assignedClasses = [];
  let btnClass = [CockpitStyleClasses.button]; // from App.css

  if (props.personsLength <= 2) {
    assignedClasses.push(CockpitStyleClasses.red); // from App.css
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(CockpitStyleClasses.bold); // from App.css
  }
  if (props.showPersons) {
    btnClass.push(CockpitStyleClasses.button_red);
  }

  return (
    <div>
      <h1>I'm a react app!</h1>
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
