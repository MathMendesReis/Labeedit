"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeDislikesBusiness = void 0;
const NotFoundError_1 = require("../error/NotFoundError");
const LikeDislike_1 = require("../models/LikeDislike");
const BadRequestError_1 = require("../error/BadRequestError");
class LikeDislikesBusiness {
    constructor(likeDislikeDataBase, idGenerator, UserDataBase, tokenManager, postDataBase) {
        this.likeDislikeDataBase = likeDislikeDataBase;
        this.idGenerator = idGenerator;
        this.UserDataBase = UserDataBase;
        this.tokenManager = tokenManager;
        this.postDataBase = postDataBase;
        this.createLikeDislike = ({ token, post_id, type, }) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('token inválido');
            }
            const foundUserById = yield this.UserDataBase.findUserById(payload.id);
            if (!foundUserById) {
                throw new NotFoundError_1.NotFoundError('Usuario não encontrado.');
            }
            const foundPostById = yield this.postDataBase.findPOstByID(post_id);
            if (!foundPostById) {
                throw new NotFoundError_1.NotFoundError('Post não encontrado');
            }
            const foundLikeDiliskeById = yield this.likeDislikeDataBase.foundLikeDiliskeByUserId(payload.id);
            if (foundLikeDiliskeById && foundLikeDiliskeById.type !== type) {
                const updateDB = new LikeDislike_1.LikeDislike(foundLikeDiliskeById.id, foundLikeDiliskeById.post_id, foundLikeDiliskeById.user_id, type);
                yield this.likeDislikeDataBase.updateLikeDislike(updateDB);
                return { success: true, message: 'Atualizado com sucesso' };
            }
            const newLikeDislikeDB = new LikeDislike_1.LikeDislike(this.idGenerator.generate(), post_id, payload.id, type);
            yield this.likeDislikeDataBase.createLikeDislike(newLikeDislikeDB);
            return { success: true, message: 'Atualizado com sucesso' };
        });
    }
}
exports.LikeDislikesBusiness = LikeDislikesBusiness;
//# sourceMappingURL=LikeDislikeBusiness.js.map