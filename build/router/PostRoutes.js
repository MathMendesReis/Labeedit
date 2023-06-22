"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const IdGenerator_1 = require("../services/IdGenerator");
const PostController_1 = require("../controller/PostController");
const PostBusiness_1 = require("../business/PostBusiness");
const PostDataBase_1 = require("../database/PostDataBase");
const TokenManager_1 = require("../services/TokenManager");
const UserDataBase_1 = require("../database/UserDataBase");
const LikeDislikeDataBase_1 = require("../database/LikeDislikeDataBase");
exports.postRouter = (0, express_1.Router)();
const postController = new PostController_1.PostController(new PostBusiness_1.PostBusiness(new PostDataBase_1.PostDataBase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager(), new UserDataBase_1.UserDataBase(), new LikeDislikeDataBase_1.LikesDislikesDataBase()));
exports.postRouter.get('/', postController.getAllpost);
exports.postRouter.get('/:id', postController.findPostByUserId);
exports.postRouter.post('/', postController.createPost);
exports.postRouter.put('/', postController.updatePost);
exports.postRouter.delete('/', postController.deletePost);
//# sourceMappingURL=PostRoutes.js.map