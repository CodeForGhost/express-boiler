import { z } from "zod";

export const todoInputSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    completed: z.boolean().default(false)
  })
});

export const todoUpdateSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid ID format")
  }),
  body: z.object({
    title: z.string().min(1, "Title is required").optional(),
    description: z.string().optional(),
    completed: z.boolean().optional()
  })
});
