import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


type JwtPayload = {
    id: string;
};


export const authenticateUser = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {


    const authHeader = req.headers.authorization;


    if (!authHeader) {

        res.status(401).json({
            success: false,
            message: "Authentication token missing",
        });

        return;
    }


    const token = authHeader.split(" ")[1];


    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;


        req.user = {
            id: decoded.id,
        };


        next();


    } catch (error) {

        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });

    }
};