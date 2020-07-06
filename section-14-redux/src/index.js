import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import counterReducer from "./store/reducers/counter";
import resultsReducer from "./store/reducers/results";
import { Provider } from "react-redux";

// Combing the 2 different reducers
const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultsReducer,
});

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("middleware action: ", action);
      console.log("middleware current state: ", store.getState());
      const result = next(action);
      console.log("middleware next state: ", store.getState());
      return result;
    };
  };
};

const store = createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
