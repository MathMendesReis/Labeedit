import { ZodType, z } from 'zod';

export interface InputDelete {
  id:string,
}

export const InputSingUpSchema: ZodType<InputDelete> = z.object({
  id:z.string().nonempty(),
}).refine(value => value.id,{
  message: 'id are required.',
});
