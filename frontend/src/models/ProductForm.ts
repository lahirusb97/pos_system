interface ProductForm {
  category: number | null;
  name: string;
  normal_price: number | null;
  max_price: number | null;
  cost: number | null;
  qty: number | null;
  note: string;
}
export type { ProductForm };
import { invoiceFormZod } from "../schema/schemaInvoice";

// Define the new type by extending invoiceFormZod
export type InvoiceWithProducts = invoiceFormZod & {
  products: {
    product_id: number;
    quantity: number;
    price: number;
  }[];
};
