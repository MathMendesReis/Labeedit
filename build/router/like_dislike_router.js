"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.like_dislike_router = void 0;
const express_1 = require("express");
const Like_dislike_1 = require("../controller/Like_dislike");
const Like_dislike_businnes_1 = require("../business/Like_dislike_businnes");
const TokenManager_1 = require("../services/TokenManager");
const Like_dislike_database_1 = require("../database/Like_dislike_database");
exports.like_dislike_router = (0, express_1.Router)();
const likeDislikeController = new Like_dislike_1.Like_dislikeController(new Like_dislike_businnes_1.Like_dislike_businnes(new TokenManager_1.TokenManager(), new Like_dislike_database_1.Like_dislike_database()));
exports.like_dislike_router.post('/', likeDislikeController.likeDislike);
//# sourceMappingURL=like_dislike_router.js.map