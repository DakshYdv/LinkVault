import { NextFunction, Request, Response } from "express";
import jwt, { decode } from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const JWT_PASSWORD = process.env.JWT_PASSWORD

interface CustomRequest extends Request {
    user?: string | object
}

export const userMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    const header = req.headers['authorization'];
    if (!header) {
        console.log("didn't receice header");
        return
    }
    console.log(header);
    const decoded = jwt.verify(header, JWT_PASSWORD as string)
    console.log(decoded);
    req.user = { username: decoded}
    if (!decoded) {
        res.status(403).json({
            message: "user not logged in"
        })
        return
    }
    next()
}