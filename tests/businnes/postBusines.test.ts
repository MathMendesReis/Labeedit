import { PostBusinnes } from '../../src/business/PostBusines';
import { TokenManager } from '../../src/services/TokenManager';
import { UserDataBase } from '../../src/database/UserDataBase';
import { IdGenerator } from '../../src/services/IdGenerator';
import { PostDataBase } from '../../src/database/PostDataBase';
import { Like_dislike_database } from '../../src/database/Like_dislike_database';
import { ComentsDataBase } from '../../src/database/ComentsDataBase';
import { Like_dislike_coments_database } from '../../src/database/Like_dislike_coments_database';

// Crie mocks separados para cada uma das dependências
const tokenManagerMock = {} as TokenManager;
const userDataBaseMock = {} as UserDataBase;
const idGeneratorMock = {} as IdGenerator;
const postDataBaseMock = {} as PostDataBase;
const likeDislikeDataBaseMock = {} as Like_dislike_database;
const comentsDataBaseMock = {} as ComentsDataBase;
const likeDislikeComentsDatabaseMock = {} as Like_dislike_coments_database;

// Crie o mock da classe PostBusinnes e injete as dependências mockadas
const postBusinnesMock = new PostBusinnes(
	tokenManagerMock,
	userDataBaseMock,
	idGeneratorMock,
	postDataBaseMock,
	likeDislikeDataBaseMock,
	comentsDataBaseMock,
	likeDislikeComentsDatabaseMock
) as jest.Mocked<PostBusinnes>;

test.skip('create new post, caso de sucesso', async () => {
	const authorization = 'token';
	const contents = 'Conteúdo do post';
	(tokenManagerMock.getPayload as jest.Mock).mockReturnValue(
		Promise.resolve({ id: 'userID' })
	);

	await postBusinnesMock.createNewPost({ authorization, contents });

	expect(postBusinnesMock.createNewPost).toHaveBeenCalled();
});
