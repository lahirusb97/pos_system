import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../baseAuthRtk";

import { PaginatedResponse } from "../models/PaginatedResponse";
import { Repair, RepairResponse } from "../models/Repair";
import { RepairFormZod } from "../schema/schemarepair";

export const repairApiSlice = createApi({
  reducerPath: "Repair",
  baseQuery: baseQuery,
  tagTypes: ["Repairs"],
  endpoints: (builder) => {
    return {
      getRepairs: builder.query<
        PaginatedResponse<RepairResponse>,
        { page: number; limit: number; search?: string }
      >({
        query: ({ page, limit, search }) => {
          let URL = `repairs_list/?page=${page}&limit=${limit}`;
          if (search) {
            URL += `&search=${encodeURIComponent(search)}`;
          }
          return URL;
        },
        providesTags: [{ type: "Repairs", id: "LIST" }],
      }),

      addRepairPayment: builder.mutation<Repair, RepairFormZod>({
        query: (newPayment) => ({
          url: "repairs/payment/",
          method: "POST",
          body: newPayment,
        }),
        invalidatesTags: [{ type: "Repairs", id: "LIST" }],
      }),
      addRepair: builder.mutation<Repair, RepairFormZod>({
        query: (newProduct) => ({
          url: "repairs/",
          method: "POST",
          body: newProduct,
        }),
        invalidatesTags: [{ type: "Repairs", id: "LIST" }],
      }),
      updateRepair: builder.mutation<
        Repair,
        { id: number; data: RepairFormZod }
      >({
        query: ({ id, data }) => ({
          url: `repair/${id}/`, // Assuming your API expects the product ID in the URL
          method: "PATCH", // Use "PATCH" if you're only updating some fields
          body: data,
        }),
      }),
      deleteRepair: builder.mutation<void, number>({
        query: (id) => ({
          url: `repair/${id}/`,
          method: "DELETE",
        }),
        invalidatesTags: [{ type: "Repairs", id: "LIST" }],
      }),
      getRepair: builder.query<RepairResponse, number>({
        query: (id) => `repair/${id}/`,
        providesTags: (result, error, id) => [{ type: "Repairs", id }],
      }),
    };
  },
});
export const {
  useGetRepairsQuery,
  useAddRepairMutation,
  useUpdateRepairMutation,
  useDeleteRepairMutation,
  useGetRepairQuery,
  useAddRepairPaymentMutation,
} = repairApiSlice;
