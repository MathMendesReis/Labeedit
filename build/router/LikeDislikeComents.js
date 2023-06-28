"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.like_dislike_coments_router = void 0;
const express_1 = require("express");
const LikeDislikeComentsController_1 = require("../controller/LikeDislikeComentsController");
const LikeDislikeComentsBusinnes_1 = require("../business/LikeDislikeComentsBusinnes");
const TokenManager_1 = require("../services/TokenManager");
const Like_dislike_coments_database_1 = require("../database/Like_dislike_coments_database");
exports.like_dislike_coments_router = (0, express_1.Router)();
const likeDislikeComentsController = new LikeDislikeComentsController_1.LikeDislikeComentsController(new LikeDislikeComentsBusinnes_1.LikeDislikeComentsBusinnes(new TokenManager_1.TokenManager(), new Like_dislike_coments_database_1.Like_dislike_coments_database()));
exports.like_dislike_coments_router.post('/', likeDislikeComentsController.likeDislike);
//# sourceMappingURL=LikeDislikeComents.js.map