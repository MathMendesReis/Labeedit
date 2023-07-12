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
const zod_1 = require("zod");
const BaseError_1 = require("../error/BaseError");
const User_1 = require("../models/User");
class UserController {
    constructor(userBusines) {
        this.userBusines = userBusines;
        this.createdUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password, accept_terms } = User_1.userControllerSchemma.parse({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password,
                    accept_terms: req.body.accept_terms,
                });
                const response = yield this.userBusines.createdUser(name, email, password, accept_terms);
                res.status(201).send(response);
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
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = User_1.userControllerSchemmaLogin.parse({
                    email: req.body.email,
                    password: req.body.password,
                });
                const response = yield this.userBusines.login(email, password);
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