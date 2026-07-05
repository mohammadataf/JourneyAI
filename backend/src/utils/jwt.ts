import jwt, { JwtPayload } from "jsonwebtoken";


export const generateAccessToken = (
    userId:string
) => {

    return jwt.sign(
        {
            id:userId
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn:"15m"
        }
    );

};



export const generateRefreshToken = (
    userId:string
) => {

    return jwt.sign(
        {
            id:userId
        },
        process.env.JWT_REFRESH_SECRET as string,
        {
            expiresIn:"7d"
        }
    );

};

export const verifyRefreshToken = (
    token:string
) => {


    const decoded = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET as string
    ) as JwtPayload;


    return decoded;


};