import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  trendingCoin: undefined,
  loading: undefined,
};
const trendingCoinSaga = createSlice({
  name: "trendingCoinSaga",
  initialState: initialState,
  reducers: {
    trendingCoinRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    trendingCoinSucccess: (state, action) => {
      return {
        ...state,
        loading: false,
        trendingCoin: action.payload,
      };
    },
    trendingCoinFailure: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});
export const {
  trendingCoinRequest,
  trendingCoinSucccess,
  trendingCoinFailure,
} = trendingCoinSaga.actions;
export default trendingCoinSaga.reducer;
