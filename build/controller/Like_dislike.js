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
exports.Like_dislikeController = void 0;
const zod_1 = require("zod");
const BaseError_1 = require("../error/BaseError");
const InputLike_DTO_1 = require("../DTOs/InputLike.DTO");
class Like_dislikeController {
    constructor(likeDislikeBusinnes) {
        this.likeDislikeBusinnes = likeDislikeBusinnes;
        this.likeDislike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = InputLike_DTO_1.inputLikeDislikeSchema.parse(req.body);
                const result = yield this.likeDislikeBusinnes.addNewLike(data);
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
exports.Like_dislikeController = Like_dislikeController;
//# sourceMappingURL=Like_dislike.js.map