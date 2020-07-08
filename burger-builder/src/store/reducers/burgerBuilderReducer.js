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
  buildingBurger: false,
};

function addIngredient(state, action) {
  const updatedIngredients = { ...state.ingredients };
  updatedIngredients[action.ingredientName] =
    state.ingredients[action.ingredientName] + 1;

  return {
    ...state,
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    buildingBurger: true,
  };
}

function removeIngredient(state, action) {
  const updatedIngredients = { ...state.ingredients };
  updatedIngredients[action.ingredientName] =
    state.ingredients[action.ingredientName] - 1;

  return {
    ...state,
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
    buildingBurger: true,
  };
}

function setIngredient(state, action) {
  return {
    ...state,
    ingredients: action.ingredients,
    firebaseRequestError: false,
    totalPrice: 9,
    buildingBurger: false,
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDEIENT:
      return addIngredient(state, action);

    case actionTypes.REMOVE_INGREDEIENT:
      return removeIngredient(state, action);

    case actionTypes.SET_INGREDIENTS:
      return setIngredient(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        firebaseRequestError: true,
      };

    default:
      return state;
  }
};
