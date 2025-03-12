// Custom Hook: useGetProduct.ts
import { useState, useEffect } from "react";
import axios from "axios";
import axiosClient from "../axiosClient";
import toast from "react-hot-toast";
import { ProductModel } from "../models/ProductModel";

interface ProductResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductModel[];
}

const useGetProduct = () => {
  const [data, setData] = useState<ProductResponse>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [params, setParams] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosClient.get("/products/", { params });
      setData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || "Failed to retrieve products"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const updateSearchParams = (search: string) => {
    setParams({ search });
  };

  const pageNavigation = (page: number) => {
    setParams({ page });
  };

  return {
    data,
    isLoading,
    updateSearchParams,
    pageNavigation,
  };
};

export default useGetProduct;
