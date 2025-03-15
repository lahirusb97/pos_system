import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";
import { productApiSlice } from "../apislice/productApiSlice";
import { orderApiSlice } from "../apislice/orderApiSlice";
import { authApiSlice } from "../apislice/authApiSlice";
import { repairApiSlice } from "../apislice/repairApiSlice";
import { customerApiSlice } from "../apislice/customerApiSlice";
import { categoryApiSlice } from "../apislice/categoryApiSlice";
export const store = configureStore({
  reducer: {
    invoice_product_filter: productSlice,
    [productApiSlice.reducerPath]: productApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [repairApiSlice.reducerPath]: repairApiSlice.reducer,
    [customerApiSlice.reducerPath]: customerApiSlice.reducer,
    [categoryApiSlice.reducerPath]: categoryApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(productApiSlice.middleware)
      .concat(orderApiSlice.middleware)
      .concat(authApiSlice.middleware)
      .concat(repairApiSlice.middleware)
      .concat(customerApiSlice.middleware)
      .concat(categoryApiSlice.middleware);
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
