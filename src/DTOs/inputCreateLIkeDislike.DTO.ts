import { ZodType, z } from 'zod';

export interface InputLikeDislike {
  token: string;
  post_id: string;
  type: number;
}

export const inputLikeDislikeSchemma: ZodType<InputLikeDislike> = z.object({
  token: z
    .string()
    .nonempty('O campo user_id é obrigatório e não pode estar vazio.'),
  post_id: z
    .string()
    .nonempty('O campo user_id é obrigatório e não pode estar vazio.'),
  type: z
    .number()
    .nonnegative()
    .refine((value) => value === 0 || value === 1, {
      message: 'O campo type deve ser igual a 0 ou 1.',
    }),
});
