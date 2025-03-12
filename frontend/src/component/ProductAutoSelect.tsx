import React, { useState, useEffect } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import useGetProducts from "../hooks/useGetProducts";
import { ProductModel } from "../models/ProductModel";

const ProductAutoSelect = ({
  value,
  onSelect,
  onReset,
}: {
  value: ProductModel | null;
  onSelect: (product: ProductModel) => void;
  onReset: () => void;
}) => {
  const { products, isLoading, updateSearchParams } = useGetProducts();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      updateSearchParams(search);
    }, 500); // Debounce API calls

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <Autocomplete
      size="small"
      fullWidth
      options={products.results}
      getOptionLabel={(option) => option.name}
      loading={isLoading}
      value={value} // Controlled value
      onChange={(_, newValue) => (newValue ? onSelect(newValue) : onReset())} // Reset on clear
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Product"
          variant="outlined"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

export default ProductAutoSelect;
