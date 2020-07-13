import React from "react";
import ModalStyle from "./Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

const Modal = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   // Comparing children, since the component should re-render for OrderSummary and Spinner child components
  //   return nextProps.show !== props.show || props.children !== nextProps.children;
  // }

  return (
    <Aux>
      <Backdrop show={props.show} backdropClicked={props.modalClosed} />
      <div
        className={ModalStyle.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Aux>
  );
};
export default React.memo(Modal, (prevProps, nextProps) => {
  // Opposite logic of componentShould
  return (
    nextProps.show === prevProps.show ||
    prevProps.children === nextProps.children
  );
});
