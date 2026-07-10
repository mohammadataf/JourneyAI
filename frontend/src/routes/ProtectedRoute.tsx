import { Navigate } from "react-router-dom";

import type { ReactNode } from "react";


interface Props {

    children: ReactNode;

}


const ProtectedRoute = ({
    children
}: Props) => {


    const token =
        localStorage.getItem(
            "accessToken"
        );


    if(!token){


        return (

            <Navigate 
                to="/login"
            />

        );

    }


    return children;


};


export default ProtectedRoute;