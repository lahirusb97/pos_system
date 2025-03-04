import axios from "axios";

// Axios instance
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  withCredentials: true, // Ensures cookies (refreshToken) are sent
});

// Function to get the access token
const getAccessToken = () => localStorage.getItem("accessToken");

// Attach access token to every request
axiosClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle 401 errors (expired access token)
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Request new access token
        const { data } = await axios.post(
          "/auth/refresh",
          {},
          { withCredentials: true }
        );

        // Store new access token
        localStorage.setItem("accessToken", data.accessToken);

        // Retry the failed request
        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        console.error("Refresh token expired:", err);
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
