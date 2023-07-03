import { Request, Response } from 'express';
import { UserBusines } from '../business/UserBusines';
import { inputLoginSchema } from '../DTOs/InputLogin.DTO';
import { ZodError } from 'zod';
import { BaseError } from '../error/BaseError';
import { CreateAccountSchemma } from '../DTOs/InputCreateAccount.DTO';

export class UserController {
	constructor(private userBusines: UserBusines) {}
	public userLogin = async (req: Request, res: Response): Promise<void> => {
		try {
			const { email, password } = inputLoginSchema.parse(req.body);
			res.setHeader('Content-Type', 'application/json');
			const loginResponse = await this.userBusines.userLogin(email, password);
			res.status(200).send(loginResponse);
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
	public createAccount = async (req: Request, res: Response): Promise<void> => {
		try {
			const { name, email, password, accept_terms } =
				CreateAccountSchemma.parse(req.body);
			const accountCreationResponse = await this.userBusines.createAccount(
				name,
				email,
				password,
				accept_terms
			);
			res.setHeader('Content-Type', 'application/json');
			res.status(201).send(accountCreationResponse);
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
