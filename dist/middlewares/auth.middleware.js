"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_error_1 = require("../utils/http.error");
const getJwtSecret_1 = require("./getJwtSecret");
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new http_error_1.HTTPError(401, "Token não fornecido.");
        }
        const parts = authHeader.split(" ");
        if (parts.length !== 2) {
            throw new http_error_1.HTTPError(401, "Token mal formatado.");
        }
        const [prefix, token] = parts;
        if (prefix !== "Bearer") {
            throw new http_error_1.HTTPError(401, "Token mal formatado.");
        }
        const decoded = jsonwebtoken_1.default.verify(token, (0, getJwtSecret_1.getJwtSecret)());
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.authMiddleware = authMiddleware;
