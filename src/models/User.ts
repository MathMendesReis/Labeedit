import { z } from 'zod';
import { USER_ROLES } from '../services/TokenManager';

export class User {
	public getId(): string {
		return this.id;
	}
	public getName(): string {
		return this.name;
	}
	public getEmail(): string {
		return this.email;
	}
	public getPassword(): string {
		return this.password;
	}
	public getCREATION_DATE(): string {
		return this.creation_date;
	}
	public getInformationUpdate(): string {
		return this.update_date;
	}
	public getRole(): USER_ROLES {
		return this.role;
	}
	public getAccept_terms(): string {
		return this.accept_terms;
	}
	constructor(
		private id: string,
		private name: string,
		private email: string,
		private password: string,
		private creation_date: string,
		private update_date: string,
		private role: USER_ROLES,
		private accept_terms: ACCEPT_TERMS
	) {}
}

export interface UserDB {
	id: string;
	name: string;
	email: string;
	password: string;
	creation_date: string;
	update_date: string;
	role: USER_ROLES;
	accept_terms: string;
}
export interface userController {
	name: string;
	email: string;
	password: string;
	accept_terms: string;
}
export interface userLogin {
	email: string;
	password: string;
}
export const userControllerSchemma = z
	.object({
		name: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(6),
		accept_terms: z.string().nonempty(),
	})
	.transform((data) => data as userController);

export const userControllerSchemmaLogin = z
	.object({
		email: z.string().email(),
		password: z.string().min(6),
	})
	.transform((data) => data as userLogin);

export enum ACCEPT_TERMS {
	accept = 'accepted',
}
