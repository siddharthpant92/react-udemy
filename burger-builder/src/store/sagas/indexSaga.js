import { all, takeEvery, takeLatest } from "redux-saga/effects";
import { checkAuthTimeoutSaga, authUserSaga } from "./authSaga";
import { initIngredientsSaga } from "./burgerBuilderSaga";
import { initPurchaseBurgerSaga, fetchAllOrdersSaga } from "./ordersSaga";
import * as actionTypes from "../actions/actionTypes";

export function* watchAuth() {
  yield all([
    takeEvery(actionTypes.AUTH_CHECK_TIMEOUT_SAGA, checkAuthTimeoutSaga),
    takeLatest(actionTypes.AUTH_USER_SAGA, authUserSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeLatest(actionTypes.GET_INITIAL_INGREDIENTS_SAGA, initIngredientsSaga);
}

export function* watchOrders() {
  yield all([
    takeEvery(actionTypes.INIT_PURCHASE_BURGER_SAGA, initPurchaseBurgerSaga),
    takeLatest(actionTypes.FETCH_ALL_ORDERS_SAGA, fetchAllOrdersSaga),
  ]);
}
