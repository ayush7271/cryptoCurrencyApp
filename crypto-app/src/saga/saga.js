import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { AppSagaFailure, AppSagaRequest, AppSagaSucccess } from "../slice/cryptoSlice";


function* AppSagaRequestSaga(action) {
  try {
   yield put(AppSagaSucccess());
  } catch (e) {
    yield(AppSagaFailure());
  }
}

function* saga() {
  yield takeLatest(AppSagaRequest, AppSagaRequestSaga);
}

export default saga;