"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputLikeDislikeSchemma = void 0;
const zod_1 = require("zod");
exports.inputLikeDislikeSchemma = zod_1.z.object({
    token: zod_1.z
        .string()
        .nonempty('O campo user_id é obrigatório e não pode estar vazio.'),
    post_id: zod_1.z
        .string()
        .nonempty('O campo user_id é obrigatório e não pode estar vazio.'),
    type: zod_1.z
        .number()
        .nonnegative()
        .refine((value) => value === 0 || value === 1, {
        message: 'O campo type deve ser igual a 0 ou 1.',
    }),
});
//# sourceMappingURL=inputCreateLIkeDislike.DTO.js.map