import React from "react";
import "./CharComponent.css";

const charComponent = (props) => {
  let chars = null;
  const enteredText = props.enteredText;
  if (enteredText != null && enteredText.length > 0) {
    const enteredTextArray = enteredText.split("");

    chars = enteredTextArray.map((c, index) => {
      return (
        <p
          className="char-component"
          onClick={props.deleteCharacter.bind(this, index)}
          key={index}
        >
          {c}
        </p>
      );
    });
  }

  return chars;
};

export default charComponent;
