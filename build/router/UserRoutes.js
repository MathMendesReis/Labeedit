"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controller/UserController");
const UserBusiness_1 = require("../business/UserBusiness");
const UserDataBase_1 = require("../database/UserDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
const TokenManager_1 = require("../services/TokenManager");
const HashManager_1 = require("../services/HashManager");
exports.userRouter = (0, express_1.Router)();
const userController = new UserController_1.UserController(new UserBusiness_1.UserBusiness(new UserDataBase_1.UserDataBase(), new IdGenerator_1.IdGenerator(), new TokenManager_1.TokenManager(), new HashManager_1.HashManager()));
exports.userRouter.post('/login', userController.login);
exports.userRouter.post('/singup', userController.singUp);
exports.userRouter.put('/update', userController.updateUser);
exports.userRouter.delete('/delete', userController.deleteUserById);
//# sourceMappingURL=UserRoutes.js.map