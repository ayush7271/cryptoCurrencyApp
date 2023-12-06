import saga from '../saga/saga.js';
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import appslice from '../slice/cryptoSlice.js';
const sagaMiddleware = createSagaMiddleware()
export const store = configureStore({
  reducer:{
    appsaga:appslice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})
sagaMiddleware.run(saga)