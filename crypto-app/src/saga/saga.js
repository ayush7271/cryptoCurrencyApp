import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import {
  trendingCoinFailure,
  trendingCoinRequest,
  trendingCoinSucccess,
} from "../slice/cryptoSlice";
import Axios from "axios";
import {
  getCryptoCoinListFailure,
  getCryptoCoinListRequest,
  getCryptoCoinListSuccess,
} from "../slice/cryptoCoinListSlice";
import {
  getallCurrencyFailure,
  getallCurrencyRequest,
  getallCurrencySucccess,
} from "../slice/getallCurrency";
import {
  getBitcoinInfoFailure,
  getBitcoinInfoRequest,
  getBitcoinInfoSucccess,
} from "../slice/getBitcoinInfo";
import {
  historicalChartFailure,
  historicalChartRequest,
  historicalChartSucccess,
} from "../slice/historicalChart";

const callAPI = async ({ url, method, data, headers }) => {
  return await Axios({
    url,
    method,
    data,
    headers,
  });
};
const BASE_URI = "https://api.coingecko.com/api/v3";
function* trendingCoinRequestSaga(param) {
  const { currency, page } = param.payload;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = yield call(() =>
      callAPI({
        url: `${BASE_URI}/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=${page}&sparkline=false&price_change_percentage=24h`,
        headers: headers,
      })
    );
    yield put(trendingCoinSucccess(response.data));
  } catch (e) {
    yield trendingCoinFailure();
  }
}

export function* getCryptoCoinListRequestSaga(param) {
  const { currency } = param.payload;

  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = yield call(() =>
      callAPI({
        url: `${BASE_URI}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        headers: headers,
      })
    );
    yield put(getCryptoCoinListSuccess(response.data));
  } catch (e) {
    yield put(getCryptoCoinListFailure());
  }
}
export function* getallCurrencyRequestSaga(param) {
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = yield call(() =>
      callAPI({
        url: `${BASE_URI}/simple/supported_vs_currencies`,
        headers: headers,
      })
    );
    yield put(getallCurrencySucccess(response.data));
  } catch (e) {
    yield put(getallCurrencyFailure());
  }
}
export function* getBitcoinInfoRequestSaga(param) {
  const { id } = param.payload;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = yield call(() =>
      callAPI({
        url: `${BASE_URI}/coins/${id}`,
        headers: headers,
      })
    );
    yield put(getBitcoinInfoSucccess(response.data));
  } catch (e) {
    yield put(getBitcoinInfoFailure());
  }
}
export function* historicalChartRequestSaga(param) {
  const { id, days, currency } = param.payload;
  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = yield call(() =>
      callAPI({
        url: `${BASE_URI}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`,
        headers: headers,
      })
    );
    yield put(historicalChartSucccess(response.data));
  } catch (e) {
    yield put(historicalChartFailure());
  }
}

function* saga() {
  yield takeLatest(trendingCoinRequest, trendingCoinRequestSaga);
  yield takeLatest(getCryptoCoinListRequest, getCryptoCoinListRequestSaga);
  yield takeLatest(getallCurrencyRequest, getallCurrencyRequestSaga);
  yield takeLatest(getBitcoinInfoRequest, getBitcoinInfoRequestSaga);
  yield takeLatest(historicalChartRequest, historicalChartRequestSaga);
}

export default saga;