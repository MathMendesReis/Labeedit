"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UsersController_1 = require("../controller/UsersController");
const UserBusinnes_1 = require("../business/UserBusinnes");
const UserDataBase_1 = require("../database/UserDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
const HashManager_1 = require("../services/HashManager");
exports.userRouter = (0, express_1.Router)();
const userController = new UsersController_1.UserController(new UserBusinnes_1.UserBusinnes(new UserDataBase_1.UserDataBase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager(), new HashManager_1.HashManager()));
exports.userRouter.post('/login', userController.userLogin);
exports.userRouter.post('/createAccount', userController.createAccount);
//# sourceMappingURL=usersRouters.js.map