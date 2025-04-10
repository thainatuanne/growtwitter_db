import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HTTPError } from "../utils/http.error";
import { getJwtSecret } from "./getJwtSecret";

export interface AuthenticatedRequest extends Request {
    userId?: number;
}

export const authMiddleware = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new HTTPError(401, "Token não fornecido.");
        }

        const parts = authHeader.split(" ");
        if (parts.length !== 2) {
            throw new HTTPError(401, "Token mal formatado.");
        }

        const [prefix, token] = parts;
        if (prefix !== "Bearer") {
            throw new HTTPError(401, "Token mal formatado.");
        }

        const decoded = jwt.verify(
            token,
            getJwtSecret()
        ) as { id: number };

        req.userId = decoded.id;
        next();
    } catch (error) {
        next(error);
    }
};
