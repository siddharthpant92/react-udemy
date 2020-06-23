import React from "react";

const person = (props) => {
  return (
    <div className="personClass">
      <p onClick={props.click}>
        Name: {props.name} | Age: {props.age}
      </p>
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
      <p>____</p>
    </div>
  );
};

export default person;
