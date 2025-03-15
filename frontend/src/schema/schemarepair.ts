import { z } from "zod";

const repairSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().regex(/^0\d{9}$/, "Invalid mobile number"), // Assumes 10-digit mobile starting with 0
  repair_issue: z.string().min(3, "Repair issue must be at least 3 characters"),
  note: z.string().optional(),
  cost: z.number().min(0, "Cost must be positive"),
  total_price: z.number().min(0, "Total price must be positive"),
  payment_amount: z.number().min(0, "Payment cannot be negative").optional(),
  status: z.string().default("pending"), // ✅ Status defaults to "pending"
});
export type RepairFormZod = z.infer<typeof repairSchema>;
export default repairSchema;
