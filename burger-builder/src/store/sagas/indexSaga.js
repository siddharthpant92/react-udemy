import { takeEvery } from "redux-saga/effects";
import { checkAuthTimeoutSaga, authUserSaga } from "./authSaga";
import { initIngredientsSaga } from "./burgerBuilderSaga";
import { initPurchaseBurgerSaga, fetchAllOrdersSaga } from "./ordersSaga";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.GET_INITIAL_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrders() {
  yield takeEvery(actionTypes.INIT_PURCHASE_BURGER, initPurchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ALL_ORDERS, fetchAllOrdersSaga)
}
