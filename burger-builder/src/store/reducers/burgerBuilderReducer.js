import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 1,
  cheese: 1,
  meat: 3,
  bacon: 2,
};

const initialState = {
  ingredients: null,
  totalPrice: 9, //hard coded based on the ingredients stored in firebase
  firebaseRequestError: false,
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

    case actionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        firebaseRequestError: false,
      };

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        firebaseRequestError: true,
      };

    default:
      return state;
  }
};
