import { ZodType, z } from 'zod';

export interface InputUpsert {
  content: string;
  token: string;
}

export const inputDTOSchemma: ZodType<InputUpsert> = z.object({
  content: z.string(),
  token: z.string().nonempty('user_id é um campo obrigatório '),
});
