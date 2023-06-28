import { z } from 'zod';

export interface CreatePost {
	token: string;
	contents: string;
}

export const createPostSchemma = z
	.object({
		token: z.string().nonempty(),
		contents: z.string().nonempty(),
	})
	.transform((data) => data as CreatePost);
