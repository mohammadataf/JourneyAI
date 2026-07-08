import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth.api";



const Login = () => {


    const navigate = useNavigate();


    const [email,setEmail] =
        useState("");


    const [password,setPassword] =
        useState("");



    const handleLogin = async(
        e:React.FormEvent
    )=>{


        e.preventDefault();



        try{

const response =
    await loginUser({

        email,

        password

    });


console.log(response.data);


const {
    accessToken,
    refreshToken
} = response.data;



localStorage.setItem(
    "accessToken",
    accessToken
);


localStorage.setItem(
    "refreshToken",
    refreshToken
);



navigate(
    "/dashboard"
);



        }
        catch(error){


            console.log(error);


            alert(
                "Invalid login"
            );

        }


    };



    return (

        <div className="min-h-screen flex items-center justify-center">


            <form

                onSubmit={handleLogin}

                className="flex flex-col gap-4 w-80"
            >



                <h1 className="text-3xl font-bold">

                    Login

                </h1>




                <input

                    className="border p-2"

                    placeholder="Email"

                    value={email}

                    onChange={
                        (e)=>setEmail(e.target.value)
                    }

                />




                <input

                    className="border p-2"

                    placeholder="Password"

                    type="password"

                    value={password}

                    onChange={
                        (e)=>setPassword(e.target.value)
                    }

                />




                <button

                    className="bg-black text-white p-2"

                >

                    Login

                </button>



            </form>


        </div>

    );


};



export default Login;