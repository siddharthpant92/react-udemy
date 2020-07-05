import React, { useState } from "react";

import "./AddPerson.css";

const addPerson = (props) => {
  const [name, updateName] = useState("");
  const [age, updateAge] = useState(0);

  return (
    <div className="AddPerson">
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(event) => updateName(event.target.value)}
      />
      <input
        type="number"
        placeholder="age"
        value={age}
        onChange={(event) => updateAge(event.target.value)}
      />
      <button onClick={() => props.personAdded(name, age)}>
        Add Person
      </button>
    </div>
  );
};

export default addPerson;
