import React from 'react';
import SpinnerStyle from "./Spinner.module.css"

const spinner = () => {
  return <div className={SpinnerStyle.Loader}>Loading...</div>;
}
 
export default spinner;