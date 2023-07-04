import { ComentsBusiness } from '../../src/business/ComentsBusinnes';
import { TokenManager } from '../../src/services/TokenManager';
import { ComentsDataBase } from '../../src/database/ComentsDataBase';
import { IdGenerator } from '../../src/services/IdGenerator';

jest.mock('../../src/services/TokenManager');
jest.mock('../../src/business/ComentsBusinnes');
jest.mock('../../src/services/IdGenerator');

describe('ComentsBusiness', () => {
	let comentsBusiness: ComentsBusiness;
	let tokenManager: jest.Mocked<TokenManager>;
	let comentsDataBase: jest.Mocked<ComentsDataBase>;
	let idGenerator: jest.Mocked<IdGenerator>;
});
