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
exports.UserController = void 0;
const InputLogin_DTO_1 = require("../DTOs/InputLogin.DTO");
const zod_1 = require("zod");
const BaseError_1 = require("../error/BaseError");
const InputCreateAccount_DTO_1 = require("../DTOs/InputCreateAccount.DTO");
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.userLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = InputLogin_DTO_1.inputLoginSchema.parse(req.body);
                const response = yield this.userBusiness.userLogin(email, password);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res
                        .status(400)
                        .json({ error: 'Erro de validação', issues: error.issues });
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Erro inesperado', message: error });
                }
            }
        });
        this.createAccount = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, accept_terms } = InputCreateAccount_DTO_1.CreateAccountSchemma.parse(req.body);
                const response = yield this.userBusiness.createAccount(name, email, password, accept_terms);
                res.status(200).send(response);
            }
            catch (error) {
                console.log(error);
                if (error instanceof zod_1.ZodError) {
                    res
                        .status(400)
                        .json({ error: 'Erro de validação', issues: error.issues });
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).json({ error: error.message });
                }
                else {
                    res.status(500).json({ error: 'Erro inesperado', message: error });
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UsersController.js.map