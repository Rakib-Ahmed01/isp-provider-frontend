import { z } from 'zod';

export const createFeedbackZodSchema = z.object({
  subject: z
    .string({
      required_error: 'Subject is required',
    })
    .min(3, { message: 'Subject must be at least 3 characters' }),
  comment: z
    .string({
      required_error: 'Comment is required',
    })
    .min(10, { message: 'Comment must be at least 10 characters' }),
});

export type CreateFeedbackInput = z.infer<typeof createFeedbackZodSchema>;
