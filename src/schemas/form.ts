import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(4, "Name is required"),
  description: z.string().optional(),
});

export type FormSchema = z.infer<typeof formSchema>;
