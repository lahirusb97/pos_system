import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAuthRtk";
import { ProductModel } from "../models/ProductModel";
import { PaginatedResponse } from "../models/PaginatedResponse";
import { ProductFormZod } from "../schema/schemaProduct";

export const productApiSlice = createApi({
  reducerPath: "product",
  baseQuery: baseQuery,
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
        //!CATEFULL WITH API WHEN DO THIS
        invalidatesTags: (result) =>
          result ? [{ type: "Product", id: result.id }] : [],
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
        invalidatesTags: (_result, _error, { id }) => [{ type: "Product", id }],
      }),
      getProductById: builder.query<ProductModel, string>({
        query: (id) => `products/${id}/`, // ✅ Fetch single product
        providesTags: (_result, _error, id) => [{ type: "Product", id }],
      }),
      deleteProduct: builder.mutation<void, number>({
        query: (id) => ({
          url: `products/${id}/`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Product", id: "LIST" }],
      }),
    };
  },
});
export const {
  useGetProductQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
