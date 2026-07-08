import api from "./axios";


export const registerUser = (
    data:{
        name:string;
        email:string;
        password:string;
    }
) => {


    return api.post(
        "/auth/register",
        data
    );


};



export const loginUser = (
    data:{
        email:string;
        password:string;
    }
) => {


    return api.post(
        "/auth/login",
        data
    );


};

export const getCurrentUser = () => {


    return api.get(
        "/auth/me"
    );


};
export const logoutUser = (
    refreshToken:string
) => {


    return api.post(
        "/auth/logout",
        {
            refreshToken
        }
    );


};