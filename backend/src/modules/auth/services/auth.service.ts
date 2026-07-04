import bcrypt from "bcrypt";
import prisma from "../../../config/prisma";
import { generateToken } from "../../../utils/jwt";


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


    if (existingUser) {
        return {
            success: false,
            message: "Email already exists.",
        };
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
        return {
            success: false,
            message: "Invalid email or password",
        };
    }


    const isPasswordValid = await bcrypt.compare(
        password,
        user.password
    );


    if (!isPasswordValid) {
        return {
            success: false,
            message: "Invalid email or password",
        };
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