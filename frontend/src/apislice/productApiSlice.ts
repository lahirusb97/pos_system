import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseAuthRtk";
import { ProductModel } from "../models/ProductModel";
import { PaginatedResponse } from "../models/PaginatedResponse";
import { ProductForm } from "../models/ProductForm";
import { ProductFormZod } from "../schema/schemaProduct";

export const productApiSlice = createApi({
  reducerPath: "product",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Product"],
  endpoints: (builder) => {
    return {
      getProduct: builder.query<
        PaginatedResponse<ProductModel>,
        { page: number; limit: number; search?: string }
      >({
        query: ({ page, limit, search }) => {
          let URL = `products/?page=${page}&limit=${limit}`;
          if (search) {
            URL += `&search=${encodeURIComponent(search)}`;
          }
          return URL;
        },
        providesTags: [{ type: "Product", id: "LIST" }],
      }),

      addProduct: builder.mutation<ProductModel, ProductFormZod>({
        query: (newProduct) => ({
          url: "products/",
          method: "POST",
          body: newProduct,
        }),
      }),
      updateProduct: builder.mutation<
        ProductModel,
        { id: number; data: ProductFormZod }
      >({
        query: ({ id, data }) => ({
          url: `products/${id}/`, // Assuming your API expects the product ID in the URL
          method: "PUT", // Use "PATCH" if you're only updating some fields
          body: data,
        }),
        // invalidatesTags: [{ type: "Product", id: "LIST" }], // Ensures the product list updates after editing
      }),
    };
  },
});
export const {
  useGetProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} = productApiSlice;
