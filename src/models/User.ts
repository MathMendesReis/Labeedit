import { USER_ROLES } from '../services/TokenManager';

export class User {
	constructor(
		private id: string,
		private name: string,
		private email: string,
		private password: string,
		private creation_date: string,
		private information_update: string,
		private role: USER_ROLES,
		private accept_terms: string
	) {}
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
		return this.information_update;
	}
	public getRole(): USER_ROLES {
		return this.role;
	}
	public getAccept_terms(): string {
		return this.accept_terms;
	}
}

export interface user {
	id: string;
	name: string;
	email: string;
	password: string;
	creation_date: string;
	information_update: string;
	role: USER_ROLES;
	accept_terms: string;
}
