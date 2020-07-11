import { put } from "redux-saga/effects";
import axiosInstance from "../../axios-orders";
import * as actions from "../actions/indexActions";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axiosInstance.get("/ingredients.json");
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    console.log("burgerBuilderSaga initIngredientsSaga error:", error);
    yield put(actions.fetchIngredientsFailed(console.error()));
  }
}
