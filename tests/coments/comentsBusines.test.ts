import { ComentsBusiness } from '../../src/business/ComentsBusinnes';
import { TokenManager } from '../../src/services/TokenManager';
import { UserDataBase } from '../../src/database/UserDataBase';
import { IdGenerator } from '../../src/services/IdGenerator';
import { ComentDataBase } from '../../src/database/ComentsDataBase';
import { Comment } from '../../src/models/Coments';

// Criar mocks
const tokenManagerMock = {} as TokenManager;
const userDataBaseMock = {} as UserDataBase;
const idGeneratorMock = {} as IdGenerator;
const comentDataBaseMock = {} as ComentDataBase;

const comentsBusinessMock = new ComentsBusiness(
	tokenManagerMock,
	userDataBaseMock,
	idGeneratorMock,
	comentDataBaseMock
) as jest.Mocked<ComentsBusiness>;

describe('Testando ComentsBusiness', () => {
	describe('insertComents', () => {
		test('Deve inserir um novo comentário', async () => {
			const authorization = 'token de autorização válido';
			const contents = 'conteúdo do comentário';
			const postId = 'id do post';

			// Simulando o que deveria ser retornado pelas funções que interagem com o banco de dados
			const mockUser = { id: 'id do usuário', name: 'nome do usuário' };
			const mockPost = {
				id: 'id do post',
				contents: 'conteúdo do post',
				coments: 0,
			};
			const mockComentId = 'id do comentário';

			tokenManagerMock.getPayload = jest
				.fn()
				.mockReturnValue({ id: 'id do usuário' });
			userDataBaseMock.findUserId = jest.fn().mockResolvedValue(mockUser);
			comentDataBaseMock.postById = jest.fn().mockResolvedValue(mockPost);
			idGeneratorMock.generate = jest.fn().mockReturnValue(mockComentId);
			comentDataBaseMock.insertComent = jest.fn().mockResolvedValue(true);
			comentDataBaseMock.updatePost = jest.fn().mockResolvedValue(true);

			const newComent = new Comment(
				mockComentId,
				mockUser.id,
				postId,
				mockUser.name,
				contents,
				new Date().toISOString(),
				new Date().toISOString(),
				0,
				0
			);

			const output = await comentsBusinessMock.insertComents(
				authorization,
				contents,
				postId
			);
			const expectedOutput = {
				content: contents,
			};

			expect(output).toEqual(expectedOutput);
			expect(userDataBaseMock.findUserId).toHaveBeenCalled();
			expect(comentDataBaseMock.postById).toHaveBeenCalled();
			expect(idGeneratorMock.generate).toHaveBeenCalled();
			expect(comentDataBaseMock.insertComent).toHaveBeenCalled();
			expect(comentDataBaseMock.updatePost).toHaveBeenCalled();
		});
	});
});
