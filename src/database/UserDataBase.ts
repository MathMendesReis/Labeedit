import { user } from '../models/User';
import { BaseDatabase } from './sqlite/Database';

export class UserDataBase extends BaseDatabase {
	private static TABLES_ACCOUNTS = 'users';

	public foundUserByEmail = async (email: string): Promise<user> => {
		const result = (
			await BaseDatabase.connection(UserDataBase.TABLES_ACCOUNTS).where({
				email,
			})
		)[0];
		return result;
	};

	public addNewUserInDB = async (newUser: user): Promise<void> => {
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
