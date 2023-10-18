import { z } from 'zod';

export const createPlanZodSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .min(3, { message: 'Title must be at least 3 characters' }),
  price: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .or(
      z
        .string({
          required_error: 'Price is required',
          invalid_type_error: 'Price must be a number',
        })
        .refine(
          (val) => {
            return val !== '';
          },
          {
            message: 'Price is required',
          }
        )
        .refine((val) => Number(val))
    ),
  speed: z
    .number({
      required_error: 'Speed is required',
      invalid_type_error: 'Speed must be a number',
    })
    .or(
      z
        .string({
          required_error: 'Speed is required',
          invalid_type_error: 'Speed must be a number',
        })
        .refine((val) => val !== '', {
          message: 'Speed is required',
        })
        .refine((val) => Number(val))
    ),
  description: z
    .string({
      required_error: 'Description is required',
    })
    .min(10, { message: 'Description must be at least 10 characters' }),
  isAvailable: z
    .string({
      required_error: 'isAvailable is required',
    })
    .refine((val) => val === 'true' || val === 'false', {
      message: 'isAvailable must be a boolean',
    })
    .optional(),
});

export type CreatePlanType = z.infer<typeof createPlanZodSchema>;

export const updatePlanZodSchema = createPlanZodSchema.partial();
