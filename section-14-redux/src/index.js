import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import counterReducer from "./store/reducers/counter";
import resultsReducer from "./store/reducers/results";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// Combing the 2 different reducers
const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultsReducer,
});

// Needed for redux chrome extension. See Section 16 lecture 286: https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
// See actions.js::storeResult()
const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("middleware action: ", action);
      console.log("middleware current state: ", store.getState());
      console.log("middleware next: ", next);
      const result = next(action);
      console.log("middleware next state: ", store.getState());
      return result;
    };
  };
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
