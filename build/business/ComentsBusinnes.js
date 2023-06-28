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
exports.ComentsBusiness = void 0;
const BadRequestError_1 = require("../error/BadRequestError");
const Coments_1 = require("../models/Coments");
class ComentsBusiness {
    constructor(tokenMnager, comentsDataBase, idGenarator) {
        this.tokenMnager = tokenMnager;
        this.comentsDataBase = comentsDataBase;
        this.idGenarator = idGenarator;
        this.addComentInDB = (data) => __awaiter(this, void 0, void 0, function* () {
            const payload = this.tokenMnager.getPayload(data.token);
            if (payload === null) {
                throw new BadRequestError_1.BadRequestError('token invalido');
            }
            const id = this.idGenarator.generate();
            const comentsDB = new Coments_1.Coments(id, payload.id, data.id, data.contents);
            yield this.comentsDataBase.addComents(comentsDB);
            return {
                message: 'Create Post sucessuful',
            };
        });
    }
}
exports.ComentsBusiness = ComentsBusiness;
//# sourceMappingURL=ComentsBusinnes.js.map