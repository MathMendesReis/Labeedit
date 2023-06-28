import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import { inputLikeDislikeComentsSchema } from '../DTOs/InputLikeComents.DTO';
import { LikeDislikeComentsBusinnes } from '../business/LikeDislikeComentsBusinnes';

export class LikeDislikeComentsController {
	constructor(private likeDislikeComentsBusinnes: LikeDislikeComentsBusinnes) {}
	public likeDislike = async (req: Request, res: Response) => {
		try {
			const data = inputLikeDislikeComentsSchema.parse(req.body);
			await this.likeDislikeComentsBusinnes.addNewLike(data);
			res.status(200).send({ message: 'create like sucessuful' });
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
