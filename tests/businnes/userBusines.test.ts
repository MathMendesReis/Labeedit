import { UserBusines } from '../../src/business/UserBusines';
import { UserDataBase } from '../../src/database/UserDataBase';
import { BadRequestError } from '../../src/error/BadRequestError';
import { NotFoundError } from '../../src/error/NotFoundError';
import { HashManager } from '../../src/services/HashManager';
import { IdGenerator } from '../../src/services/IdGenerator';
import { TokenManager } from '../../src/services/TokenManager';

const userDataBaseMock = {} as UserDataBase;
const idGeneratorMock = {} as IdGenerator;
const tokenManagerMock = {} as TokenManager;
const hashManagerMock = {} as HashManager;

const userBusinessMock = new UserBusines(
	userDataBaseMock as any,
	idGeneratorMock,
	tokenManagerMock,
	hashManagerMock
) as jest.Mocked<UserBusines>;

test('Teste do método login, case de sucesso', async () => {
	const email = 'test@example.com';
	const password = 'password';
	const userDBMock = {
		email,
		password: 'hashedPassword',
	};
	userDataBaseMock.foundUserByEmail = jest.fn().mockResolvedValue(userDBMock);
	hashManagerMock.compare = jest.fn().mockResolvedValue(true);
	tokenManagerMock.createToken = jest.fn().mockReturnValue('mockedToken');

	const result = await userBusinessMock.login(email, password);

	expect(result).toEqual({ token: 'mockedToken' });
});
test('login, caso de senha incorreta', async () => {
	hashManagerMock.compare = jest.fn().mockResolvedValue(false);

	const email = 'email@test.com';
	const password = 'senha_incorreta';

	await expect(userBusinessMock.login(email, password)).rejects.toThrow(
		BadRequestError
	);
});
test('login, caso de email incorreta', async () => {
	const email = 'email@test.com';
	const password = 'senha_incorreta';

	userDataBaseMock.foundUserByEmail = jest.fn().mockResolvedValue(null);
	await expect(userBusinessMock.login(email, password)).rejects.toThrow(
		NotFoundError
	);
});

test('Teste de sucesso do método createAccount', async () => {
	const name = 'John Doe';
	const email = 'test@example.com';
	const password = 'password';
	const accept_terms = 'accepted';
	const userDBMock = null;
	userDataBaseMock.foundUserByEmail = jest.fn().mockResolvedValue(userDBMock);
	idGeneratorMock.generate = jest.fn().mockReturnValue('mockedId');
	hashManagerMock.hash = jest.fn().mockResolvedValue('hashedPassword');
	userDataBaseMock.addNewUserInDB = jest.fn();

	const result = await userBusinessMock.createAccount(
		name,
		email,
		password,
		accept_terms
	);

	expect(result).toEqual({ message: 'successful registration' });
});
test('Teste de erro do método createAccount', async () => {
	const name = 'John Doe';
	const email = 'test@example.com';
	const password = 'password';
	const accept_terms = 'accepted';
	const userDBMock = true;
	userDataBaseMock.foundUserByEmail = jest.fn().mockResolvedValue(userDBMock);
	idGeneratorMock.generate = jest.fn().mockReturnValue('mockedId');
	hashManagerMock.hash = jest.fn().mockResolvedValue('hashedPassword');
	userDataBaseMock.addNewUserInDB = jest.fn();

	await expect(
		userBusinessMock.createAccount(name, email, password, accept_terms)
	).rejects.toThrow(BadRequestError);
});
