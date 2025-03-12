import { CategoryModel } from "./CategoryModel";

export type ProductModel = {
  id: number;
  category: CategoryModel; // Assuming category is referenced by ID
  name: string;
  normal_price: number;
  max_price: number;
  qty: number;
  cost: number;
  note: string;
  created_at: string; // Date string from backend
};
