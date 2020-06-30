import React from "react";
import ModalStyle from "../Modal/Modal.module.css";
import Aux from "../../../hoc/Aux/Aux";
import Backdrop from "../Backdrop/Backdrop";

const errorModal = (props) => {
  console.log("errorModal: ", props.show);
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
        Error in saving order
      </div>
    </Aux>
  );
};

export default errorModal;
