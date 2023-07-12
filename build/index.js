"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const usersRouters_1 = require("./router/usersRouters");
const postsRouter_1 = require("./router/postsRouter");
const comentsRouter_1 = require("./router/comentsRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(Number(process.env.PORT), () => {
    console.log(`Servidor rodando na porta ${Number(process.env.PORT)}`);
});
app.get('/ping', (req, res) => {
    res.send('Pong!');
});
app.use('/users', usersRouters_1.userRouter);
app.use('/posts', postsRouter_1.postRouter);
app.use('/coments', comentsRouter_1.comentsRouter);
//# sourceMappingURL=index.js.map