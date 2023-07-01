import { Request, Response } from 'express';
import { createPostSchemma } from '../DTOs/inputCreatePost.DTO';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import { PostBusinnes } from '../business/PostBusinnes';

export class PostController {
	constructor(private postBusinnes: PostBusinnes) {}
	createPost = async (req: Request, res: Response) => {
		try {
			const input = createPostSchemma.parse({
				authorization: req.headers.authorization,
				contents: req.body.contents,
			});
			await this.postBusinnes.createNewPost(input);
			res.status(201).send({ message: 'Create post sucessul' });
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
	getAllPost = async (req: Request, res: Response) => {
		try {
			const authorization = req.headers.authorization as string;
			const { id } = req.params;
			const result = await this.postBusinnes.getAllPosts(authorization, id);
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
	findPostById = async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const result = await this.postBusinnes.findPostById(id);
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
