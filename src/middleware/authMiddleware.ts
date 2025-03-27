import {Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "MANAGEDISEASE";
declare global{
    namespace Express{
        interface Request{
            user?: string | JwtPayload;
        }
    }
}



const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.split(" ")[1];
    if (!token) {
         res.status(401).send({ error: "Access denied. No token provided." });
         return;
        }  
        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            req.user = decoded;
            console.log('decoded :', decoded);
            next();
            } catch (error) {
                res.status(401).send({ error: "Access denied. Invalid token.", errorMesage: error });
                return;
                }
    }

    export default authMiddleware;

