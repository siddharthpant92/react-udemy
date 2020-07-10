import { takeEvery } from "redux-saga/effects";
import { checkAuthTimeoutSaga, authUserSaga } from "./authSaga";
import { initIngredientsSaga } from "./burgerBuilderSaga";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.GET_INITIAL_INGREDIENTS, initIngredientsSaga);
}
