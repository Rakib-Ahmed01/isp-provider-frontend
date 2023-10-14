import { validateEmail } from '@/utils/validate-email';
import z from 'zod';

const MAX_FILE_SIZE = 1024 * 1024 * 1;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const registerUserZodSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be string',
    })
    .min(1, 'Name must be at least 1 character long'),
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
  profileImg: z
    .custom<File>((val) => val instanceof File, 'Please upload an image')
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: 'Please choose an image file',
    })
    .refine(
      (file) => {
        return file.size < MAX_FILE_SIZE;
      },
      {
        message: 'Please choose a file smaller than 1MB',
      }
    ),
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
