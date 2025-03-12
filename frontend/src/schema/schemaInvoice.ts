import { z } from "zod";

export const schemaInvoice = z.object({
  customer_name: z.string().min(1, "Customer Name is Required"),
  mobile: z.string().min(1, "Mobile Number is Required"),
  payment_amount: z.number({
    invalid_type_error: "Payment Amount is Required",
  }),
  discount: z.number({ invalid_type_error: "Discount is Required" }),
});

export type invoiceFormZod = z.infer<typeof schemaInvoice>;
export default schemaInvoice;
