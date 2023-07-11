import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';

export class ComentsBusiness {
	constructor(
		private tokenMnager: TokenManager,
		private idGenarator: IdGenerator
	) {}
}
