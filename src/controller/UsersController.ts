import { UserBusines } from '../business/UserBusines';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import { Request, Response } from 'express';
import {
	userControllerSchemma,
	userControllerSchemmaLogin,
} from '../models/User';

export class UserController {
	constructor(private userBusines: UserBusines) {}
	public createdUser = async (req: Request, res: Response) => {
		try {
			const { name, email, password, accept_terms } =
				userControllerSchemma.parse({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					accept_terms: req.body.accept_terms,
				});
			const response = await this.userBusines.createdUser(
				name,
				email,
				password,
				accept_terms
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
	public login = async (req: Request, res: Response) => {
		try {
			const { email, password } = userControllerSchemmaLogin.parse({
				email: req.body.email,
				password: req.body.password,
			});
			const response = await this.userBusines.login(email, password);
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
