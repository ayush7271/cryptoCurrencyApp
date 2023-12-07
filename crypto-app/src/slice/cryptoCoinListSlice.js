import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: undefined,
  cryptoList: undefined,
};
const cryptoCoinList = createSlice({
  name: "cryptoCoinList",
  initialState: initialState,
  reducers: {
    getCryptoCoinListRequest: (state) => {
      return {
        ...state,
        loading: true,  
      };
    },
    getCryptoCoinListSuccess: (state, action) => {
      return {
        ...state,
        cryptoList: action.payload,
        loading: false,
      };
    },
    getCryptoCoinListFailure: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});
export const {
  getCryptoCoinListFailure,
  getCryptoCoinListRequest,
  getCryptoCoinListSuccess,
} = cryptoCoinList?.actions;
export default cryptoCoinList?.reducer;
