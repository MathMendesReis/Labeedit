import { inputComents } from '../DTOs/InputCreateComents.DTO';
import { OutOutAddComentInDb } from '../DTOs/OutputAddComentInDB.DTO';
import { ComentsDataBase } from '../database/ComentsDataBase';
import { BadRequestError } from '../error/BadRequestError';
import { Coments } from '../models/Coments';
import { IdGenerator } from '../services/IdGenerator';
import { TokenManager } from '../services/TokenManager';

export class ComentsBusiness {
	constructor(
		private tokenMnager: TokenManager,
		private comentsDataBase: ComentsDataBase,
		private idGenarator: IdGenerator
	) {}
	/**
	 * Cria uma novo post.
	 * @param data Data possui tres atributos
	 *  id: id do post que ta sendo comentado;
		authorization: token do usuario;
		contents: conteudo do post;
	 * @throws BadRequestError Se o token for invalido.
	 * @returns retornar um post especifico,juntos com seus comentarios em um array.
	 */
	public addComentInDB = async (
		data: inputComents
	): Promise<OutOutAddComentInDb> => {
		const payload = this.tokenMnager.getPayload(data.authorization);
		if (payload === null) {
			throw new BadRequestError('token invalido');
		}
		const id = this.idGenarator.generate();
		const comentsDB = new Coments(id, payload.id, data.id, data.contents);
		await this.comentsDataBase.addComents(comentsDB);
		return {
			message: 'Create Post sucessuful',
		};
	};
}
