import * as actionTypes from "./actionTypes"

export const increment = () => {
  return { type: actionTypes.INCREMENT };
};

export const decrement = () => {
  return { type: actionTypes.DECREMENT };
};

export const add = (addValue) => {
  return { type: actionTypes.ADD, value: addValue };
};

export const subtract = (subValue) => {
  return { type: actionTypes.SUBTRACT, value: subValue };
};
