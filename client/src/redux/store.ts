import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import { postApi } from "./posts/postApi";
import authReducer from "./auth/authSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, postApi.middleware),
});
