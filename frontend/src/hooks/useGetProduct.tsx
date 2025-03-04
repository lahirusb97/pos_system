import { useState, useEffect, useCallback } from "react";
import axiosClient from "../axiosClient";
import { ProductModel } from "../models/ProductModel";

interface UseGetCoatingReturn {
  product: ProductModel[];
  productLoading: boolean;
  productError: string | null;
  refresh: () => void;
}

const useGetProduct = (): UseGetCoatingReturn => {
  const [product, setProduct] = useState<ProductModel[]>([]);
  const [productLoading, setProductLoading] = useState<boolean>(true);
  const [productError, setProductError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    setProductLoading(true);
    setProductError(null);

    try {
      const response = await axiosClient.get<ProductModel[]>("/products/");
      setProduct(response.data.results);
    } catch (err: any) {
      setProductLoading(
        err?.response?.data?.message || "Failed to fetch doctors."
      );
    } finally {
      setProductLoading(false);
    }
  }, []);

  // Automatically fetch data on mount
  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return {
    product,
    productLoading,
    productError,
    refresh: fetchProduct,
  };
};

export default useGetProduct;
