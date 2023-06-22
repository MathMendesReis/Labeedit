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
exports.UserBusiness = void 0;
const BadRequestError_1 = require("../error/BadRequestError");
const User_1 = require("../models/User");
const NotFoundError_1 = require("../error/NotFoundError");
class UserBusiness {
    constructor(userBaseDataBase, idGenerator, tokenManager, hashManager) {
        this.userBaseDataBase = userBaseDataBase;
        this.idGenerator = idGenerator;
        this.tokenManager = tokenManager;
        this.hashManager = hashManager;
        this.login = ({ email, password, }) => __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this.userBaseDataBase.findUsersByEmail(email);
            if (!userDB)
                throw new NotFoundError_1.NotFoundError('EMAIL não encontrado');
            const hashedPassword = userDB.password;
            const isPasswordCorrect = yield this.hashManager.compare(password, hashedPassword);
            if (!isPasswordCorrect)
                throw new BadRequestError_1.BadRequestError(' email ou password incorretos');
            const tokenPayload = {
                id: userDB.id,
                role: userDB.email,
            };
            const token = this.tokenManager.createToken(tokenPayload);
            return {
                message: 'Login realizado com sucesso',
                token,
            };
        });
        this.singUp = ({ apelido, checkbox, email, password, }) => __awaiter(this, void 0, void 0, function* () {
            const isEmail = yield this.userBaseDataBase.findUsersByEmail(email);
            if (isEmail)
                throw new BadRequestError_1.BadRequestError('Requisição inválida');
            const id = this.idGenerator.generate();
            const hashedPassword = yield this.hashManager.hash(password);
            const newUser = new User_1.Users(id, apelido, email, User_1.Role.USER, hashedPassword, checkbox, new Date().toISOString());
            yield this.userBaseDataBase.insertUserInDB(newUser);
            return {
                message: 'usuario cadastro com sucesso',
            };
        });
        this.updateUser = (newData) => __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this.userBaseDataBase.findUserById(newData.id);
            if (!userDB)
                throw new NotFoundError_1.NotFoundError('cadastro não encontrado');
            if (newData.email && newData.email !== userDB.email) {
                const isEmailInSB = yield this.userBaseDataBase.findUsersByEmail(newData.email);
                if (isEmailInSB)
                    throw new BadRequestError_1.BadRequestError('Email já cadastrado');
            }
            const updateUser = new User_1.Users(userDB.id, newData.apelido || userDB.apelido, newData.email || userDB.email, userDB.role, userDB.password, userDB.checkbox, userDB.created_at);
            yield this.userBaseDataBase.updateUser(updateUser);
            return 'Cadastro atualizado com sucesso.';
        });
        this.deleteUserById = (id) => __awaiter(this, void 0, void 0, function* () {
            const userDB = yield this.userBaseDataBase.findUserById(id.id);
            if (!userDB)
                throw new NotFoundError_1.NotFoundError('ID não cadastrado');
            yield this.userBaseDataBase.deleteUserById(userDB.id);
            return 'Delete user sucesseful';
        });
    }
}
exports.UserBusiness = UserBusiness;
//# sourceMappingURL=UserBusiness.js.map