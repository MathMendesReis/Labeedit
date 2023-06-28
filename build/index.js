"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usersRouters_1 = require("./router/usersRouters");
const postsRouter_1 = require("./router/postsRouter");
const like_dislike_router_1 = require("./router/like_dislike_router");
const comentsRouter_1 = require("./router/comentsRouter");
const LikeDislikeComents_1 = require("./router/LikeDislikeComents");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003');
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.use('/users', usersRouters_1.userRouter);
app.use('/posts', postsRouter_1.postRouter);
app.use('/like', like_dislike_router_1.like_dislike_router);
app.use('/coments', comentsRouter_1.comentsRouter);
app.use('/likesComents', LikeDislikeComents_1.like_dislike_coments_router);
//# sourceMappingURL=index.js.map