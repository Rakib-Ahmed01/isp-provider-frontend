import { z } from 'zod';

export const createFaqZodSchema = z.object({
  question: z
    .string({
      required_error: 'Question is required',
      invalid_type_error: 'Question must be a string',
    })
    .min(5, 'Question must be at least 5 characters long'),
  answer: z
    .string({
      required_error: 'Answer is required',
      invalid_type_error: 'Answer must be a string',
    })
    .min(5, 'Answer must be at least 5 characters long'),
});

export type CreateFaqType = z.infer<typeof createFaqZodSchema>;
