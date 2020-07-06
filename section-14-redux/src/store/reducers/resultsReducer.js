import * as actionTypes from "../actions/actionTypes";

const initialState = {
  results: [],
};

const resultsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      // concat returns a new array instead of updating the exsisting one
      return {
        ...state,
        results: state.results.concat({
          id: new Date(),
          value: action.counterValue,
        }),
      };
    case actionTypes.DELETE_RESULT:
      const updatedArray = state.results.filter(
        (result) => result.id !== action.idValue
      );
      return {
        ...state,
        results: updatedArray,
      };

    default:
      return state;
  }
};

export default resultsReducer;
