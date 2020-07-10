import { put } from "redux-saga/effects";
import axiosInstance from "../../axios-orders";
import * as actions from "../actions/indexActions";

export function* initPurchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axiosInstance.post("/orders.json", action.orderData);
    yield put(actions.purchaseBurgerSuccess(response.data, action.orderData));
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchAllOrdersSaga() {
  yield put(actions.fetchExistingOrdersStart());
  try {
    const response = yield axiosInstance.get("orders.json");

    const fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({ ...response.data[key], id: key });
    }
    yield put(actions.fetchExistingOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchExistingOrdersError(error));
  }
}
