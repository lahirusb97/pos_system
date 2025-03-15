import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAuthRtk";

export const authApiSlice = createApi({
  reducerPath: "auth",
  baseQuery: baseQuery,
  tagTypes: ["Auth"],
  endpoints: (builder) => {
    return {
      loginUser: builder.mutation({
        query: (userAuth) => ({
          url: "login/",
          method: "POST",
          body: userAuth,
        }),
      }),

      registerUser: builder.mutation({
        query: (newUser) => ({
          url: "register/",
          method: "POST",
          body: newUser,
        }),
      }),
    };
  },
});
// export const { useGetOrderQuery, useAddOrderMutation, useUpdateOrderMutation } =
export const { useLoginUserMutation, useRegisterUserMutation } = authApiSlice;
