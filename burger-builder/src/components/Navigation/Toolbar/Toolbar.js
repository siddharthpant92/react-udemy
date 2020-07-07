import React from "react";
import ToolbarStyle from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = (props) => (
  <header className={ToolbarStyle.Toolbar}>
    <div
      className={ToolbarStyle.DrawerToggle}
      onClick={props.menuButtonClicked}
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div className={ToolbarStyle.Logo}>
      <Logo />
    </div>
    <div className={ToolbarStyle.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuth} />
    </div>
  </header>
);

export default toolbar;
