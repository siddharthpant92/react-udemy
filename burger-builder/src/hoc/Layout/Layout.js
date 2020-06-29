import React, { Component } from "react";
import Aux from "../Aux/Aux";
import LayoutStyle from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    console.log("clicked");
    this.setState({ showSideDrawer: false });
  };

  menuButtonClickedHandler = () => {
    this.setState((prevState, props) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    })
  }

  render() {
    return (
      <Aux>
        <Toolbar menuButtonClicked={this.menuButtonClickedHandler} />
        <SideDrawer
          closeSideDrawer={this.sideDrawerClosedHandler}
          openSideDrawer={this.state.showSideDrawer}
        />
        <main className={LayoutStyle.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;