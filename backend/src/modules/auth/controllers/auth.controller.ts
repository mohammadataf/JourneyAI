import { Request, Response } from "express";

import { registerSchema } from "../validators/register.validator";
import { loginSchema } from "../validators/login.validator";

import {
    registerUserService,
    loginUserService,
    getCurrentUserService,
} from "../services/auth.service";

import { asyncHandler } from "../../../utils/asyncHandler";



// Register Controller

export const registerUser = asyncHandler(

    async (
        req: Request,
        res: Response
    ) => {


        const validationResult =
            registerSchema.safeParse(req.body);



        if (!validationResult.success) {


            res.status(400).json({

                success: false,

                message: "Validation failed",

                errors:
                    validationResult.error.flatten().fieldErrors,

            });


            return;

        }



        const result = await registerUserService(
            validationResult.data
        );



        res.status(201).json(result);

    }

);




// Login Controller

export const loginUser = asyncHandler(

    async (
        req: Request,
        res: Response
    ) => {


        const validationResult =
            loginSchema.safeParse(req.body);



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


    }

);




// Current User Controller

export const getCurrentUser = asyncHandler(

    async (
        req: Request,
        res: Response
    ) => {


        const result = await getCurrentUserService(

            req.user!.id

        );



        res.status(200).json(result);


    }

);