import { Request, Response, NextFunction } from "express";

interface UserPayload {
    id: string,
    email: string;
}
// Extend the Request interface to include currentUser
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

import jwt from "jsonwebtoken";

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session?.jwt) {
        return next();
    }
    
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
        req.currentUser = payload as UserPayload;
    } catch (err) {
        console.error(err);
    }
    
    next();
    }