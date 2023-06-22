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
const InputLogin_1 = require("../DTOs/InputLogin");
const zod_1 = require("zod");
const BaseError_1 = require("../error/BaseError");
const InputSingUp_DTO_1 = require("../DTOs/InputSingUp.DTO");
const inputUpdate_DTO_1 = require("../DTOs/inputUpdate.DTO");
const inputDelete_DTO_1 = require("../DTOs/inputDelete.DTO");
class UserController {
    constructor(userBusiness) {
        this.userBusiness = userBusiness;
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const inputData = InputLogin_1.InputSchema.parse(req.body);
                const result = yield this.userBusiness.login(inputData);
                res.status(200).send(result);
            }
            catch (error) {
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
        this.singUp = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const inputData = InputSingUp_DTO_1.InputSingUpSchema.parse(req.body);
                const result = yield this.userBusiness.singUp(inputData);
                res.status(200).send(result);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send('Erro inesperado' + ' ' + error);
                }
            }
        });
        this.updateUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const inputData = inputUpdate_DTO_1.InputUpdateSchema.parse(req.body);
                const result = yield this.userBusiness.updateUser(inputData);
                res.status(200).send(result);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send('Erro inesperado' + ' ' + error);
                }
            }
        });
        this.deleteUserById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const inputData = inputDelete_DTO_1.InputDeleteByIdSchema.parse(req.body);
                const result = yield this.userBusiness.deleteUserById(inputData);
                res.status(200).send(result);
            }
            catch (error) {
                if (error instanceof zod_1.ZodError) {
                    res.status(400).send(error.issues);
                }
                else if (error instanceof BaseError_1.BaseError) {
                    res.status(error.statusCode).send(error.message);
                }
                else {
                    res.status(500).send('Erro inesperado' + ' ' + error);
                }
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map