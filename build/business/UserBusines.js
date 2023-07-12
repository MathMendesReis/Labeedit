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
exports.UserBusines = void 0;
const BadRequestError_1 = require("../error/BadRequestError");
const NotFoundError_1 = require("../error/NotFoundError");
const User_1 = require("../models/User");
const TokenManager_1 = require("../services/TokenManager");
class UserBusines {
    constructor(userDataBase, idGenerator, tokenManager, hashManager) {
        this.userDataBase = userDataBase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
        this.createdUser = (name, email, password, accept_terms) => __awaiter(this, void 0, void 0, function* () {
            const isEmail = yield this.userDataBase.findEmail(email);
            if (isEmail)
                throw new BadRequestError_1.BadRequestError('E-mail already registered');
            if (accept_terms !== 'accepted')
                throw new BadRequestError_1.BadRequestError('User must accept the terms');
            const id = this.idGenerator.generate();
            const hash = yield this.hashManager.hash(password);
            const newUser = new User_1.User(id, name, email, hash, new Date().toString(), new Date().toString(), TokenManager_1.USER_ROLES.NORMAL, User_1.ACCEPT_TERMS.accept);
            const userDB = {
                id: newUser.getId(),
                name: newUser.getName(),
                email: newUser.getEmail(),
                password: newUser.getPassword(),
                creation_date: newUser.getCREATION_DATE(),
                update_date: newUser.getInformationUpdate(),
                role: newUser.getRole(),
                accept_terms: newUser.getAccept_terms(),
            };
            yield this.userDataBase.insertUser(userDB);
            const payload = {
                id: userDB.id,
                role: userDB.role,
            };
            const token = this.tokenManager.createToken(payload);
            return {
                token,
            };
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this.userDataBase.getUserDB(email);
            if (!userDB) {
                throw new NotFoundError_1.NotFoundError('Not found user');
            }
            const hash = yield this.hashManager.compare(password, userDB === null || userDB === void 0 ? void 0 : userDB.password);
            if (!hash) {
                throw new BadRequestError_1.BadRequestError('Invalid password');
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
    }
}
exports.UserBusines = UserBusines;
//# sourceMappingURL=UserBusines.js.map