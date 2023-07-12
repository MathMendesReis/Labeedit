import { UserDB } from '../models/User';
import { BaseDatabase } from './sqlite/Database';

export class UserDataBase extends BaseDatabase {
	private static TABLES_ACCOUNTS = 'users';

	public findEmail = async (email: string): Promise<UserDB | undefined> => {
		return (
			await UserDataBase.connection(UserDataBase.TABLES_ACCOUNTS).where({
				email,
			})
		)[0];
	};
	public findUserId = async (id: string): Promise<UserDB | undefined> => {
		return (
			await UserDataBase.connection(UserDataBase.TABLES_ACCOUNTS).where({
				id,
			})
		)[0];
	};
	public getUserDB = async (email: string): Promise<UserDB | undefined> => {
		return (
			await UserDataBase.connection(UserDataBase.TABLES_ACCOUNTS).where({
				email,
			})
		)[0];
	};
	public compareUser = async (
		email: string,
		password: string
	): Promise<UserDB | undefined> => {
		return (
			await UserDataBase.connection(UserDataBase.TABLES_ACCOUNTS).where({
				email,
				password,
			})
		)[0];
	};
	public insertUser = async (user: UserDB): Promise<void> => {
		await UserDataBase.connection(UserDataBase.TABLES_ACCOUNTS).insert(user);
	};
}
