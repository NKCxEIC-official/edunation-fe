/* eslint-disable */
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers";

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export default store;
