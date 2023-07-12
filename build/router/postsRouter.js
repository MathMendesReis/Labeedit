"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = require("express");
const PostController_1 = require("../controller/PostController");
const PostBusines_1 = require("../business/PostBusines");
const TokenManager_1 = require("../services/TokenManager");
const UserDataBase_1 = require("../database/UserDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
const PostDataBase_1 = require("../database/PostDataBase");
exports.postRouter = (0, express_1.Router)();
const postController = new PostController_1.PostController(new PostBusines_1.PostBusinnes(new TokenManager_1.TokenManager(), new UserDataBase_1.UserDataBase(), new IdGenerator_1.IdGenerator(), new PostDataBase_1.PostDataBase()));
exports.postRouter.post('/', postController.insertPost);
exports.postRouter.get('/', postController.getAllPosts);
exports.postRouter.get('/:id', postController.findPostById);
exports.postRouter.post('/:id', postController.addLikeDislike);
//# sourceMappingURL=postsRouter.js.map