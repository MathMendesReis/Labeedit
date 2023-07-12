import { UserBusines } from '../../src/business/UserBusines';
import { UserDataBase } from '../../src/database/UserDataBase';
import { BadRequestError } from '../../src/error/BadRequestError';
import { NotFoundError } from '../../src/error/NotFoundError';
import { User } from '../../src/models/User';
import { HashManager } from '../../src/services/HashManager';
import { IdGenerator } from '../../src/services/IdGenerator';
import { TokenManager } from '../../src/services/TokenManager';

// Crie mocks para as dependências
const userDataBaseMock = {} as UserDataBase;
const idGeneratorMock = {} as IdGenerator;
const tokenManagerMock = {} as TokenManager;
const hashManagerMock = {} as HashManager;

const userBusinessMock = new UserBusines(
	userDataBaseMock,
	idGeneratorMock,
	tokenManagerMock,
	hashManagerMock
) as jest.Mocked<UserBusines>;

describe('Testando metodo created user', () => {
	test('1-Deve criar um novo usuário com sucesso', async () => {
		const name = 'fulano';
		const email = 'fulano@outlook.com';
		const password = 'fulano123';
		const accept_terms = 'accepted';

		userDataBaseMock.findEmail = jest.fn().mockResolvedValue(undefined);
		idGeneratorMock.generate = jest.fn().mockReturnValue('12345');
		hashManagerMock.hash = jest.fn().mockResolvedValue('hash');
		tokenManagerMock.createToken = jest.fn().mockReturnValue('token');

		userDataBaseMock.insertUser = jest.fn().mockResolvedValue({
			name,
			email,
			password,
			accept_terms,
		});

		const output = await userBusinessMock.createdUser(
			name,
			email,
			password,
			accept_terms
		);
		expect(tokenManagerMock.createToken).toHaveBeenCalled();
		expect(hashManagerMock.hash).toHaveBeenCalledWith(password);

		expect(output).toEqual({ token: 'token' });
	});

	test('2 - caso de erro, usuário já tem e-mail cadastrado', async () => {
		const name = 'fulano';
		const email = 'fulano@outlook.com';
		const password = 'fulano123';
		const accept_terms = 'accepted';

		userDataBaseMock.findEmail = jest.fn().mockResolvedValue(true);

		await expect(async () => {
			await userBusinessMock.createdUser(name, email, password, accept_terms);
		}).rejects.toThrow(new NotFoundError('E-mail already registered'));
	});
	test('3 - caso de erro, usuário não aceitou os termos', async () => {
		const name = 'fulano';
		const email = 'fulano@outlook.com';
		const password = 'fulano123';
		const accept_terms = 'acc';

		userDataBaseMock.findEmail = jest.fn().mockResolvedValue(undefined);

		await expect(async () => {
			await userBusinessMock.createdUser(name, email, password, accept_terms);
		}).rejects.toThrow(new BadRequestError('User must accept the terms'));
	});
});

describe('testando login', () => {
	test('4- caso de sucesso', async () => {
		const email = 'fulano@outlook.com';
		const password = 'fulano123';
		userDataBaseMock.getUserDB = jest.fn().mockResolvedValue(true);
		hashManagerMock.compare = jest.fn().mockResolvedValue(true);
		tokenManagerMock.createToken = jest.fn().mockReturnValue('token');

		const output = await userBusinessMock.login(email, password);
		expect(output).toEqual({ token: 'token' });
	});
	test('5- caso de erro, email nao encontrado', async () => {
		const email = 'fulano@outlook.com';
		const password = 'fulano123';
		userDataBaseMock.getUserDB = jest.fn().mockResolvedValue(undefined);
		hashManagerMock.compare = jest.fn().mockResolvedValue(true);
		tokenManagerMock.createToken = jest.fn().mockReturnValue('token');

		await expect(async () => {
			await userBusinessMock.login(email, password);
		}).rejects.toThrow(new NotFoundError('Not found user'));
	});
	test('6- caso de erro, senha incorreta', async () => {
		const email = 'fulano@outlook.com';
		const password = 'fulano123';
		userDataBaseMock.getUserDB = jest.fn().mockResolvedValue(true);
		hashManagerMock.compare = jest.fn().mockResolvedValue(false);

		await expect(async () => {
			await userBusinessMock.login(email, password);
		}).rejects.toThrow(new BadRequestError('Invalid password'));
	});
});
