import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import { CategoryModel } from "../models/CategoryModel";

interface UseGetCoatingReturn {
  category: CategoryModel[];
  categoryLoading: boolean;
  categoryError: string | null;
  refresh: () => void;
}

const useGetCategory = (): UseGetCoatingReturn => {
  const [category, setCategory] = useState<CategoryModel[]>([]);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    setCategoryLoading(true);
    setCategoryError(null);

    try {
      const response = await axiosClient.get("/category/");
      setCategory(response.data.results);
    } catch (err: any) {
      setCategoryLoading(
        err?.response?.data?.message || "Failed to fetch doctors."
      );
    } finally {
      setCategoryLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  return {
    category,
    categoryLoading,
    categoryError,
    refresh: fetchCategory,
  };
};

export default useGetCategory;
