"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBusinnes = void 0;
const BadRequestError_1 = require("../error/BadRequestError");
const NotFoundError_1 = require("../error/NotFoundError");
const User_1 = require("../models/User");
const TokenManager_1 = require("../services/TokenManager");
class UserBusinnes {
    constructor(userDataBase, idGenerator, tokenManager, hashManager) {
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
        this.userLogin = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this.userDataBase.foundUserByEmail(email);
            if (!userDB) {
                throw new NotFoundError_1.NotFoundError('Not found Email');
            }
            const hashedPassword = userDB.password;
            const isPasswordCorrect = yield this.hashManager.compare(password, hashedPassword);
            if (!isPasswordCorrect) {
                throw new BadRequestError_1.BadRequestError('\'email\' ou \'password\' incorretos');
            }
            const payload = {
                id: userDB.id,
                role: userDB.role,
            };
            const token = this.tokenManager.createToken(payload);
            return {
                token,
            };
        });
        this.createAccount = (name, email, password, accept_terms) => __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this.userDataBase.foundUserByEmail(email);
            if (userDB)
                throw new BadRequestError_1.BadRequestError('E-mail already registered');
            const id = this.idGenerator.generate();
            const hashedPassword = yield this.hashManager.hash(password);
            const newUser = new User_1.User(id, name, email, hashedPassword, new Date().toString(), new Date().toString(), TokenManager_1.USER_ROLES.NORMAL, accept_terms);
            yield this.userDataBase.addNewUserInDB(newUser);
            return {
                message: 'successful registration',
            };
        });
    }
}
exports.UserBusinnes = UserBusinnes;
//# sourceMappingURL=UserBusinnes.js.map