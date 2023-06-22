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
const zod_1 = require("zod");
const BaseError_1 = require("../error/BaseError");
const inputCreatePost_DTO_1 = require("../DTOs/inputCreatePost.DTO");
const inputDelete_DTO_1 = require("../DTOs/inputDelete.DTO");
const inputUpdatePost_DTO_1 = require("../DTOs/inputUpdatePost.DTO");
class PostController {
    constructor(postBusiness) {
        this.postBusiness = postBusiness;
        this.createPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = inputCreatePost_DTO_1.inputDTOSchemma.parse(req.body);
                yield this.postBusiness.createPost(input);
                res.status(200).send({ message: 'Post created successfully' });
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
        this.deletePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = inputDelete_DTO_1.InputDeleteByIdSchema.parse(req.body);
                yield this.postBusiness.deletePost(input);
                res.status(200).send({ message: 'Post delete successfully' });
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
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const input = inputUpdatePost_DTO_1.InputUpdatePostSchema.parse(req.body);
                yield this.postBusiness.updatePost(input);
                res.status(200).send({ message: ' Update post successfully' });
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
        this.getAllpost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.postBusiness.getAllpost();
                res.status(200).send(result);
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
        this.findPostByUserId = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const result = yield this.postBusiness.findPostByUserId(id);
                res.status(200).send(result);
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
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map