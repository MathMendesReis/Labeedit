import { ZodType, z } from 'zod';

export interface InputUpdatePost {
  token: string;
  content?: string;
}

export const InputUpdatePostSchema: ZodType<InputUpdatePost> = z.object({
  token: z.string().nonempty('O campo "token" é obrigatório.'),
  content: z.string().optional(),
});
