import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/indexActions";

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000); // redux-saga settimeout
  yield put(actions.logout());
}
