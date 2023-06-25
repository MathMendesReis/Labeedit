import { Request, Response } from 'express';
import { createPostSchemma } from '../DTOs/inputCreatePost.DTO';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import { PostBusinnes } from '../business/PostBusinnes';

export class PostController {
	constructor(private postBusinnes: PostBusinnes) {}
	createPost = async (req: Request, res: Response) => {
		try {
			const { token, contents } = createPostSchemma.parse(req.body);
			await this.postBusinnes.createNewPost(token, contents);
			res.status(200).send({ message: 'create new post sucessulf' });
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
			const result = await this.postBusinnes.getAllPosts();
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
	deletePost = async (req: Request, res: Response) => {
		return 'ola mundo';
	};
	updatePost = async (req: Request, res: Response) => {
		return 'ola mundo';
	};
}
