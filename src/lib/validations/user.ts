import { z } from 'zod';
import { registerUserZodSchema } from './auth-validators';

export const updateUserZodSchema = registerUserZodSchema.partial();
export type UpdateUserType = z.infer<typeof updateUserZodSchema>;
