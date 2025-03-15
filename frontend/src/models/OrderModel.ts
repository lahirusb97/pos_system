import { CustomerModel } from "./CustomerModel";

export type PaymentModel = {
  id: number;
  amount: number;
  created_at: string; // Date string from backend
  order: number;
};

export type OrderItemModel = {
  id: number;
  order: number;
  product: number;
  product_name: number;
  quantity: number;
  price: string; // Date string from backend
};

export type OrderModel = {
  id: number;
  customer: CustomerModel;
  total: number;
  status: string;
  discount: number;
  items: OrderItemModel[]; // Define a specific type if you have item details
  payments: PaymentModel[];
  balance: number;
  cost: number;
  created_at: Date;
  sub_total: number;
};
