import { Request, Response } from "express";

import { registerSchema } from "../validators/register.validator";
import { registerUserService } from "../services/auth.service";

export const registerUser = (req: Request, res: Response): void => {
   
    const validationResult = registerSchema.safeParse(req.body);

  
    if (!validationResult.success) {
        res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: validationResult.error.flatten().fieldErrors,
        });

        return;
    }

    
   const result = registerUserService(validationResult.data);

    // Return successful response
    res.status(200).json(result);
};