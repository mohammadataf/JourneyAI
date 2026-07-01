import { Request, Response } from "express";

export const registerUser = (req: Request, res: Response): void => {
    const { name, email, password } = req.body;

    res.status(200).json({
        success: true,
           "message": "Registration request received successfully",
        data: {
    name,
    email
}
    });

};