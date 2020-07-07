import React from "react";
import NavigationItemsStyle from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={NavigationItemsStyle.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Authenticate</NavigationItem>
  </ul>
);

export default navigationItems;
