import React from 'react';
import BackdropStyle from "./Backdrop.module.css"

const backdrop = (props) =>
  props.show ? <div className={BackdropStyle.Backdrop} onClick={props.backdropClicked}/> : null;
 
export default backdrop;