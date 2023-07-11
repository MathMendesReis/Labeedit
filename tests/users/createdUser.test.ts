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

describe('Testando metodo created user', () => {
	test('Deve criar um novo usuário com sucesso', async () => {
		// Defina os parâmetros de teste
		const name = 'fulano';
		const email = 'fulano@outlook.com';
		const password = 'fulano123';
		const accept_terms = 'accepted';

		// Defina o comportamento esperado das dependências/mock
		userDataBaseMock.findEmail = jest.fn().mockResolvedValue(false);
		idGeneratorMock.generate = jest.fn().mockReturnValue('12345');
		hashManagerMock.hash = jest.fn().mockResolvedValue('hashedPassword');
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
		// Verifique o resultado esperado
		expect(output).toEqual({ message: 'created user successfully' });

		// Verifique se as funções dos mocks foram chamadas corretamente
		expect(userDataBaseMock.findEmail).toHaveBeenCalledWith(email);
		expect(idGeneratorMock.generate).toHaveBeenCalled();
		expect(hashManagerMock.hash).toHaveBeenCalledWith(password);
		expect(userDataBaseMock.insertUser).toHaveBeenCalledWith({
			id: '12345',
			name,
			email,
			password: 'hashedPassword',
			creation_date: expect.any(String),
			update_date: expect.any(String),
			role: 'NORMAL',
			accept_terms,
		});
	});
	test('deve retornar um error por que email ja e cadastrado', async () => {
		// Defina os parâmetros de teste
		const name = 'fulano';
		const email = 'fulano@outlook.com';
		const password = 'fulano123';
		const accept_terms = 'accepted';

		// Defina o comportamento esperado das dependências/mocks
		userDataBaseMock.findEmail = jest.fn().mockResolvedValue(true);

		// Verifique se ocorre um erro "BadRequestError" ao chamar a função
		await expect(async () => {
			await userBusinessMock.createdUser(name, email, password, accept_terms);
		}).rejects.toThrowError(BadRequestError);

		// Verifique se a função findEmail do mock foi chamada corretamente
		expect(userDataBaseMock.findEmail).toHaveBeenCalledWith(email);
	});
	test('deve retornar um error por que o usuario nao aceitou os termos', async () => {
		// Defina os parâmetros de teste
		const name = 'fulano';
		const email = 'fulano@outlook.com';
		const password = 'fulano123';
		const accept_terms = 'accepted';

		// Verifique se ocorre um erro "BadRequestError" ao chamar a função
		await expect(async () => {
			await userBusinessMock.createdUser(name, email, password, accept_terms);
		}).rejects.toThrowError(BadRequestError);

		// Verifique se a função findEmail do mock foi chamada corretamente
		expect(userDataBaseMock.findEmail).toHaveBeenCalledWith(email);
	});
});
