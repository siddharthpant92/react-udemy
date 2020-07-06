import * as actionTypes from "./actionTypes";

export const addIngredient = (ingredientName) => {
  return {
    type: actionTypes.ADD_INGREDEIENT,
    ingredientName: ingredientName,
  };
};

export const removeIngredient = (ingredientName) => {
  return {
    type: actionTypes.REMOVE_INGREDEIENT,
    ingredientName: ingredientName,
  };
};
