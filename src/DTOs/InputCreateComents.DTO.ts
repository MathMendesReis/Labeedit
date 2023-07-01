import { z } from 'zod';

export interface inputComents {
	id: string;
	authorization: string;
	contents: string;
}

export const InputCreateComentsSchema = z
	.object({
		id: z.string(),
		authorization: z.string(),
		contents: z.string(),
	})
	.transform((data) => data as inputComents);
