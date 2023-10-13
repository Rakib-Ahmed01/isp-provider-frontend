import { validateEmail } from '@/utils/validate-email';
import z from 'zod';

export const registerUserZodSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
    invalid_type_error: 'Name must be string',
  }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be string',
    })
    .min(6, 'Password must be at least 6 characters long'),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be string',
    })
    .refine(validateEmail, 'Please provide a valid email'),
  // profileImg: z.string({
  //   required_error: 'Profile image is required',
  //   invalid_type_error: 'Profile image must be string',
  // }),
});

export type RegisterUserType = z.infer<typeof registerUserZodSchema>;

export const loginUserZodSchema = z.object({
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be string',
    })
    .min(6, 'Password must be at least 6 characters long'),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be string',
    })
    .refine(validateEmail, 'Please provide a valid email'),
});

export type LoginUserType = z.infer<typeof loginUserZodSchema>;
