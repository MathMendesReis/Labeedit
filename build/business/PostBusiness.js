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
exports.PostBusiness = void 0;
const Post_1 = require("../models/Post");
const NotFoundError_1 = require("../error/NotFoundError");
const BadRequestError_1 = require("../error/BadRequestError");
class PostBusiness {
    constructor(postDataBase, idGenerator, tokenManager, userDataBase, likeDislikeDataBase) {
        this.postDataBase = postDataBase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.userDataBase = userDataBase;
        this.likeDislikeDataBase = likeDislikeDataBase;
        this.createPost = ({ content, token }) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('token inválido');
            }
            const foundUserById = yield this.userDataBase.findUserById(payload.id);
            if (!foundUserById)
                throw new NotFoundError_1.NotFoundError('usuario não cadastrado');
            const newPostDB = new Post_1.Posts(this.idGenerator.generate(), content, new Date().toISOString(), payload.id);
            return yield this.postDataBase.createPost(newPostDB);
        });
        this.updatePost = (input) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(input.token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('token inválido');
            }
            const foundPostById = yield this.postDataBase.findPOstByID(payload.id);
            if (!foundPostById)
                throw new NotFoundError_1.NotFoundError('post não cadastrado');
            const updatePostInDB = new Post_1.Posts(foundPostById.id, input.content || foundPostById.content, Date.now().toString(), foundPostById.user_id);
            yield this.postDataBase.updatePost(updatePostInDB);
            return;
        });
        this.deletePost = (id) => __awaiter(this, void 0, void 0, function* () {
            const postDB = yield this.postDataBase.findPOstByID(id.id);
            if (!postDB)
                throw new NotFoundError_1.NotFoundError('ID não encontrado');
            yield this.postDataBase.deletePostById(id.id);
        });
        this.getAllpost = () => __awaiter(this, void 0, void 0, function* () {
            const foundAllPost = yield this.postDataBase.getAllpost();
            if (foundAllPost.length < 1)
                return 'Nenhum post encontrado';
            const formartResultPromises = foundAllPost.map((post) => __awaiter(this, void 0, void 0, function* () {
                const like = yield this.likeDislikeDataBase.foundLikeByPostId(post.post_id);
                const dislike = yield this.likeDislikeDataBase.foundDiliskeByPostId(post.post_id);
                return Object.assign(Object.assign({}, post), { likes: like.length, dislikes: dislike.length, totalComments: 0 });
            }));
            const formartResult = yield Promise.all(formartResultPromises);
            return formartResult;
        });
        this.findPostByUserId = (id) => __awaiter(this, void 0, void 0, function* () {
            return yield this.postDataBase.findPostByUserId(id);
        });
    }
}
exports.PostBusiness = PostBusiness;
//# sourceMappingURL=PostBusiness.js.map