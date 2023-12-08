import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  historicalChart: undefined,
  loading: undefined,
};
const historicalChartSaga = createSlice({
  name: "historicalChartSaga",
  initialState: initialState,
  reducers: {
    historicalChartRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    historicalChartSucccess: (state, action) => {
      return {
        ...state,
        loading: false,
        historicalChart: action.payload,
      };
    },
    historicalChartFailure: (state) => {
      return {
        ...state,
        loading: false,
      };
    },
  },
});
export const {
  historicalChartRequest,
  historicalChartSucccess,
  historicalChartFailure,
} = historicalChartSaga.actions;
export default historicalChartSaga.reducer;
