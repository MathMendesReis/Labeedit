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
const inputCreatePost_DTO_1 = require("../DTOs/inputCreatePost.DTO");
const zod_1 = require("zod");
const BaseError_1 = require("../error/BaseError");
class PostController {
    constructor(postBusinnes) {
        this.postBusinnes = postBusinnes;
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token, contents } = inputCreatePost_DTO_1.createPostSchemma.parse(req.body);
                yield this.postBusinnes.createNewPost(token, contents);
                res.status(200).send({ message: 'create new post sucessulf' });
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
        this.getAllPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.postBusinnes.getAllPosts();
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
        this.findPostById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.postBusinnes.findPostById(id);
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
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            return 'ola mundo';
        });
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map