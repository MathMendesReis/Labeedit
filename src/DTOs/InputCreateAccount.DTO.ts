import { z } from 'zod';

export interface CreateAccount {
	name: string;
	email: string;
	password: string;
	accept_terms: string;
}

export const CreateAccountSchemma = z
	.object({
		name: z.string().nonempty(),
		email: z.string().email().nonempty(),
		password: z.string().nonempty(),
		accept_terms: z.string(),
	})
	.transform((data) => data as CreateAccount);
