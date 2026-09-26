import bcrypt from "bcrypt";

import prisma from "../../../config/prisma";

import AppError from "../../../utils/AppError";

import {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken
} from "../../../utils/jwt";


// REGISTER USER
export const registerUserService = async (data: {
    name:string;
    email:string;
    password:string;
}) => {


    const existingUser = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    });


    if(existingUser){

        throw new AppError(
            "User already exists",
            409
        );

    }


    const hashedPassword = await bcrypt.hash(
        data.password,
        10
    );


    const user = await prisma.user.create({

        data:{
            name:data.name,
            email:data.email,
            password:hashedPassword
        },


        select:{
            id:true,
            name:true,
            email:true,
            createdAt:true
        }

    });


    return user;

};



// LOGIN USER
export const loginUserService = async(data:{
    email:string;
    password:string;
}) => {


    const user = await prisma.user.findUnique({

        where:{
            email:data.email
        }

    });



    if(!user){

        throw new AppError(
            "Invalid email or password",
            401
        );

    }



    const isPasswordCorrect =
        await bcrypt.compare(
            data.password,
            user.password
        );



    if(!isPasswordCorrect){

        throw new AppError(
            "Invalid email or password",
            401
        );

    }



    const accessToken =
        generateAccessToken(user.id);



    const refreshToken =
        generateRefreshToken(user.id);



    await prisma.refreshToken.create({

        data:{

            token:refreshToken,

            userId:user.id

        }

    });



    return {

        accessToken,

        refreshToken

    };


};




// CURRENT USER
export const getCurrentUserService = async(
    userId:string
) => {


    const user = await prisma.user.findUnique({

        where:{
            id:userId
        },


        select:{

            id:true,

            name:true,

            email:true,

            createdAt:true

        }

    });



    if(!user){

        throw new AppError(
            "User not found",
            404
        );

    }


    return user;

};







export const refreshTokenService = async(
    token:string
) => {


    const savedToken =
        await prisma.refreshToken.findUnique({

            where:{
                token
            }

        });



    if(!savedToken){

        throw new AppError(
            "Invalid refresh token",
            401
        );

    }



    const decoded =
        verifyRefreshToken(token);



    const accessToken =
        generateAccessToken(
            decoded.id
        );



    return {
        accessToken
    };


};






export const logoutUserService = async(
    token:string
) => {


    await prisma.refreshToken.deleteMany({

        where:{

            token:token

        }

    });



    return {
        message:"Logged out successfully"
    };


};