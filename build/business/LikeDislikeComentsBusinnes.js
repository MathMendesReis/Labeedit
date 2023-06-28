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
exports.LikeDislikeComentsBusinnes = void 0;
const BadRequestError_1 = require("../error/BadRequestError");
const LikeDislikeComents_1 = require("../models/LikeDislikeComents");
class LikeDislikeComentsBusinnes {
    constructor(tokenManager, likeDislikeComentsDataBse) {
        this.tokenManager = tokenManager;
        this.likeDislikeComentsDataBse = likeDislikeComentsDataBse;
        this.addNewLike = (data) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenManager.getPayload(data.token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('invalid token');
            }
            const [verification] = yield this.likeDislikeComentsDataBse.findLikeByUserIdAndComentsID(payload.id, data.coments_id);
            const newLike = new LikeDislikeComents_1.LikeDislikeComents(payload.id, data.coments_id, data.like);
            if (verification) {
                return yield this.likeDislikeComentsDataBse.updateLike(newLike);
            }
            else {
                return yield this.likeDislikeComentsDataBse.addNewLike(newLike);
            }
        });
    }
}
exports.LikeDislikeComentsBusinnes = LikeDislikeComentsBusinnes;
//# sourceMappingURL=LikeDislikeComentsBusinnes.js.map