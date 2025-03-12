import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import { AxiosError } from "axios";
import { ProductModel } from "../models/ProductModel";

interface UseGetSingleProductReturn {
  singleProduct: ProductModel | null;
  singleProductLoading: boolean;
  singleProductError: string | null;
  refresh: () => Promise<void>;
}

const useGetSingleProduct = (
  singleProductId: number
): UseGetSingleProductReturn => {
  const [state, setState] = useState<
    Omit<UseGetSingleProductReturn, "refresh">
  >({
    singleProduct: null,
    singleProductLoading: true,
    singleProductError: null,
  });

  const fetchSingleProduct = useCallback(async () => {
    try {
      setState({
        singleProduct: null,
        singleProductLoading: true,
        singleProductError: null,
      });

      const response = await axiosClient.get<ProductModel>(
        `/products/${singleProductId}/`
      );

      setState({
        singleProduct: response.data,
        singleProductLoading: false,
        singleProductError: null,
      });
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        error.response?.data?.message || "Failed to fetch the singleProduct.";
      setState({
        singleProduct: null,
        singleProductLoading: false,
        singleProductError: errorMessage,
      });
    }
  }, []);

  useEffect(() => {
    fetchSingleProduct();
  }, [fetchSingleProduct]);

  return {
    ...state,
    refresh: () => fetchSingleProduct(),
  };
};

export default useGetSingleProduct;
