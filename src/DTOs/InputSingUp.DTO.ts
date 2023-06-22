import { ZodType, z } from 'zod';

export interface InputSingUp {
  apelido: string;
  checkbox: string;
  email: string;
  password: string;
}

export const InputSingUpSchema: ZodType<InputSingUp> = z
  .object({
    apelido: z.string().nonempty(),
    checkbox: z.string(),
    email: z.string().email().nonempty(),
    password: z.string(),
  })
  .refine((value) => value.email && value.password, {
    message: 'Email and password are required.',
  });
