import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAuthRtk";
import { ProductModel } from "../models/ProductModel";
import { PaginatedResponse } from "../models/PaginatedResponse";
import { ProductFormZod } from "../schema/schemaProduct";
import { CustomerTotalBalance } from "../models/CustomerSales";

export const customerApiSlice = createApi({
  reducerPath: "customer",
  baseQuery: baseQuery,
  tagTypes: ["Customer"],
  endpoints: (builder) => {
    return {
      getCustomers: builder.query<
        PaginatedResponse<CustomerTotalBalance>,
        { page: number; limit: number; search?: string }
      >({
        query: ({ page, limit, search }) => {
          let URL = `customers/?page=${page}&limit=${limit}`;
          if (search) {
            URL += `&search=${encodeURIComponent(search)}`;
          }
          return URL;
        },
        providesTags: [{ type: "Customer", id: "LIST" }],
      }),

      addCustomer: builder.mutation<ProductModel, ProductFormZod>({
        query: (newProduct) => ({
          url: "customer/",
          method: "POST",
          body: newProduct,
        }),
        invalidatesTags: (result) =>
          result ? [{ type: "Customer", id: result.id }] : [],
      }),
      updateCustomer: builder.mutation<
        ProductModel,
        { id: number; data: ProductFormZod }
      >({
        query: ({ id, data }) => ({
          url: `products/${id}/`, // Assuming your API expects the product ID in the URL
          method: "PUT", // Use "PATCH" if you're only updating some fields
          body: data,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: "Customer", id }],
      }),
    };
  },
});
export const {
  useGetCustomersQuery,
  useAddCustomerMutation,
  useUpdateCustomerMutation,
} = customerApiSlice;
