"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UsersController_1 = require("../controller/UsersController");
const UserDataBase_1 = require("../database/UserDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
const HashManager_1 = require("../services/HashManager");
const UserBusines_1 = require("../business/UserBusines");
exports.userRouter = (0, express_1.Router)();
const userController = new UsersController_1.UserController(new UserBusines_1.UserBusines(new UserDataBase_1.UserDataBase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager(), new HashManager_1.HashManager()));
exports.userRouter.post('/', userController.createdUser);
exports.userRouter.get('/', userController.login);
//# sourceMappingURL=usersRouters.js.map