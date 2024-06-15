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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.signIn = exports.signUp = void 0;
const user_service_1 = require("./user.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../app/config"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, role, password, phone, address } = req.body;
    try {
        const newUser = yield user_service_1.UserService.createUserIntoDB({
            name,
            email,
            role,
            password,
            phone,
            address,
        });
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            data: newUser,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            statusCode: 400,
            message: "Error registering user",
            error: error.message,
        });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield user_service_1.UserService.findUserByEmail(email);
        if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid credentials",
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, config_1.default.jwt_access_secret, { expiresIn: "1d" });
        if (user.role === "admin") {
            // Additional logic for admin login can be added here
            console.log("Admin has logged in");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User logged in successfully",
            data: user,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: "Error logging in",
            error: error.message,
        });
    }
});
exports.signIn = signIn;
exports.UserController = {
    signUp: exports.signUp,
    signIn: exports.signIn,
};
