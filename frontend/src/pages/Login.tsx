import { useState } from "react";

import { 
    Link,
    useNavigate
} from "react-router-dom";

import { loginUser } from "../api/auth.api";

import AuthLayout from "../layouts/AuthLayout";


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

    <AuthLayout>


        <form
            onSubmit={handleLogin}

            className="
            flex
            flex-col
            gap-4
            "
        >


            <h2
                className="
                text-2xl
                font-semibold
                text-white
                text-center
                "
            >

                Welcome Back

            </h2>



            <input

                className="
                bg-white/10
                border
                border-white/20
                rounded-lg
                p-3
                text-white
                outline-none
                placeholder:text-gray-400

                focus:border-emerald-400
                focus:ring-2
                focus:ring-emerald-400/30

                transition
                "

                placeholder="Email"

                value={email}

                onChange={
                    (e)=>setEmail(e.target.value)
                }

            />



            <input

                className="
                bg-white/10
                border
                border-white/20
                rounded-lg
                p-3
                text-white
                outline-none
                placeholder:text-gray-400

                focus:border-emerald-400
                focus:ring-2
                focus:ring-emerald-400/30

                transition
                "

                placeholder="Password"

                type="password"

                value={password}

                onChange={
                    (e)=>setPassword(e.target.value)
                }

            />




            {/* Primary Button */}

            <button

                className="
                bg-emerald-500
                hover:bg-emerald-600

                hover:scale-105
                active:scale-95

                transition
                duration-200

                rounded-lg
                p-3

                text-white
                font-semibold

                cursor-pointer
                "

            >

                Continue Journey 

            </button>




            {/* Secondary Action */}


            <div

                className="
                mt-2
                flex
                flex-col
                gap-3
                "

            >


                <p

                    className="
                    text-gray-300
                    text-sm
                    text-center
                    "

                >

                    New to JourneyAI?

                </p>



                <Link

                    to="/register"

                    className="
                    bg-white/10

                    border
                    border-white/20

                    rounded-lg

                    p-3

                    text-center

                    text-white
                    font-medium


                    hover:bg-white/20
                    hover:border-emerald-400

                    hover:scale-105
                    active:scale-95

                    transition
                    duration-200

                    cursor-pointer
                    "

                >

                    Create Account 

                </Link>



            </div>



        </form>


    </AuthLayout>

);


};



export default Login;