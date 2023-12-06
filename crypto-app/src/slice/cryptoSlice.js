// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   crypto: undefined,
//   loading: undefined,
// };
// const cryptoSlice = createSlice({
//   name: "cryptoSaga",
//   initialState: initialState,
//   reducers: {
//     getCryptoRequest: (state) => {
//       return {
//         ...state,
//         loading: true,
//       };
//     },
//     getCryptoSuccess: (state, action) => {
//       return {
//         ...state,
//         loading: false,
//         crypto: action.payload,
//       };
//     },
//     getCryptoFailure: (state) => {
//       return {
//         ...state,
//         loading: false,
//       };
//     },
//   },
// });
// export const { getCryptoRequest, getCryptoSuccess, getCryptoFailure } =
//   cryptoSlice.actions;
// export default cryptoSlice.reducer

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  app: undefined,
  loading: undefined,
  sucess: undefined,
};
const AppSaga = createSlice({
  name: "appSaga",
  initialState: initialState,
  reducers: {
    AppSagaRequest: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    AppSagaSucccess: (state) => {
      return {
        ...state,
        loading: false,
        sucess: true,
      };
    },
    AppSagaFailure: (state) => {
      return {
        ...state,
        loading: false,
        sucess: false,
      };
    },
  },
});
export const { AppSagaRequest, AppSagaSucccess, AppSagaFailure } =
  AppSaga.actions;
export default AppSaga.reducer;
