import { TokenManager } from '../../src/services/TokenManager';
import { UserDataBase } from '../../src/database/UserDataBase';
import { PostDataBase } from '../../src/database/PostDataBase';
import { IdGenerator } from '../../src/services/IdGenerator';
import { PostBusinnes } from '../../src/business/PostBusines';

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
		userDataBaseMock.findUserId = jest
			.fn()
			.mockResolvedValue({ name: 'Test User' });
		postDataBaseMock.insertPost = jest.fn().mockResolvedValue(true);
		idGeneratorMock.generate = jest.fn().mockReturnValue('12345');

		const expectedOutput = {
			content: contents,
		};

		const output = await postBusinessMock.insertPost(authorization, contents);

		expect(output).toEqual(expectedOutput);
	});
	test('Deve falhar quando o token é inválido', async () => {
		const authorization = 'token de autorização inválido';
		const contents = 'conteúdo do post';

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(null);

		await expect(
			postBusinessMock.insertPost(authorization, contents)
		).rejects.toThrow('invalid token');
	});

	test('Deve falhar quando o usuário não existe', async () => {
		const authorization = 'token de autorização válido';
		const contents = 'conteúdo do post';

		const payload = { id: 'id do usuário' };

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(payload);
		userDataBaseMock.findUserId = jest.fn().mockResolvedValue(false);

		await expect(
			postBusinessMock.insertPost(authorization, contents)
		).rejects.toThrow('Not Found User');
	});
});

describe('testando getAllPosts', () => {
	test('Deve retornar todos os posts', async () => {
		const authorization = 'token de autorização válido';

		const payload = { id: 'id do usuário' };

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(payload);

		const mockPostData = [
			{
				id: 'post1',
				contents: 'contents1',
				creation_date: 'date1',
				information_update: 'update1',
				likes: 1,
				dislikes: 0,
				coments: 0,
				user_id: 'user1',
				user_name: 'name1',
			},
		];

		postDataBaseMock.getAllPosts = jest.fn().mockResolvedValue(mockPostData);

		const output = await postBusinessMock.getAllPosts(authorization);

		expect(output).toEqual(
			mockPostData.map((post) => ({
				id: post.id,
				contents: post.contents,
				creation_date: post.creation_date,
				information_update: post.information_update,
				likes: post.likes,
				dislikes: post.dislikes,
				coments: post.coments,
				creator: {
					id: post.user_id,
					name: post.user_name,
				},
			}))
		);
	});

	test('Deve falhar quando o token é inválido', async () => {
		const authorization = 'token de autorização inválido';

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(null);

		await expect(postBusinessMock.getAllPosts(authorization)).rejects.toThrow(
			'invalid token'
		);
	});
});

describe('testando findPostById', () => {
	test('Deve retornar o post correspondente ao ID', async () => {
		const authorization = 'token de autorização válido';
		const postId = 'id do post';

		const payload = { id: 'id do usuário' };

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(payload);

		const mockPostData = [
			{
				id: postId,
				contents: 'contents1',
				creation_date: 'date1',
				information_update: 'update1',
				likes: 1,
				dislikes: 0,
				coments: 0,
				user_id: 'user1',
				user_name: 'name1',
			},
		];

		postDataBaseMock.postById = jest.fn().mockResolvedValue(mockPostData);

		const output = await postBusinessMock.findPostById(authorization, postId);

		expect(output).toEqual(
			mockPostData.map((post) => ({
				id: post.id,
				contents: post.contents,
				creation_date: post.creation_date,
				information_update: post.information_update,
				likes: post.likes,
				dislikes: post.dislikes,
				coments: post.coments,
				creator: {
					id: post.user_id,
					name: post.user_name,
				},
			}))
		);
	});

	test('Deve falhar quando o token é inválido', async () => {
		const authorization = 'token de autorização inválido';
		const postId = 'id do post';

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(null);

		await expect(
			postBusinessMock.findPostById(authorization, postId)
		).rejects.toThrow('invalid token');
	});

	test('Deve falhar quando o post não é encontrado', async () => {
		const authorization = 'token de autorização válido';
		const postId = 'id do post inexistente';

		const payload = { id: 'id do usuário' };

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(payload);
		postDataBaseMock.postById = jest.fn().mockResolvedValue([]);

		await expect(
			postBusinessMock.findPostById(authorization, postId)
		).rejects.toThrow('Not found post');
	});
});
describe('testando addLikeDislike', () => {
	test('Deve adicionar um like', async () => {
		const authorization = 'token de autorização válido';
		const postId = 'id do post';
		const like = 1;

		const payload = { id: 'id do usuário' };
		const mockPostData = [
			{
				id: 'id do post',
				user_id: 'id do usuário',
				name: 'nome do usuário',
				contents: 'conteúdo do post',
				creation_date: new Date().toISOString(),
				information_update: new Date().toISOString(),
				likes: 0,
				dislikes: 0,
				coments: 0,
			},
		];

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(payload);
		postDataBaseMock.userById = jest.fn().mockResolvedValue({ name: 'user1' });
		postDataBaseMock.postById = jest
			.fn()
			.mockResolvedValue([{ ...mockPostData[0] }]);
		postDataBaseMock.getLike = jest.fn().mockResolvedValue(null);
		postDataBaseMock.insertLike = jest.fn().mockResolvedValue(true);
		postDataBaseMock.updatePost = jest.fn().mockResolvedValue(true);

		const output = await postBusinessMock.addLikeDislike(
			authorization,
			postId,
			like
		);

		expect(output).toBe(true);
	});

	test('Deve adicionar um dislike', async () => {
		const authorization = 'token de autorização válido';
		const postId = 'id do post';
		const like = 0;

		const payload = { id: 'id do usuário' };
		const mockPostData = [
			{
				id: 'id do post',
				user_id: 'id do usuário',
				name: 'nome do usuário',
				contents: 'conteúdo do post',
				creation_date: new Date().toISOString(),
				information_update: new Date().toISOString(),
				likes: 0,
				dislikes: 0,
				coments: 0,
			},
		];

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(payload);
		postDataBaseMock.userById = jest.fn().mockResolvedValue({ name: 'user1' });
		postDataBaseMock.postById = jest
			.fn()
			.mockResolvedValue([{ ...mockPostData[0] }]);
		postDataBaseMock.getLike = jest.fn().mockResolvedValue(null);
		postDataBaseMock.insertLike = jest.fn().mockResolvedValue(true);
		postDataBaseMock.updatePost = jest.fn().mockResolvedValue(true);

		const output = await postBusinessMock.addLikeDislike(
			authorization,
			postId,
			like
		);

		expect(output).toBe(false);
	});

	test('Deve remover um like', async () => {
		const authorization = 'token de autorização válido';
		const postId = 'id do post';
		const like = 1;

		const payload = { id: 'id do usuário' };
		const mockPostData = [
			{
				id: 'id do post',
				user_id: 'id do usuário',
				name: 'nome do usuário',
				contents: 'conteúdo do post',
				creation_date: new Date().toISOString(),
				information_update: new Date().toISOString(),
				likes: 0,
				dislikes: 0,
				coments: 0,
			},
		];

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(payload);
		postDataBaseMock.userById = jest.fn().mockResolvedValue({ name: 'user1' });
		postDataBaseMock.postById = jest
			.fn()
			.mockResolvedValue([{ ...mockPostData[0] }]);
		postDataBaseMock.getLike = jest.fn().mockResolvedValue({ like: 1 });
		postDataBaseMock.deleteLike = jest.fn().mockResolvedValue(true);
		postDataBaseMock.updatePost = jest.fn().mockResolvedValue(true);

		const output = await postBusinessMock.addLikeDislike(
			authorization,
			postId,
			like
		);

		expect(output).toBe(true);
	});

	test('Deve remover um dislike', async () => {
		const authorization = 'token de autorização válido';
		const postId = 'id do post';
		const like = 0;

		const payload = { id: 'id do usuário' };
		const mockPostData = [
			{
				id: 'id do post',
				user_id: 'id do usuário',
				name: 'nome do usuário',
				contents: 'conteúdo do post',
				creation_date: new Date().toISOString(),
				information_update: new Date().toISOString(),
				likes: 0,
				dislikes: 0,
				coments: 0,
			},
		];

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(payload);
		postDataBaseMock.userById = jest.fn().mockResolvedValue({ name: 'user1' });
		postDataBaseMock.postById = jest
			.fn()
			.mockResolvedValue([{ ...mockPostData[0] }]);
		postDataBaseMock.getLike = jest.fn().mockResolvedValue({ like: 0 });
		postDataBaseMock.deleteLike = jest.fn().mockResolvedValue(true);
		postDataBaseMock.updatePost = jest.fn().mockResolvedValue(true);

		const output = await postBusinessMock.addLikeDislike(
			authorization,
			postId,
			like
		);

		expect(output).toBe(false);
	});

	test('Deve falhar quando o token é inválido', async () => {
		const authorization = 'token de autorização inválido';
		const postId = 'id do post';
		const like = 1;

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(null);

		await expect(
			postBusinessMock.addLikeDislike(authorization, postId, like)
		).rejects.toThrow('invalid token');
	});

	test('Deve falhar quando o post não é encontrado', async () => {
		const authorization = 'token de autorização válido';
		const postId = 'id do post inexistente';
		const like = 1;

		const payload = { id: 'id do usuário' };

		tokenManagerMock.getPayload = jest.fn().mockReturnValue(payload);
		postDataBaseMock.userById = jest.fn().mockResolvedValue({ name: 'user1' });
		postDataBaseMock.postById = jest.fn().mockResolvedValue([]);

		await expect(
			postBusinessMock.addLikeDislike(authorization, postId, like)
		).rejects.toThrow('Not found post');
	});
});
