import saga from "../saga/saga.js";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import trendingCoinSaga from "../slice/cryptoSlice.js";
import cryptoCoinListSlice from "../slice/cryptoCoinListSlice.js";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    trendingCrypto: trendingCoinSaga,
    coinlist: cryptoCoinListSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(saga);
