/* ~ ~ ~ ~ ~ NPM Dependencies ~ ~ ~ ~ ~ */
import { configureStore } from "@reduxjs/toolkit";

/* ~ ~ ~ ~ ~ Application Files ~ ~ ~ ~ ~ */
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authSliceReducer from "./slices/authSlice";

/* ~ ~ ~ ~ ~ Create Store ~ ~ ~ ~ ~ */
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authSliceReducer
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
});

/* ~ ~ ~ ~ ~ Export ~ ~ ~ ~ ~ */
export default store;
