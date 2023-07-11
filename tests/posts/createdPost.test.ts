import { UserBusines } from '../../src/business/UserBusines';
import { UserDataBase } from '../../src/database/UserDataBase';
import { PostDataBase } from '../../src/database/PostDataBase';
import { Like_dislike_database } from '../../src/database/Like_dislike_database';
import { Like_dislike_coments_database } from '../../src/database/Like_dislike_coments_database';
import { PostBusinnes } from '../../src/business/PostBusines';
import { BadRequestError } from '../../src/error/BadRequestError';
import { NotFoundError } from '../../src/error/NotFoundError';
import { IdGenerator } from '../../src/services/IdGenerator';
import { TokenManager } from '../../src/services/TokenManager';

// Crie mocks para as dependências
const tokenManagerMock = {} as TokenManager;
const userDataBaseMock = {} as UserDataBase;
const idGeneratorMock = {} as IdGenerator;
const postBaseDataBaseMock = {} as PostDataBase;
const likeDislikeDataBaseMock = {} as Like_dislike_database;
const like_dislike_coments_databaseMock = {} as Like_dislike_coments_database;

// userDataBaseMock.findEmail = jest.fn().mockResolvedValue(false);

// Crie uma instância do UserBusines usando os mocks
const postBusinessMock = new PostBusinnes(
	tokenManagerMock,
	userDataBaseMock,
	idGeneratorMock,
	postBaseDataBaseMock,
	likeDislikeDataBaseMock,
	like_dislike_coments_databaseMock
) as jest.Mocked<PostBusinnes>;

describe('Testando metodo created user', () => {
	test('', async () => {
		tokenManagerMock.getPayload = jest.fn().mockReturnValue(true);
		userDataBaseMock.findUserId = jest.fn().mockReturnValue(true);
		const authorization = '';
		const contents = '';

		const output = await postBusinessMock.insertPost(authorization, contents);
	});
});
