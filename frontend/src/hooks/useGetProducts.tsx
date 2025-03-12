import { useState, useEffect } from "react";
import axios from "axios";
import axiosClient from "../axiosClient";
import toast from "react-hot-toast";
import { ProductModel } from "../models/ProductModel";

interface ProductResponseModel {
  count: number;
  next: string | null;
  previous: string | null;
  results: ProductModel[];
}

const useGetProducts = () => {
  const [data, setData] = useState<ProductResponseModel>({
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
      const response = await axiosClient.get("/products/", {
        params: params,
      });
      setData(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || "Failed to recive Reraction data"
        );
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };
  const refresh = () => {
    setParams({});
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, [params]);

  const updateSearchParams = (search: string) => {
    setParams({ search: search });
  };
  const pageNavigation = (page: number) => {
    setParams({ page: page });
  };
  return {
    products: data,
    isLoading,
    updateSearchParams,
    pageNavigation,
    refresh,
  };
};

export default useGetProducts;
