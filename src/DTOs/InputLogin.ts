import { ZodType, z } from 'zod';

export interface Input {
  email: string;
  password: string;
}

export const InputSchema: ZodType<Input> = z
  .object({
    email: z.string().email().nonempty(),
    password: z.string(),
  })
  .refine((value) => value.email && value.password, {
    message: 'Email and password are required.',
  });
