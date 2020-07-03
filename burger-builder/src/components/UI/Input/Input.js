import React from "react";
import InputTyle from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          {...props.elementConfig}
          className={InputTyle.InputElement}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "email":
      inputElement = (
        <input
          {...props.elementConfig}
          className={InputTyle.InputElement}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          {...props.elementConfig}
          className={InputTyle.InputElement}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input className={InputTyle.InputElement} value={props.value} />
      );
      break;
  }
  return (
    <div className={InputTyle.Input}>
      <label className={InputTyle.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
