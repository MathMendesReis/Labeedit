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
exports.ComentsBusiness = void 0;
const NotFoundError_1 = require("../error/NotFoundError");
const BadRequestError_1 = require("../error/BadRequestError");
const Coments_1 = require("../models/Coments");
const Post_1 = require("../models/Post");
class ComentsBusiness {
    constructor(tokenManager, userDataBase, idGenerator, comentDataBase) {
        this.tokenManager = tokenManager;
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.comentDataBase = comentDataBase;
        this.insertComents = (authorization, contents, post_Id) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(authorization);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('invalid token');
            }
            const userDB = yield this.userDataBase.findUserId(payload.id);
            if (!userDB) {
                throw new NotFoundError_1.NotFoundError('Not Found User');
            }
            const postDB = yield this.comentDataBase.postById(post_Id);
            if (!postDB) {
                throw new NotFoundError_1.NotFoundError('Not Found post');
            }
            const post = new Post_1.Post(postDB.id, postDB.user_id, userDB.name, postDB.contents, postDB.creation_date, postDB.information_update, postDB.likes, postDB.dislikes, postDB.coments);
            const id = this.idGenerator.generate();
            const newComent = new Coments_1.Comment(id, payload.id, postDB.id, userDB.name, contents, new Date().toISOString(), new Date().toISOString(), 0, 0);
            post.addComents();
            yield this.comentDataBase.updatePost(post.postModel());
            yield this.comentDataBase.insertComent(newComent.comentsModel());
            const output = {
                content: postDB.contents,
            };
            return output;
        });
        this.getComentsByPostId = (authorization, id) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(authorization);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('invalid token');
            }
            return yield this.comentDataBase.getComentsByPostId(id);
        });
        this.addLikeDislike = (authorization, coments_id, post_id, like) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(authorization);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('invalid token');
            }
            const userDB = yield this.comentDataBase.userById(payload.id);
            if (!userDB) {
                throw new NotFoundError_1.NotFoundError('Not found users');
            }
            const comentsDB = yield this.comentDataBase.comentById(coments_id);
            if (!comentsDB) {
                throw new NotFoundError_1.NotFoundError('Not found coments');
            }
            const postDB = yield this.comentDataBase.postById(post_id);
            if (!postDB) {
                throw new NotFoundError_1.NotFoundError('Not found post');
            }
            const newLike = {
                user_id: payload.id,
                coments_id,
                post_id,
                like,
            };
            const coment = new Coments_1.Comment(comentsDB.id, comentsDB.user_id, comentsDB.id, userDB.name, comentsDB.contents, comentsDB.creation_date, comentsDB.information_update, comentsDB.likes, comentsDB.dislikes);
            const isLike = yield this.comentDataBase.getLike(payload.id, coments_id);
            if (isLike) {
                if (isLike.like === like) {
                    yield this.comentDataBase.deleteLike(payload.id, coments_id, like);
                    like === 1 ? coment.removeLike() : coment.removeDislike();
                }
                else {
                    yield this.comentDataBase.updateLike(newLike);
                    if (like === 1) {
                        coment.removeDislike();
                        coment.addLike();
                    }
                    if (like === 0) {
                        coment.removeLike();
                        coment.addDislike();
                    }
                }
            }
            else {
                yield this.comentDataBase.insertLike(newLike);
                like === 1 ? coment.addLike() : coment.addDislike();
            }
            yield this.comentDataBase.updateComents(coment.comentsModel());
            if (like === 1) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.ComentsBusiness = ComentsBusiness;
//# sourceMappingURL=ComentsBusinnes.js.map