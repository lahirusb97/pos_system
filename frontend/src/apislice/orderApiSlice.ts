import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseAuthRtk";
// import { OrderModel } from "../models/OrderModel";
import { PaginatedResponse } from "../models/PaginatedResponse";
import { OrderModel } from "../models/OrderModel";
import { invoiceFormZod } from "../schema/schemaInvoice";
import { InvoiceWithProducts } from "../models/ProductForm";
// import { OrderForm } from "../models/OrderForm";
// import { OrderFormZod } from "../schema/schemaOrder";

export const orderApiSlice = createApi({
  reducerPath: "order",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Order"],
  endpoints: (builder) => {
    return {
      // getOrder: builder.query<
      //   PaginatedResponse<OrderModel>,
      //   { page: number; limit: number; search?: string }
      // >({
      //   query: ({ page, limit, search }) => {
      //     let URL = `orders/?page=${page}&limit=${limit}`;
      //     if (search) {
      //       URL += `&search=${encodeURIComponent(search)}`;
      //     }
      //     return URL;
      //   },
      //   providesTags: [{ type: "Order", id: "LIST" }],
      // }),

      addOrder: builder.mutation<OrderModel, InvoiceWithProducts>({
        query: (newOrder) => ({
          url: "orders/create/",
          method: "POST",
          body: newOrder,
        }),
      }),
      // updateOrder: builder.mutation<
      //   OrderModel,
      //   { id: number; data: invoiceFormZod }
      // >({
      //   query: ({ id, data }) => ({
      //     url: `orders/${id}/`, // Assuming your API expects the order ID in the URL
      //     method: "PUT", // Use "PATCH" if you're only updating some fields
      //     body: data,
      //   }),
      //   // invalidatesTags: [{ type: "Order", id: "LIST" }], // Ensures the order list updates after editing
      // }),
    };
  },
});
// export const { useGetOrderQuery, useAddOrderMutation, useUpdateOrderMutation } =
export const { useAddOrderMutation } = orderApiSlice;
