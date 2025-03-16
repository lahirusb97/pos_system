import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFromLocalStorage } from "./util/authDataConver";

// Helper function to get the token from localStorage

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
// Base query with Authorization header

export const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,

  prepareHeaders: (headers) => {
    const token = getFromLocalStorage()?.token;
    if (token) {
      headers.set("Authorization", `Token ${token}`);
    }
    return headers;
  },
});
