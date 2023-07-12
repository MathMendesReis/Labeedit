import { TokenManager } from '../../src/services/TokenManager';
import { UserDataBase } from '../../src/database/UserDataBase';
import { PostDataBase } from '../../src/database/PostDataBase';
import { IdGenerator } from '../../src/services/IdGenerator';
import { PostBusinnes } from '../../src/business/PostBusines';
import { Post } from '../../src/models/Post';

const tokenManagerMock = {} as TokenManager;
const userDataBaseMock = {} as UserDataBase;
const idGeneratorMock = {} as IdGenerator;
const postDataBaseMock = {} as PostDataBase;

const postBusinessMock = new PostBusinnes(
	tokenManagerMock,
	userDataBaseMock,
	idGeneratorMock,
	postDataBaseMock
) as jest.Mocked<PostBusinnes>;

describe('testando insertPost', () => {
	test('Deve criar um novo post', async () => {
		const authorization = 'token de autorização válido';
		const contents = 'conteúdo do post';

		const payload = { id: 'id do usuário' };

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(payload);
		userDataBaseMock.findUserId = jest.fn().mockResolvedValue(true);
		postDataBaseMock.insertPost = jest.fn().mockResolvedValue(true);
		idGeneratorMock.generate = jest.fn().mockReturnValue('12345');

		const expectedPost = new Post(
			'12345',
			payload.id,
			'Nome do usuário',
			contents,
			'Data de criação do post',
			'Data de atualização do post',
			0,
			0,
			0
		);

		const expectedOutput = { content: 'conteúdo do post' };

		const output = await postBusinessMock.insertPost(authorization, contents);

		expect(output).toEqual({ content: 'content' });
	});
});
