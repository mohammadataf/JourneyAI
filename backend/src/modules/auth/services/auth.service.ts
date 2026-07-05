import bcrypt from "bcrypt";
import prisma from "../../../config/prisma";
import { generateToken } from "../../../utils/jwt";
import AppError from "../../../utils/AppError";


type RegisterUserData = {
    name: string;
    email: string;
    password: string;
};


export const registerUserService = async (
    user: RegisterUserData
) => {

    const existingUser = await prisma.user.findUnique({
        where: {
            email: user.email,
        },
    });


    if(existingUser){

    throw new AppError(
        "Email already exists",
        409
    );

}

    const hashedPassword = await bcrypt.hash(
        user.password,
        10
    );


    const createdUser = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: hashedPassword,
        },
    });


    return {
        success: true,
        message: "User registered successfully.",
        data: {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
        },
    };
};
export const loginUserService = async (
    email: string,
    password: string
) => {


    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });


    if (!user) {
       throw new AppError(
    "Invalid email or password",
    401
);
    }


    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );

if(!isPasswordValid){
    throw new AppError(
        "Invalid email or password",
        401
    );
}


  const token = generateToken(user.id);


return {

    success: true,

    message: "Login successful",

    token,

    data: {

        id: user.id,

        name: user.name,

        email: user.email,
    },
};
};

export const getCurrentUserService = async (
    userId: string
) => {


    const user = await prisma.user.findUnique({

        where: {
            id: userId,
        },


        select: {

            id: true,

            name: true,

            email: true,

            createdAt: true,

        },

    });


    if (!user) {

        return {

            success: false,

            message: "User not found",

        };

    }


    return {

        success: true,

        message: "User fetched successfully",

        data: user,

    };

};