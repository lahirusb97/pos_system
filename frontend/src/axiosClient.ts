import axios from "axios";

// Axios instance with credentials enabled
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true, // Allows browser to send cookies automatically
});

// Store the access token in memory (not localStorage)
let accessToken: null | string = null;

// Attach access token to every request
axiosClient.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors and refresh the access token
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Request new access token (refresh token is sent automatically via cookies)
        const { data } = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );

        // Store the new access token in memory
        accessToken = data.accessToken;

        // Retry the failed request with the new access token
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.error("Refresh token expired or invalid:", err);
        accessToken = null;
        window.location.href = "/login"; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
