import React from "react";
import NavigationItemsStyle from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { Redirect } from "react-router-dom";

const navigationItems = (props) => (
  <ul className={NavigationItemsStyle.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : (
      <Redirect to="/" />
    )}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Logout</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Authenticate</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
