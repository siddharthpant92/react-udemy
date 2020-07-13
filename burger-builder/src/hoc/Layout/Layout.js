import React, { useState } from "react";
import Aux from "../Aux/Aux";
import LayoutStyle from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const menuButtonClickedHandler = () => {
    setShowSideDrawer((prevState) => !prevState.showSideDrawer);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={props.isAuthenticated}
        menuButtonClicked={menuButtonClickedHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        closeSideDrawer={sideDrawerClosedHandler}
        openSideDrawer={showSideDrawer}
      />
      <main className={LayoutStyle.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
