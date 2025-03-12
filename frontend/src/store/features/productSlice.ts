import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define state interface
interface ProductWithQty {
  product_id: number;
  price: number;
  quantity: number;
  name: string;
}

// Initial state
interface ProductState {
  selectedProductList: Record<number, ProductWithQty>;
}

const initialState: ProductState = {
  selectedProductList: {},
};

const productSlice = createSlice({
  name: "invoice_product_filter",
  initialState,
  reducers: {
    // Add or update product in cart
    setProduct: (state, action: PayloadAction<ProductWithQty>) => {
      const product = action.payload;
      if (state.selectedProductList[product.product_id]) {
        // If product already exists, update quantity and price
        state.selectedProductList[product.product_id].quantity += 1;
        state.selectedProductList[product.product_id].price = product.price;
      } else {
        // If new product, set initial quantity
        state.selectedProductList[product.product_id] = {
          ...product,
          quantity: 1,
        };
      }
    },

    // Remove product from cart
    removeProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      delete state.selectedProductList[productId];
    },

    // Clear all selected products
    clearProducts: (state) => {
      state.selectedProductList = {};
    },
  },
});

// Export actions
export const { setProduct, removeProduct, clearProducts } =
  productSlice.actions;

// Export reducer
export default productSlice.reducer;
