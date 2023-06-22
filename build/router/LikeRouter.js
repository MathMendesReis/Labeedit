"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likeDislikeRouter = void 0;
const express_1 = require("express");
const LikeDislikeController_1 = require("../controller/LikeDislikeController");
const LikeDislikeBusiness_1 = require("../business/LikeDislikeBusiness");
const LikeDislikeDataBase_1 = require("../database/LikeDislikeDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
const UserDataBase_1 = require("../database/UserDataBase");
const PostDataBase_1 = require("../database/PostDataBase");
const TokenManager_1 = require("../services/TokenManager");
exports.likeDislikeRouter = (0, express_1.Router)();
const likeDislikeController = new LikeDislikeController_1.LikeDislikeController(new LikeDislikeBusiness_1.LikeDislikesBusiness(new LikeDislikeDataBase_1.LikesDislikesDataBase(), new IdGenerator_1.IdGenerator(), new UserDataBase_1.UserDataBase(), new TokenManager_1.TokenManager(), new PostDataBase_1.PostDataBase()));
exports.likeDislikeRouter.post('/', likeDislikeController.createLikeDislike);
//# sourceMappingURL=LikeRouter.js.map