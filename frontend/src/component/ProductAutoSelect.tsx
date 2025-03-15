import React, { useState, useCallback, ChangeEvent } from "react";
import { Autocomplete, TextField, CircularProgress } from "@mui/material";
import { ProductModel } from "../models/ProductModel";
import { useGetProductQuery } from "../apislice/productApiSlice";
import { debounce } from "lodash";

const ProductAutoSelect = ({
  value,
  onSelect,
  onReset,
}: {
  value: ProductModel | null;
  onSelect: (product: ProductModel) => void;
  onReset: () => void;
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const { data: products, isLoading } = useGetProductQuery({
    page: 1,
    limit: 10,
    search: debouncedSearch,
  });

  const handleSearchDebounce = useCallback(
    debounce((query: string) => {
      setDebouncedSearch(query);
    }, 500), // 500ms delay
    []
  );
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    handleSearchDebounce(e.target.value);
  };
  console.log(value);

  return (
    <Autocomplete
      size="small"
      fullWidth
      options={products?.results || []}
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
          onChange={handleSearchChange}
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
