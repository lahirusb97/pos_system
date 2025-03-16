import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAuthRtk";
// import { OrderModel } from "../models/OrderModel";
import { PaginatedResponse } from "../models/PaginatedResponse";
import { OrderModel } from "../models/OrderModel";
import { InvoiceWithProducts } from "../models/ProductForm";
// import { OrderForm } from "../models/OrderForm";
// import { OrderFormZod } from "../schema/schemaOrder";
export const orderApiSlice = createApi({
  reducerPath: "order",
  baseQuery: baseQuery,
  tagTypes: ["Order"],
  endpoints: (builder) => {
    return {
      getOrder: builder.query<
        PaginatedResponse<OrderModel>,
        { page: number; limit: number; search?: string }
      >({
        query: ({ page, limit, search }) => {
          let URL = `orders/?page=${page}&limit=${limit}`;
          if (search) {
            URL += `&search=${encodeURIComponent(search)}`;
          }
          return URL;
        },
        providesTags: [{ type: "Order", id: "LIST" }],
      }),

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
      getSingleOrder: builder.query<OrderModel, number>({
        query: (id) => `orders/${id}/`, // `id` is used to fetch the single order by ID
        providesTags: (_result, _error, id) => [{ type: "Order", id: id }],
      }),
      deleteOrder: builder.mutation<void, number>({
        query: (id) => ({
          url: `orders/${id}/`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Order", id: "LIST" }], // Refresh order list after deletion
      }),
      updatePayment: builder.mutation({
        query: (payment) => ({
          url: `payments/`, // Assuming your API expects the product ID in the URL
          method: "POST", // Use "PATCH" if you're only updating some fields
          body: payment,
        }),
        invalidatesTags: (_result, _error, payment) => [
          { type: "Order", id: payment.order },
        ],
      }),
    };
  },
});
// export const { useGetOrderQuery, useAddOrderMutation, useUpdateOrderMutation } =
export const {
  useGetOrderQuery,
  useAddOrderMutation,
  useGetSingleOrderQuery,
  useDeleteOrderMutation,
  useUpdatePaymentMutation,
} = orderApiSlice;
