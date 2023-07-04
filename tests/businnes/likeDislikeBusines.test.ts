import { InputLikeDislike } from '../../src/DTOs/InputLike.DTO';
import { Like_dislike_businnes } from '../../src/business/Like_dislike_businnes';
import { Like_dislike } from '../../src/models/LikeDislike';
import { TokenManager } from '../../src/services/TokenManager';
import { Like_dislike_database } from '../../src/database/Like_dislike_database';

jest.mock('../services/TokenManager');
jest.mock('../database/Like_dislike_database');

describe('Like_dislike_businnes', () => {
	let likeDislikeBusiness: Like_dislike_businnes;
	let tokenManager: jest.Mocked<TokenManager>;
	let likeDislikeDataBase: jest.Mocked<Like_dislike_database>;
});
