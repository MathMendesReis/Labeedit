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
exports.PostBusinnes = void 0;
const BadRequestError_1 = require("../error/BadRequestError");
const NotFoundError_1 = require("../error/NotFoundError");
const Post_1 = require("../models/Post");
class PostBusinnes {
    constructor(tokenManager, userDataBase, idGenerator, postBaseDataBase, LikeDislikeDataBase, comentsDataBase, like_dislike_coments_database) {
        this.tokenManager = tokenManager;
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.postBaseDataBase = postBaseDataBase;
        this.LikeDislikeDataBase = LikeDislikeDataBase;
        this.comentsDataBase = comentsDataBase;
        this.like_dislike_coments_database = like_dislike_coments_database;
        this.createNewPost = (token, contents) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('invalid token');
            }
            const userDB = yield this.userDataBase.foundUserByID(payload.id);
            if (!userDB) {
                throw new NotFoundError_1.NotFoundError('user not found');
            }
            const newPost = new Post_1.Post(this.idGenerator.generate(), payload.id, contents, new Date().toString(), new Date().toString());
            yield this.postBaseDataBase.addPostInDB(newPost);
        });
        this.getAllPosts = () => __awaiter(this, void 0, void 0, function* () {
            const postDB = yield this.postBaseDataBase.getAllPosts();
            const result = yield Promise.all(postDB.map((post) => __awaiter(this, void 0, void 0, function* () {
                const totalLikes = yield this.LikeDislikeDataBase.TotalFindLike(post.id, 1);
                const totalDislikes = yield this.LikeDislikeDataBase.TotalFindLike(post.id, 0);
                const comentarios = yield this.comentsDataBase.findComentsByPostId(post.id);
                return Object.assign(Object.assign({}, post), { likes: totalLikes.length, dislikes: totalDislikes.length, total_coments: comentarios.length });
            })));
            return result;
        });
        this.findPostById = (id) => __awaiter(this, void 0, void 0, function* () {
            const postDB = yield this.postBaseDataBase.findPostById(id);
            const result = yield Promise.all(postDB.map((post) => __awaiter(this, void 0, void 0, function* () {
                const totalLikes = yield this.LikeDislikeDataBase.TotalFindLike(post.id, 1);
                const totalDislikes = yield this.LikeDislikeDataBase.TotalFindLike(post.id, 0);
                const comentarios = yield this.comentsDataBase.findComentsByPostId(post.id);
                return Object.assign(Object.assign({}, post), { likes: totalLikes.length, dislikes: totalDislikes.length, total_coments: comentarios.length, coments: yield Promise.all(comentarios.map((coments) => __awaiter(this, void 0, void 0, function* () {
                        const totalLikesComents = yield this.like_dislike_coments_database.getAllLikesComents(coments.id, 1);
                        const totalDislikesComents = yield this.like_dislike_coments_database.getAllLikesComents(coments.id, 1);
                        return Object.assign(Object.assign({}, coments), { likes: totalLikesComents.length, dislikes: totalDislikesComents.length });
                    }))) });
            })));
            return result;
        });
    }
}
exports.PostBusinnes = PostBusinnes;
//# sourceMappingURL=PostBusinnes.js.map