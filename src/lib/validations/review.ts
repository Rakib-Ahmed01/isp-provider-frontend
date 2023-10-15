import { z } from 'zod';

export const createReviewZodSchema = z.object({
  comment: z
    .string({
      required_error: 'Comment is required',
      invalid_type_error: 'Comment must be a string',
    })
    .min(3, 'Comment must be at least 3 characters long'),
  rating: z.string({}).refine(
    (value) => {
      return +value >= 1 && +value <= 5;
    },
    {
      message: 'Rating must be between 1 and 5',
    }
  ),
});

export type CreateReviewType = z.infer<typeof createReviewZodSchema>;
