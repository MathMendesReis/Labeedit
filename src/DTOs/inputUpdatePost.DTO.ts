import { ZodType, z } from 'zod';

export interface InputUpdatePost {
  post_id: string;
  content?: string;
}

export const InputUpdatePostSchema:ZodType<InputUpdatePost> = z.object({
  post_id: z.string().nonempty('O campo "id" é obrigatório.'),
  content: z.string().optional(),
});
