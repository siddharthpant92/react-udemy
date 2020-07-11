import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/indexActions";
import axios from "axios";
require("dotenv").config();

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000); // redux-saga settimeout
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
    process.env.REACT_APP_FIREBASE_KEY;
  if (!action.isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      process.env.REACT_APP_FIREBASE_KEY;
  }
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };

  try {
    const response = yield axios.post(url, authData);
    yield put(
      actions.authSuccess(response.data.idToken, response.data.localId)
    );
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    console.log("authSaga authUserSaga error:", error);
    yield put(actions.authFail(error.response.data.error));
  }
}
