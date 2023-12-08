import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  getallCurrency: undefined,
  loading: undefined,
};
const getallCurrency = createSlice({
  name: "getallCurrency",
  initialState: initialState,
  reducers: {
    getallCurrencyRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    getallCurrencySucccess: (state, action) => {
      return {
        ...state,
        loading: false,
        getallCurrency: action.payload,
      };
    },
    getallCurrencyFailure: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});
export const {
  getallCurrencyRequest,
  getallCurrencySucccess,
  getallCurrencyFailure,
} = getallCurrency.actions;
export default getallCurrency.reducer;
