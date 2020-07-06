import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  results: [],
};

const storeResult = (state, action) => {
  // concat returns a new array instead of updating the exsisting one
  return updateObject(state, {
    results: state.results.concat({
      id: new Date(),
      value: action.counterValue,
    }),
  });
};

const deleteResult = (state, action) => {
  const updatedArray = state.results.filter(
    (result) => result.id !== action.idValue
  );
  return updateObject(state, {
    results: updatedArray,
  });
};

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      return storeResult(state, action);

    case actionTypes.DELETE_RESULT:
      return deleteResult(state, action);

    default:
      return state;
  }
};

export default resultsReducer;
