import { z } from 'zod';

export interface CreateAccount {
	name: string;
	email: string;
	password: string;
	accept_terms: string;
}

export const CreateAccountSchemma = z
	.object({
		name: z.string().nonempty('o campo name não pode ser vazio').min(3),
		email: z
			.string()
			.email('insira um email valido')
			.nonempty('o campo email não pode ser vazio'),
		password: z.string().nonempty('o campo senha não pode ser vazio'),
		accept_terms: z.string().nonempty('Você precisa aceitar os termos.'),
	})
	.transform((data) => data as CreateAccount);
