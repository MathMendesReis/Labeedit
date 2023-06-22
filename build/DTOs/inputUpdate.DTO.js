"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputUpdateSchema = void 0;
const zod_1 = require("zod");
exports.InputUpdateSchema = zod_1.z.object({
    id: zod_1.z.string().nonempty('O campo "id" é obrigatório.'),
    apelido: zod_1.z.string().optional(),
    email: zod_1.z.string().email('Insira um e-mail válido.').optional(),
});
//# sourceMappingURL=inputUpdate.DTO.js.map