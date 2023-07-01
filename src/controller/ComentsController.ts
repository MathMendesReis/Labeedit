import { Request, Response } from 'express';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import { InputCreateComentsSchema } from '../DTOs/InputCreateComents.DTO';
import { ComentsBusiness } from '../business/ComentsBusinnes';

export class ComentsController {
	constructor(private comentsBusinnes: ComentsBusiness) {}
	public createNewComents = async (req: Request, res: Response) => {
		try {
			const data = InputCreateComentsSchema.parse({
				authorization: req.headers.authorization,
				id: req.body.id,
				contents: req.body.contents,
			});
			const result = await this.comentsBusinnes.addComentInDB(data);
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
