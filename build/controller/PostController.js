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
exports.PostController = void 0;
const Post_1 = require("../models/Post");
const zod_1 = require("zod");
const BaseError_1 = require("../error/BaseError");
class PostController {
    constructor(postBusinnes) {
        this.postBusinnes = postBusinnes;
        this.insertPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization, contents } = Post_1.inputPostSchemma.parse({
                    authorization: req.headers.authorization,
                    contents: req.body.contents,
                });
                const response = yield this.postBusinnes.insertPost(authorization, contents);
                res.status(201).send(response);
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
        this.getAllPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = Post_1.inputGetAllPostSchemma.parse({
                    authorization: req.headers.authorization,
                });
                const response = yield this.postBusinnes.getAllPosts(authorization);
                res.status(201).send(response);
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
        this.findPostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization, id } = Post_1.inputFindPostByIdSchemma.parse({
                    authorization: req.headers.authorization,
                    id: req.params.id,
                });
                const response = yield this.postBusinnes.findPostById(authorization, id);
                res.status(201).send(response);
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
        this.addLikeDislike = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization, id, like } = Post_1.inputLikeSchemma.parse({
                    authorization: req.headers.authorization,
                    id: req.params.id,
                    like: req.body.like,
                });
                const response = yield this.postBusinnes.addLikeDislike(authorization, id, like);
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
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map