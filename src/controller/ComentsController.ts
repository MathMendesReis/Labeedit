import { Request, Response } from 'express';
import { PostBusinnes } from '../business/PostBusines';
import {
	inputFindPostByIdSchemma,
	inputGetAllPostSchemma,
	inputLikeSchemma,
	inputPostSchemma,
} from '../models/Post';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import {
	inputGetComentsSchemma,
	inputNewComentSchemma,
	inputNewLikeSchemma,
} from '../models/Coments';
import { ComentsBusiness } from '../business/ComentsBusinnes';

export class ComentsController {
	constructor(private comentsBusiness: ComentsBusiness) {}

	public insertComents = async (req: Request, res: Response) => {
		try {
			const { authorization, contents, id } = inputNewComentSchemma.parse({
				authorization: req.headers.authorization,
				contents: req.body.contents,
				id: req.params.id,
			});
			const response = await this.comentsBusiness.insertComents(
				authorization,
				contents,
				id
			);
			res.status(201).send(response);
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
	public insertLike = async (req: Request, res: Response) => {
		try {
			const { authorization, id, like, post_id } = inputNewLikeSchemma.parse({
				authorization: req.headers.authorization,
				id: req.params.id,
				post_id: req.body.post_id,
				like: req.body.like,
			});
			const response = await this.comentsBusiness.addLikeDislike(
				authorization,
				id,
				post_id,
				like
			);
			res.status(201).send(response);
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
	public getComentsByPostId = async (req: Request, res: Response) => {
		try {
			const { authorization, id } = inputGetComentsSchemma.parse({
				authorization: req.headers.authorization,
				id: req.params.id,
			});
			const response = await this.comentsBusiness.getComentsByPostId(
				authorization,
				id
			);
			res.status(201).send(response);
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
