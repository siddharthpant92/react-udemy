export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const ADD = "ADD";
export const SUBTRACT = "SUBTRACT";
export const STORE_RESULT = "STORE_RESULT";
export const DELETE_RESULT = "DELETE_RESULT";

export const increment = () => {
  return { type: INCREMENT };
};

export const decrement = () => {
  return { type: DECREMENT };
};

export const add = (addValue) => {
  return { type: ADD, value: addValue };
};

export const subtract = (subValue) => {
  return { type: SUBTRACT, value: subValue };
};

export const saveResult = (counterValue) => {
  return { type: STORE_RESULT, counterValue: counterValue };
};

export const storeResult = (counterValue) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(saveResult(counterValue));
    }, 3000);
  };
};

export const deleteResult = (idValue) => {
  return { type: DELETE_RESULT, idValue: idValue };
};
