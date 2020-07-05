import * as actionTypes from "./actions";

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 1,
  meat: 3,
  bacon: 2,
};

const initialState = {
  ingredients: {
    salad: 1,
    cheese: 1,
    meat: 1,
    bacon: 0,
  },
  totalPrice: 9, //hard coded based on the ingredients stored in firebase
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDEIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };

    case actionTypes.REMOVE_INGREDEIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };

    default:
      return state;
  }
};
