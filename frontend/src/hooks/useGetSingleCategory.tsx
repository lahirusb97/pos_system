import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import { AxiosError } from "axios";
import { CategoryModel } from "../models/CategoryModel";

interface UseGetSingleCategoryReturn {
  singleCategory: CategoryModel | null;
  singleCategoryLoading: boolean;
  singleCategoryError: string | null;
  refresh: () => Promise<void>;
}

const useGetSingleCategory = (
  singleCategoryId: number
): UseGetSingleCategoryReturn => {
  const [state, setState] = useState<
    Omit<UseGetSingleCategoryReturn, "refresh">
  >({
    singleCategory: null,
    singleCategoryLoading: true,
    singleCategoryError: null,
  });

  const fetchSingleCategory = useCallback(async () => {
    try {
      setState({
        singleCategory: null,
        singleCategoryLoading: true,
        singleCategoryError: null,
      });

      const response = await axiosClient.get<CategoryModel>(
        `/category/${singleCategoryId}/`
      );

      setState({
        singleCategory: response.data,
        singleCategoryLoading: false,
        singleCategoryError: null,
      });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        error.response?.data?.error || "Failed to fetch the singleCategory.";
      setState({
        singleCategory: null,
        singleCategoryLoading: false,
        singleCategoryError: errorMessage,
      });
    }
  }, []);

  useEffect(() => {
    fetchSingleCategory();
  }, [fetchSingleCategory]);

  return {
    ...state,
    refresh: () => fetchSingleCategory(),
  };
};

export default useGetSingleCategory;
