// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import repoReducer from "./repoSlice";
import { apiSlice } from "./apiSlice";

export const store = configureStore({
  reducer: {
    repo: repoReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
