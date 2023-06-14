import { ZodType, z } from 'zod';



export interface InputUpsert {
  content:string,
  user_id:string
}


export const inputDTOSchemma:ZodType<InputUpsert> = z.object({
  content:z.string(),
  user_id:z.string().nonempty('user_id é um campo obrigatório ')
});
