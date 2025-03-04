import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";

interface Category {
  id: number;
  name: string;
}

interface UseGetCoatingReturn {
  category: Category[];
  categoryLoading: boolean;
  categoryError: string | null;
  refresh: () => void;
}

const useGetCategory = (): UseGetCoatingReturn => {
  const [category, setCategory] = useState<Category[]>([]);
  const [categoryLoading, setCategoryLoading] = useState<boolean>(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  const fetchCategory = useCallback(async () => {
    setCategoryLoading(true);
    setCategoryError(null);

    try {
      const response = await axiosClient.get<Category[]>("/category/");
      setCategory(response.data);
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
