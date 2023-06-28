import { z } from 'zod';

export interface inputComents {
	id: string;
	token: string;
	contents: string;
}

export const InputCreateComentsSchema = z
	.object({
		id: z.string(),
		token: z.string(),
		contents: z.string(),
	})
	.transform((data) => data as inputComents);
