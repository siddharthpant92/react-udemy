import React from "react";
import burgerLogo from "../../assets/images/burger.png";
import LogoStyle from "./Logo.module.css";

const logo = (props) => (
  <div className={LogoStyle.Logo} style={{ height: props.height }}>
    <img src={burgerLogo} alt="MyBurger" />
  </div>
);

export default logo;
