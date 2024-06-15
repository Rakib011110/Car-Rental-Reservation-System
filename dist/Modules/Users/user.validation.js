"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInSchema = exports.SignUpSchema = void 0;
const zod_1 = require("zod");
exports.SignUpSchema = (0, zod_1.object)({
    name: (0, zod_1.string)(),
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(6),
});
exports.SignInSchema = (0, zod_1.object)({
    email: (0, zod_1.string)().email(),
    password: (0, zod_1.string)().min(6),
});
