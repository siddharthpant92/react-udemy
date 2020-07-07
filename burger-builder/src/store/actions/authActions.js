import * as actionTypes from "./actionTypes";
import axios from "axios";
require("dotenv").config();

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (idToken, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());

    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
      process.env.REACT_APP_FIREBASE_KEY;
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        process.env.REACT_APP_FIREBASE_KEY;
    }

    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(url, authData)
      .then((response) => {
        console.log(response.data);
        dispatch(authSuccess(response.data.idToken, response.data.localId));
      })
      .catch((error) => {
        console.log("authActions auth error: ", error);
        dispatch(authFail(error));
      });
  };
};
