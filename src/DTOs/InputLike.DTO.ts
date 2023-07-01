import { z } from 'zod';

export interface InputLikeDislike {
	authorization: string;
	post_id: string;
	like: number;
}

export const inputLikeDislikeSchema = z
	.object({
		authorization: z.string().nonempty(),
		post_id: z.string().nonempty(),
		like: z.number(),
	})
	.transform((data) => data as InputLikeDislike);
