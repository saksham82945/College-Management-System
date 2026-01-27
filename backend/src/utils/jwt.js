"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyAccessToken = exports.generateTokens = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../config/index");
const generateTokens = (payload) => {
    const signOptions = {
        expiresIn: index_1.config.jwt.expiresIn,
    };
    const accessToken = jsonwebtoken_1.default.sign(payload, index_1.config.jwt.secret, signOptions);
    const refreshSignOptions = {
        expiresIn: index_1.config.jwt.refreshExpiresIn,
    };
    const refreshToken = jsonwebtoken_1.default.sign(payload, index_1.config.jwt.refreshSecret, refreshSignOptions);
    return { accessToken, refreshToken };
};
exports.generateTokens = generateTokens;
const verifyAccessToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, index_1.config.jwt.secret);
    }
    catch (error) {
        return null;
    }
};
exports.verifyAccessToken = verifyAccessToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, index_1.config.jwt.refreshSecret);
    }
    catch (error) {
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
