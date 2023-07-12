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
const NotFoundError_1 = require("../error/NotFoundError");
const Post_1 = require("../models/Post");
const BadRequestError_1 = require("../error/BadRequestError");
class PostBusinnes {
    constructor(tokenManager, userDataBase, idGenerator, postBaseDataBase) {
        this.tokenManager = tokenManager;
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.postBaseDataBase = postBaseDataBase;
        this.insertPost = (authorization, contents) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(authorization);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('invalid token');
            }
            const isUser = yield this.userDataBase.findUserId(payload.id);
            if (!isUser) {
                throw new NotFoundError_1.NotFoundError('Not Found User');
            }
            const id = this.idGenerator.generate();
            const newPost = new Post_1.Post(id, payload.id, isUser.name, contents, new Date().toISOString(), new Date().toISOString(), 0, 0, 0);
            yield this.postBaseDataBase.insertPost(newPost.postModel());
            const output = {
                content: newPost.getContent(),
            };
            return output;
        });
        this.getAllPosts = (authorization) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(authorization);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('invalid token');
            }
            const postsData = yield this.postBaseDataBase.getAllPosts();
            const posts = postsData.map((postData) => {
                return {
                    id: postData.id,
                    contents: postData.contents,
                    creation_date: postData.creation_date,
                    information_update: postData.information_update,
                    likes: postData.likes,
                    dislikes: postData.dislikes,
                    coments: postData.coments,
                    creator: {
                        id: postData.user_id,
                        name: postData.user_name,
                    },
                };
            });
            return posts;
        });
        this.findPostById = (authorization, post_id) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(authorization);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('invalid token');
            }
            const postsData = yield this.postBaseDataBase.postById(post_id);
            if ((postsData === null || postsData === void 0 ? void 0 : postsData.length) === 0) {
                throw new NotFoundError_1.NotFoundError('Not found post');
            }
            const posts = postsData === null || postsData === void 0 ? void 0 : postsData.map((postData) => {
                return {
                    id: postData.id,
                    contents: postData.contents,
                    creation_date: postData.creation_date,
                    information_update: postData.information_update,
                    likes: postData.likes,
                    dislikes: postData.dislikes,
                    coments: postData.coments,
                    creator: {
                        id: postData.user_id,
                        name: postData.user_name,
                    },
                };
            });
            return posts;
        });
        this.addLikeDislike = (authorization, post_id, like) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(authorization);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('invalid token');
            }
            const userDB = yield this.postBaseDataBase.userById(payload.id);
            if (!userDB) {
                throw new NotFoundError_1.NotFoundError('Not found post');
            }
            const [postDB] = yield this.postBaseDataBase.postById(post_id);
            if (!postDB) {
                throw new NotFoundError_1.NotFoundError('Not found post');
            }
            const newLike = {
                user_id: payload.id,
                post_id,
                like,
            };
            const post = new Post_1.Post(postDB.id, postDB.user_id, userDB.name, postDB.contents, postDB.creation_date, postDB.information_update, postDB.likes, postDB.dislikes, postDB.coments);
            const isLike = yield this.postBaseDataBase.getLike(payload.id, post_id);
            if (isLike) {
                if (isLike.like === like) {
                    yield this.postBaseDataBase.deleteLike(payload.id, post_id, like);
                    like === 1 ? post.removeLike() : post.removeDislike();
                }
                else {
                    yield this.postBaseDataBase.updateLike(newLike);
                    if (like === 1) {
                        post.removeDislike();
                        post.addLike();
                    }
                    if (like === 0) {
                        post.removeLike();
                        post.addDislike();
                    }
                }
            }
            else {
                yield this.postBaseDataBase.insertLike(newLike);
                like === 1 ? post.addLike() : post.addDislike();
            }
            yield this.postBaseDataBase.updatePost(post.postModel());
            if (like === 1) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.PostBusinnes = PostBusinnes;
//# sourceMappingURL=PostBusines.js.map