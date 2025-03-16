import { z } from "zod";

// Zod version of the Category schema
export const schemaCategory = z.object({
  name: z.string().min(1, "Category name is required"),
});

export type CategoryFormZod = z.infer<typeof schemaCategory>;
export default schemaCategory;
