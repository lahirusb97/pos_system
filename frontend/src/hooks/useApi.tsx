import { useState } from "react";
import axiosClient,  from "../axiosClient";
import { extractErrorMessage } from "../util/extractErrorMessage";
import { AxiosRequestConfig } from "axios";

type ApiResponse<T = any> = {
  data: T | null;
  error: Error | null;
  loading: boolean;
};

type ApiRequestConfig<T> = {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: T;
  config?: AxiosRequestConfig<T>; // Optional request config (headers, etc.)
};

export const useApi = <T = any>() => {
  const [apiState, setApiState] = useState<ApiResponse<T>>({
    loading: false,
    error: null,
    data: null,
  });

  const makeRequest = async ({ method, url, data, config }: ApiRequestConfig<T>) => {
    setApiState({ loading: true, error: null, data: null });

    try {
      const response = await axiosClient.request<T>({
        method,
        url,
        data,
        ...config, // Spread additional Axios options if provided
      });

      setApiState({ loading: false, data: response.data, error: null });
      return response.data as T;
    } catch (error) {
      const message = extractErrorMessage(error);
      setApiState({ loading: false, error: new Error(message), data: null });
      throw new Error(message);
    }
  };

  return {
    loading: apiState.loading,
    data: apiState.data,
    error: apiState.error,
    makeRequest,
  };
};
