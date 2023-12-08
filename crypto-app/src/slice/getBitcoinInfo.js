import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  getBitcoinInfo: undefined,
  loading: undefined,
};
const getBitcoinInfoSaga = createSlice({
  name: "getBitcoinInfoSaga",
  initialState: initialState,
  reducers: {
    getBitcoinInfoRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    getBitcoinInfoSucccess: (state, action) => {
      return {
        ...state,
        loading: false,
        getBitcoinInfo: action.payload,
      };
    },
    getBitcoinInfoFailure: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});
export const {
  getBitcoinInfoRequest,
  getBitcoinInfoSucccess,
  getBitcoinInfoFailure,
} = getBitcoinInfoSaga.actions;
export default getBitcoinInfoSaga.reducer;
