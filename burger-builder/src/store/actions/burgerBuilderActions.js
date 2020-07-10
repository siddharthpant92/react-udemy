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

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return {
    type: actionTypes.GET_INITIAL_INGREDIENTS,
  };
};
