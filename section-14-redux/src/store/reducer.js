const initialState = {
  counter: 0,
  results: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      // Updating the state immutably, buy spreading original properties and then updating required property
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    case "ADD":
      return { ...state, counter: state.counter + action.value };
    case "SUBTRACT":
      return { ...state, counter: state.counter - action.value };
    case "STORE_RESULT":
      // concat returns a new array instead of updating the exsisting one
      return {
        ...state,
        results: state.results.concat({ id: new Date(), value: state.counter }),
      };
    case "DELETE_RESULT":
      const updatedArray = state.results.filter(result => result.id !== action.idValue)
      return {
        ...state,
        results: updatedArray
      }

    default:
      return state;
  }
};

export default reducer;
