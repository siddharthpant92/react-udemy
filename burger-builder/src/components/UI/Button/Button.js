import React from "react";
import ButtonStyle from "./Button.module.css";

const button = (props) => (
  <button
    onClick={props.clicked}
    className={[ButtonStyle.Button, ButtonStyle[props.btnType]].join(" ")}
  >
    {props.children}
  </button>
);

export default button;
