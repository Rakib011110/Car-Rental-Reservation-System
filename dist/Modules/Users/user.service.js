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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = require("./user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = payload, rest = __rest(payload, ["password"]);
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const userData = Object.assign(Object.assign({}, rest), { password: hashedPassword, role: payload.role || "user" });
    try {
        const newUser = yield user_model_1.User.create(userData);
        return newUser;
    }
    catch (err) {
        throw new Error(`Error creating user: ${err.message}`);
    }
});
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.User.findOne({ email });
        return user;
    }
    catch (err) {
        throw new Error(`Error finding user: ${err.message}`);
    }
});
exports.UserService = {
    createUserIntoDB,
    findUserByEmail,
};
