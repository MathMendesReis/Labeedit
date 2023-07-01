import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import { inputLikeDislikeSchema } from '../DTOs/InputLike.DTO';
import { Like_dislike_businnes } from '../business/Like_dislike_businnes';

export class Like_dislikeController {
	constructor(private likeDislikeBusinnes: Like_dislike_businnes) {}
	public likeDislike = async (req: Request, res: Response) => {
		try {
			const data = inputLikeDislikeSchema.parse({
				authorization: req.headers.authorization,
				post_id: req.body.post_id,
				like: req.body.like,
			});
			const result = await this.likeDislikeBusinnes.addNewLike(data);
			res.status(200).send(result);
		} catch (error) {
			console.log(error);
			if (error instanceof ZodError) {
				res
					.status(400)
					.json({ error: 'Erro de validação', issues: error.issues });
			} else if (error instanceof BaseError) {
				res.status(error.statusCode).json({ error: error.message });
			} else {
				res.status(500).json({ error: 'Erro inesperado', message: error });
			}
		}
	};
}
