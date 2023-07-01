import { z } from 'zod';

export interface CreatePost {
	authorization: string;
	contents: string;
}

export const createPostSchemma = z
	.object({
		authorization: z
			.string()
			.nonempty('verifique se voce passou o authorization'),
		contents: z.string().nonempty(),
	})
	.transform((data) => data as CreatePost);
