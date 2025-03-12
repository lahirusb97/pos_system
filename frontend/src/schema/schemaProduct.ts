import { z } from "zod";

export const schemaProduct = z.object({
  category: z.number(),
  name: z.string().min(1, "Product Name is Required"),
  normal_price: z.number({ invalid_type_error: "Normal Price is Required" }),
  max_price: z.number({ invalid_type_error: "Max Price is Required" }),
  cost: z.number({ invalid_type_error: "Cost is Required" }),
  qty: z.number({ invalid_type_error: "Quantity is Required" }),
  note: z.string().optional(),
});

export type ProductFormZod = z.infer<typeof schemaProduct>;
export default schemaProduct;
