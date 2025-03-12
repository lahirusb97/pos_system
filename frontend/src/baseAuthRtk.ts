import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Store access token in memory (not localStorage)
let accessToken: null | string = null;

// Base query to attach the token
const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000/api/",
  credentials: "include", // Ensures cookies (refreshToken) are sent
  prepareHeaders: (headers) => {
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

// Base query with automatic token refresh
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(accessToken);

  // If the request fails with 401, attempt token refresh
  if (result.error && result.error.status === 401) {
    try {
      // Refresh token request (refresh token is sent automatically via cookies)
      const refreshResult = await baseQuery(
        { url: "auth/refresh/", method: "POST" },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        // Store new access token in memory
        accessToken = refreshResult.data?.accessToken;

        // Retry the original request with the new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("Refresh token expired, logging out...");
        accessToken = null;
        api.dispatch({ type: "auth/logout" }); // Optional: Dispatch logout action
        window.location.href = "/login"; // Redirect to login
      }
    } catch (err) {
      console.error("Error refreshing token:", err);
      accessToken = null;
      window.location.href = "/login"; // Redirect to login
    }
  }

  return result;
};
