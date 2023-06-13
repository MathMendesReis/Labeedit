import { ZodType, z } from 'zod';

export interface InputSingUp {
  name:string,
  email:string,
  password:string
}

export const InputSingUpSchema: ZodType<InputSingUp> = z.object({
  name:z.string().nonempty(),
  email: z.string().email().nonempty(),
  password: z.string(),
}).refine(value => value.email && value.password, {
  message: 'Email and password are required.',
});
