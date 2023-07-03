import { UserBusines } from '../../src/business/UserBusines';
import { BadRequestError } from '../../src/error/BadRequestError';
import { NotFoundError } from '../../src/error/NotFoundError';
import { HashManagerMock } from '../mocks/HashManagerMock';
import { IdGeneratorMock } from '../mocks/IdGeneratorMock';
import { TokenManagerMock } from '../mocks/TokenManagerMock';
import { UserDataBaseMock } from '../mocks/UserDatabaseMock';

describe('Testando userLogin', () => {
	const userBusines = new UserBusines(
		new UserDataBaseMock(),
		new IdGeneratorMock(),
		new TokenManagerMock(),
		new HashManagerMock()
	);

	test('deve retornar token válido ao fazer login com email e senha corretos', async () => {
		const email = 'fulano@example.com';
		const password = 'password123';

		const output = await userBusines.userLogin(email, password);

		expect(output).toHaveProperty('token');
		expect(typeof output.token).toBe('string');
	});

	test('deve lançar um erro NotFoundError ao fazer login com um email não existente', async () => {
		const email = 'email_inexistente@example.com';
		const password = 'password123';

		await expect(userBusines.userLogin(email, password)).rejects.toThrow(
			NotFoundError
		);
		await expect(userBusines.userLogin(email, password)).rejects.toThrow(
			'Not found Email'
		);
	});

	test('deve lançar um erro BadRequestError ao fazer login com um email existente, mas senha incorreta', async () => {
		const email = 'fulano@example.com';
		const password = 'senha_incorreta';

		await expect(userBusines.userLogin(email, password)).rejects.toThrow(
			BadRequestError
		);
		await expect(userBusines.userLogin(email, password)).rejects.toThrow(
			'\'email\' ou \'password\' incorretos'
		);
	});
});
