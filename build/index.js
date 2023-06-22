"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const UserRoutes_1 = require("./router/UserRoutes");
const PostRoutes_1 = require("./router/PostRoutes");
const LikeRouter_1 = require("./router/LikeRouter");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.listen(Number(process.env.PORT || 3003), () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
app.use('/users', UserRoutes_1.userRouter);
app.use('/posts', PostRoutes_1.postRouter);
app.use('/likeDislike', LikeRouter_1.likeDislikeRouter);
//# sourceMappingURL=index.js.map