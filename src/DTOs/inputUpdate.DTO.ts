import { ZodType, z } from 'zod';

export interface InputUpdate {
  id: string;
  apelido?: string;
  email?: string;
}

export const InputUpdateSchema: ZodType<InputUpdate> = z.object({
  id: z.string().nonempty('O campo "id" é obrigatório.'),
  apelido: z.string().optional(),
  email: z.string().email('Insira um e-mail válido.').optional(),
});
