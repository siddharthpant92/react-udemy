import React, { Component } from "react";
import ModalStyle from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Comparing children, since the component should re-render for OrderSummary and Spinner child components
    return nextProps.show !== this.props.show || this.props.children !== nextProps.children;
  }

  render() {
    return (
      <Aux>
        <Backdrop
          show={this.props.show}
          backdropClicked={this.props.modalClosed}
        />
        <div
          className={ModalStyle.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}
export default Modal;
