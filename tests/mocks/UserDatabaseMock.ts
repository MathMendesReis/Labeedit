import { BaseDatabase } from '../../src/database/sqlite/Database';
import { user, User } from '../../src/models/User';
import { USER_ROLES } from '../../src/services/TokenManager';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const usersMocks: user[] = [
	{
		id: 'id-mock-fulano',
		name: 'fulano',
		email: 'fulano@example.com',
		password: 'password123',
		creation_date: new Date().toISOString(),
		information_update: new Date().toISOString(),
		role: USER_ROLES.NORMAL,
		accept_terms: 'aceito',
	},
	{
		id: 'id-mock-ciclana',
		name: 'ciclana',
		email: 'ciclana@email.com',
		password: 'ciclana321',
		creation_date: new Date().toISOString(),
		information_update: new Date().toISOString(),
		role: USER_ROLES.ADMIN,
		accept_terms: 'aceito',
	},
];
export class UserDataBaseMock extends BaseDatabase {
	private static TABLES_ACCOUNTS = usersMocks;

	public foundUserByEmail = async (email: string): Promise<user> => {
		return usersMocks.filter((user) => user.email === email)[0];
	};

	public addNewUserInDB = async (newUser: user): Promise<void> => {
		usersMocks.push(newUser);
	};

	public foundUserByID = async (id: string): Promise<user> => {
		return usersMocks.filter((user) => user.id === id)[0];
	};
}
