const redux = require("redux");
const createStore = redux.createStore;
const initialState = {
  counter: 0,
};

// Reducer : where the state is updated. Needs to be registered first, so that it can pick up all actions once the store is registered
const rootReducer = (state = initialState, action) => {
  if (action.type === "INC_COUNTER") {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }

  if (action.type === "ADD_COUNTER") {
    return {
      ...state, // Effectively here we're overiding the value of counter from ... , but if state had other properties, they would be copied and spread, and only the counter value would be updated
      counter: state.counter + action.value,
    };
  }

  return state;
};

// Store
const store = createStore(rootReducer);

// Subscription : called everytime a dispatch happens. If this is registered after the dispatch actions, then the subscription isn't called
store.subscribe(() => {
  console.log("subscription: ", store.getState());
});

// Dispatching action
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 10 });
// console.log(store.getState());
