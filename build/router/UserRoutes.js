"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("../controller/UserController");
const UserDataBase_1 = require("../database/UserDataBase");
const UserBusiness_1 = require("../business/UserBusiness");
exports.userRouter = express_1.default.Router();
const userController = new UserController_1.UserController(new UserBusiness_1.UserBusiness(new UserDataBase_1.UserDataBase()));
exports.userRouter.get('/', userController.getAllUsers);
//# sourceMappingURL=UserRoutes.js.map