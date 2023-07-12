"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comentsRouter = void 0;
const express_1 = require("express");
const TokenManager_1 = require("../services/TokenManager");
const UserDataBase_1 = require("../database/UserDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
const ComentsController_1 = require("../controller/ComentsController");
const ComentsBusinnes_1 = require("../business/ComentsBusinnes");
const ComentsDataBase_1 = require("../database/ComentsDataBase");
exports.comentsRouter = (0, express_1.Router)();
const comentsController = new ComentsController_1.ComentsController(new ComentsBusinnes_1.ComentsBusiness(new TokenManager_1.TokenManager(), new UserDataBase_1.UserDataBase(), new IdGenerator_1.IdGenerator(), new ComentsDataBase_1.ComentDataBase()));
exports.comentsRouter.post('/:id', comentsController.insertComents);
exports.comentsRouter.post('/likes/:id', comentsController.insertLike);
exports.comentsRouter.get('/:id', comentsController.getComentsByPostId);
//# sourceMappingURL=comentsRouter.js.map