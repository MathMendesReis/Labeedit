import { z } from 'zod';

export interface InputLikeDislikeComents {
	token: string;
	coments_id: string;
	like: number;
}

export const inputLikeDislikeComentsSchema = z
	.object({
		token: z.string().nonempty(),
		coments_id: z.string().nonempty(),
		like: z.number(),
	})
	.transform((data) => data as InputLikeDislikeComents);
