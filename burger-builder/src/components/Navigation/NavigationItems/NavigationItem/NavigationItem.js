import React from "react";
import NavigationItemStyle from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => (
  <li className={NavigationItemStyle.NavigationItem}>
    {/* TODO: change home route to burgerbuilder or something. Redirect '/' to that, then you can get rid of this exact */}
    <NavLink to={props.link} exact activeClassName={NavigationItemStyle.active}>
      {" "}
      {props.children}{" "}
    </NavLink>
  </li>
);

export default navigationItem;
