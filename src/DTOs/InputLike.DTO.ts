import { z } from 'zod';

export interface InputLikeDislike {
	token: string;
	post_id: string;
	like: number;
}

export const inputLikeDislikeSchema = z
	.object({
		token: z.string().nonempty(),
		post_id: z.string().nonempty(),
		like: z.number(),
	})
	.transform((data) => data as InputLikeDislike);
