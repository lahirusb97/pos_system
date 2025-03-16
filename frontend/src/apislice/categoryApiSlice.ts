import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAuthRtk";
import { CategoryModel } from "../models/CategoryModel";
import { PaginatedResponse } from "../models/PaginatedResponse";
import { CategoryFormZod } from "../schema/schemaCategory";

export const categoryApiSlice = createApi({
  reducerPath: "category",
  baseQuery: baseQuery,
  tagTypes: ["Category"],
  endpoints: (builder) => {
    return {
      getCategory: builder.query<
        PaginatedResponse<CategoryModel>,
        { page: number; limit: number; search?: string }
      >({
        query: ({ page, limit, search }) => {
          let URL = `category/?page=${page}&limit=${limit}`;
          if (search) {
            URL += `&search=${encodeURIComponent(search)}`;
          }
          return URL;
        },
        providesTags: [{ type: "Category", id: "LIST" }],
      }),

      addCategory: builder.mutation<CategoryModel, CategoryFormZod>({
        query: (newCategory) => ({
          url: "category/",
          method: "POST",
          body: newCategory,
        }),
        invalidatesTags: (result) =>
          result ? [{ type: "Category", id: result.id }] : [],
      }),
      updateCategory: builder.mutation<
        CategoryModel,
        { id: number; data: CategoryFormZod }
      >({
        query: ({ id, data }) => ({
          url: `category/${id}/`, // Assuming your API expects the category ID in the URL
          method: "PUT", // Use "PATCH" if you're only updating some fields
          body: data,
        }),
        invalidatesTags: [{ type: "Category", id: "LIST" }],
      }),
      getCategoryById: builder.query<CategoryModel, string>({
        query: (id) => `category/${id}/`, // ✅ Fetch single category
        providesTags: (_result, _error, id) => [{ type: "Category", id }],
      }),
      deleteCategory: builder.mutation<void, string>({
        query: (id) => ({
          url: `category/${id}/`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Category", id: "LIST" }],
      }),
    };
  },
});
export const {
  useGetCategoryByIdQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
