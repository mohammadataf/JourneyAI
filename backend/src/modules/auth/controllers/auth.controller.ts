import { Request, Response } from "express";

import { registerSchema } from "../validators/register.validator";
import { registerUserService } from "../services/auth.service";
import { loginSchema } from "../validators/login.validator";
import { loginUserService } from "../services/auth.service";

export const registerUser = async (
    req: Request,
    res: Response
): Promise<void> => {

    const validationResult = registerSchema.safeParse(req.body);

    if (!validationResult.success) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validationResult.error.flatten().fieldErrors,
        });

        return;
    }

    const result = await registerUserService(validationResult.data);

    res.status(200).json(result);
};



export const loginUser = async (
    req: Request,
    res: Response
): Promise<void> => {


    const validationResult = loginSchema.safeParse(
        req.body
    );


    if (!validationResult.success) {

        res.status(400).json({
            success:false,
            message:"Validation failed",
            errors:
            validationResult.error.flatten().fieldErrors,
        });

        return;
    }


    const result = await loginUserService(
        validationResult.data.email,
        validationResult.data.password
    );


    res.status(200).json(result);
};