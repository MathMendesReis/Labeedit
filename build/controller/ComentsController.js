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
const Coments_1 = require("../models/Coments");
class ComentsController {
    constructor(comentsBusiness) {
        this.comentsBusiness = comentsBusiness;
        this.insertComents = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization, contents, id } = Coments_1.inputNewComentSchemma.parse({
                    authorization: req.headers.authorization,
                    contents: req.body.contents,
                    id: req.params.id,
                });
                const response = yield this.comentsBusiness.insertComents(authorization, contents, id);
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
        this.insertLike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization, id, like, post_id } = Coments_1.inputNewLikeSchemma.parse({
                    authorization: req.headers.authorization,
                    id: req.params.id,
                    post_id: req.body.post_id,
                    like: req.body.like,
                });
                const response = yield this.comentsBusiness.addLikeDislike(authorization, id, post_id, like);
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
        this.getComentsByPostId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization, id } = Coments_1.inputGetComentsSchemma.parse({
                    authorization: req.headers.authorization,
                    id: req.params.id,
                });
                const response = yield this.comentsBusiness.getComentsByPostId(authorization, id);
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
exports.ComentsController = ComentsController;
//# sourceMappingURL=ComentsController.js.map