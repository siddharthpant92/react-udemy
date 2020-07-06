import * as actionTypes from "./actionTypes";


export const saveResult = (counterValue) => {
  return { type: actionTypes.STORE_RESULT, counterValue: counterValue };
};

export const storeResult = (counterValue) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(saveResult(counterValue));
    }, 3000);
  };
};

export const deleteResult = (idValue) => {
  return { type: actionTypes.DELETE_RESULT, idValue: idValue };
};
