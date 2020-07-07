import React, { Component } from "react";
import Aux from "../Aux/Aux";
import LayoutStyle from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  menuButtonClickedHandler = () => {
    this.setState((prevState, props) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          menuButtonClicked={this.menuButtonClickedHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closeSideDrawer={this.sideDrawerClosedHandler}
          openSideDrawer={this.state.showSideDrawer}
        />
        <main className={LayoutStyle.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
