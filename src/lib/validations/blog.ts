import { z } from 'zod';

export const createBlogZodSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(5, 'Title must be at least 5 characters long'),
  content: z
    .string({
      required_error: 'Content is required',
      invalid_type_error: 'Content must be a string',
    })
    .min(50, 'Content must be at least 50 characters long'),
});

export type CreateBlogType = z.infer<typeof createBlogZodSchema>;
