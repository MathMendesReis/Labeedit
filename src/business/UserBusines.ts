import { createdUserOutput } from '../Dtos/users/createdUser.dto';
import { token } from '../Dtos/users/login.dto';
import { UserDataBase } from '../database/UserDataBase';
import { BadRequestError } from '../error/BadRequestError';
import { NotFoundError } from '../error/NotFoundError';
import { ACCEPT_TERMS, User, userDB } from '../models/User';
import { HashManager } from '../services/HashManager';
import { IdGenerator } from '../services/IdGenerator';
import {
	TokenManager,
	TokenPayload,
	USER_ROLES,
} from '../services/TokenManager';

export class UserBusines {
	constructor(
		private userDataBase: UserDataBase,
		private idGenerator: IdGenerator,
		private tokenManager: TokenManager,
		private hashManager: HashManager
	) {}
	public createdUser = async (
		name: string,
		email: string,
		password: string,
		accept_terms: string
	) => {
		// Verificar se o email ja esta cadastrado
		const isEmail = await this.userDataBase.findEmail(email);
		if (isEmail) throw new BadRequestError('E-mail already registred');
		// Verificar se o user aceitou os termos
		if (accept_terms !== 'accepted')
			throw new BadRequestError('User must accept the terms');
		// Criar id
		const id = this.idGenerator.generate();

		// hash da senha
		const hash = await this.hashManager.hash(password);
		// Criar um novo User
		const newUser = new User(
			id,
			name,
			email,
			hash,
			new Date().toString(),
			new Date().toString(),
			USER_ROLES.NORMAL,
			ACCEPT_TERMS.accept
		);
		const user: userDB = {
			id: newUser.getId(),
			name: newUser.getName(),
			email: newUser.getEmail(),
			password: newUser.getPassword(),
			creation_date: newUser.getCREATION_DATE(),
			update_date: newUser.getInformationUpdate(),
			role: newUser.getRole(),
			accept_terms: newUser.getAccept_terms(),
		};
		// Salvar no banco de dados
		await this.userDataBase.insertUser(user);
		// Retornar a resposta de sucesso
		const output: createdUserOutput = {
			message: 'created user successfully',
		};
		return output;
	};

	public login = async (email: string, password: string): Promise<token> => {
		const userDB = await this.userDataBase.getUserDB(email);
		if (!userDB) {
			throw new NotFoundError('Not found user');
		}
		const hash = await this.hashManager.compare(password, userDB?.password);
		if (!hash) {
			throw new BadRequestError('Invalid password');
		}
		const payload: TokenPayload = {
			id: userDB.id,
			role: userDB.role,
		};

		const token = this.tokenManager.createToken(payload);

		return {
			token,
		};
	};
}
