import { UserBusines } from '../../src/business/UserBusines';
import { UserDataBase } from '../../src/database/UserDataBase';
import { BadRequestError } from '../../src/error/BadRequestError';
import { NotFoundError } from '../../src/error/NotFoundError';
import { HashManager } from '../../src/services/HashManager';
import { IdGenerator } from '../../src/services/IdGenerator';
import { TokenManager } from '../../src/services/TokenManager';

// Crie mocks para as dependências
const userDataBaseMock = {} as UserDataBase;
const idGeneratorMock = {} as IdGenerator;
const tokenManagerMock = {} as TokenManager;
const hashManagerMock = {} as HashManager;

// Crie uma instância do UserBusines usando os mocks
const userBusinessMock = new UserBusines(
	userDataBaseMock,
	idGeneratorMock,
	tokenManagerMock,
	hashManagerMock
) as jest.Mocked<UserBusines>;

describe('Testando metodo login', () => {
	test('Deve retornar o token, caso de sucesso', async () => {
		// Defina os parâmetros de teste
		const email = 'fulano@outlook.com';
		const password = 'fulano123';

		// Defina o comportamento esperado das dependências/mocks
		const userDB = {
			id: '123',
			email,
			password: 'hashedPassword', // Substitua pelo hash correto da senha
			role: 'NORMAL',
		};
		userDataBaseMock.getUserDB = jest.fn().mockResolvedValue(userDB);
		hashManagerMock.compare = jest.fn().mockResolvedValue(true);
		tokenManagerMock.createToken = jest.fn().mockResolvedValue('token');

		const output = await userBusinessMock.login(email, password);

		// Verifique o resultado esperado
		expect(await output.token).toEqual('token');

		// Verifique se as funções dos mocks foram chamadas corretamente
		expect(userDataBaseMock.getUserDB).toHaveBeenCalledWith(email, password);
		expect(hashManagerMock.compare).toHaveBeenCalledWith(
			password,
			userDB.password
		);
		expect(tokenManagerMock.createToken).toHaveBeenCalledWith({
			id: userDB.id,
			role: userDB.role,
		});
	});
	test('caso de erro, senha errada', async () => {
		// Defina os parâmetros de teste
		const email = 'fulano@outlook.com';
		const password = 'fulano123';

		// Defina o comportamento esperado das dependências/mocks
		const userDB = {
			id: '123',
			email,
			password: 'hashedPassword', // Substitua pelo hash correto da senha
			role: 'NORMAL',
		};
		userDataBaseMock.getUserDB = jest.fn().mockResolvedValue(userDB);
		hashManagerMock.compare = jest.fn().mockResolvedValue(false);
		tokenManagerMock.createToken = jest.fn().mockResolvedValue('token');

		// Verifique o resultado esperado
		await expect(async () => {
			await userBusinessMock.login(email, password);
		}).rejects.toThrowError(BadRequestError);
	});
	test('caso de erro, email errado', async () => {
		// Defina os parâmetros de teste
		const email = 'fulano@outlook.com';
		const password = 'fulano123';
		userDataBaseMock.getUserDB = jest.fn().mockResolvedValue(false);
		hashManagerMock.compare = jest.fn().mockResolvedValue(true);
		tokenManagerMock.createToken = jest.fn().mockResolvedValue('token');

		// Verifique o resultado esperado
		await expect(async () => {
			await userBusinessMock.login(email, password);
		}).rejects.toThrowError(NotFoundError);
	});
});
