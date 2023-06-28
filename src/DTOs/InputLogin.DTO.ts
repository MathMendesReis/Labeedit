import { z } from 'zod';

export interface InputLogin {
	email: string;
	password: string;
}

export const inputLoginSchema = z
	.object({
		email: z.string().nonempty().min(1, 'Required Email'),
		password: z.string().nonempty().min(1, 'Required password'),
	})
	.transform((data) => data as InputLogin);
