import prisma from "../../../config/prisma";

type RegisterUserData = {
    name: string;
    email: string;
    password: string;
};

export const registerUserService = async (user: RegisterUserData) => {

    // Check if user already exists
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

    return {
        success: true,
        message: "Registration request processed successfully.",
        data: {
            name: user.name,
            email: user.email,
        },
    };
};