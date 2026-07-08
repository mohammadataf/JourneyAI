import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { 
    getCurrentUser,
    logoutUser
} from "../api/auth.api";



const Dashboard = () => {


    const navigate = useNavigate();



    useEffect(()=>{


        const fetchUser = async()=>{


            const response =
                await getCurrentUser();


            console.log(
                response.data
            );


        };


        fetchUser();


    },[]);




    const handleLogout = async()=>{


        const refreshToken =
            localStorage.getItem(
                "refreshToken"
            );



        if(refreshToken){


            await logoutUser(
                refreshToken
            );


        }



        localStorage.removeItem(
            "accessToken"
        );


        localStorage.removeItem(
            "refreshToken"
        );



        navigate(
            "/login"
        );


    };




    return (

        <div className="p-10">


            <h1 className="text-3xl font-bold">

                Dashboard

            </h1>



            <button

                onClick={handleLogout}

                className="mt-5 bg-red-500 text-white px-4 py-2"

            >

                Logout

            </button>


        </div>

    );


};


export default Dashboard;