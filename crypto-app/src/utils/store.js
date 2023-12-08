import saga from "../saga/saga.js";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import trendingCoinSaga from "../slice/cryptoSlice.js";
import cryptoCoinListSlice from "../slice/cryptoCoinListSlice.js";
import getallCurrency from "../slice/getallCurrency.js";
import getBitcoinInfo from "../slice/getBitcoinInfo.js";
import historicalChart from "../slice/historicalChart.js";
const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    trendingCrypto: trendingCoinSaga,
    coinlist: cryptoCoinListSlice,
    getallCurrency: getallCurrency,
    getBitcoinInfo: getBitcoinInfo,
    historicalChart: historicalChart,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(saga);
