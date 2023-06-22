"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inputDTOSchemma = void 0;
const zod_1 = require("zod");
exports.inputDTOSchemma = zod_1.z.object({
    content: zod_1.z.string(),
    token: zod_1.z.string().nonempty('user_id é um campo obrigatório '),
});
//# sourceMappingURL=inputCreatePost.DTO.js.map