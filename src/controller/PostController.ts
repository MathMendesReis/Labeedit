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

export class PostController {
	constructor(private postBusinnes: PostBusinnes) {}

	public insertPost = async (req: Request, res: Response) => {
		try {
			const { authorization, contents } = inputPostSchemma.parse({
				authorization: req.headers.authorization,
				contents: req.body.contents,
			});
			const response = await this.postBusinnes.insertPost(
				authorization,
				contents
			);
			res.status(201).send(response);
		} catch (error) {
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
	public getAllPosts = async (req: Request, res: Response) => {
		try {
			const { authorization } = inputGetAllPostSchemma.parse({
				authorization: req.headers.authorization,
			});

			const response = await this.postBusinnes.getAllPosts(authorization);
			res.status(201).send(response);
		} catch (error) {
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
	public findPostById = async (req: Request, res: Response) => {
		try {
			const { authorization, id } = inputFindPostByIdSchemma.parse({
				authorization: req.headers.authorization,
				id: req.params.id,
			});

			const response = await this.postBusinnes.findPostById(authorization, id);
			res.status(201).send(response);
		} catch (error) {
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
	public addLikeDislike = async (req: Request, res: Response) => {
		try {
			const { authorization, id, like } = inputLikeSchemma.parse({
				authorization: req.headers.authorization,
				id: req.params.id,
				like: req.body.like,
			});

			const response = await this.postBusinnes.addLikeDislike(
				authorization,
				id,
				like
			);
			res.status(200).send(response);
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
