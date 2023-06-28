"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comentsRouter = void 0;
const express_1 = require("express");
const ComentsController_1 = require("../controller/ComentsController");
const ComentsBusinnes_1 = require("../business/ComentsBusinnes");
const TokenManager_1 = require("../services/TokenManager");
const ComentsDataBase_1 = require("../database/ComentsDataBase");
const IdGenerator_1 = require("../services/IdGenerator");
exports.comentsRouter = (0, express_1.Router)();
const comentsController = new ComentsController_1.ComentsController(new ComentsBusinnes_1.ComentsBusiness(new TokenManager_1.TokenManager(), new ComentsDataBase_1.ComentsDataBase(), new IdGenerator_1.IdGenerator()));
exports.comentsRouter.post('/', comentsController.createNewComents);
//# sourceMappingURL=comentsRouter.js.map