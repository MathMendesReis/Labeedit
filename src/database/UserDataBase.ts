import { User, user } from '../models/User';
import { BaseDatabase } from './sqlite/Database';

export class UserDataBase extends BaseDatabase {
	private static TABLES_ACCOUNTS = 'users';

	// public userLogin = async () => {};
	public foundUserByEmail = async (email: string): Promise<user> => {
		//devolve uma array com usuario que tenha o email igual ao do parametro
		const result = (
			await BaseDatabase.connection(UserDataBase.TABLES_ACCOUNTS).where({
				email,
			})
		)[0];
		return result;
	};

	public addNewUserInDB = async (newUser: User): Promise<void> => {
		await BaseDatabase.connection(UserDataBase.TABLES_ACCOUNTS).insert(newUser);
	};

	public foundUserByID = async (id: string): Promise<user> => {
		return (
			await BaseDatabase.connection(UserDataBase.TABLES_ACCOUNTS).where({
				id,
			})
		)[0];
	};
}
