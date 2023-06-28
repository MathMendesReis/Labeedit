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
exports.ComentsController = void 0;
const zod_1 = require("zod");
const BaseError_1 = require("../error/BaseError");
const InputCreateComents_DTO_1 = require("../DTOs/InputCreateComents.DTO");
class ComentsController {
    constructor(comentsBusinnes) {
        this.comentsBusinnes = comentsBusinnes;
        this.createNewComents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = InputCreateComents_DTO_1.InputCreateComentsSchema.parse(req.body);
                const result = yield this.comentsBusinnes.addComentInDB(data);
                res.status(200).send(result);
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
exports.ComentsController = ComentsController;
//# sourceMappingURL=ComentsController.js.map