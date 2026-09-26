import { useState } from "react";

import { registerUser } from "../api/auth.api";

import AuthLayout from "../layouts/AuthLayout";

import { Link } from "react-router-dom";


const Register = () => {


    const [name,setName] =
        useState("");


    const [email,setEmail] =
        useState("");


    const [password,setPassword] =
        useState("");



    const handleRegister = async(
        e:React.FormEvent
    )=>{


        e.preventDefault();


        try{


            const response =
                await registerUser({

                    name,

                    email,

                    password

                });



            console.log(
                response.data
            );


            alert(
                "Registration successful"
            );



        }
        catch(error){


            console.log(error);


            alert(
                "Registration failed"
            );

        }


    };



  return (

    <AuthLayout>


        <form
            onSubmit={handleRegister}

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

                Create Account

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

                placeholder="Name"

                value={name}

                onChange={
                    (e)=>setName(e.target.value)
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





            {/* Primary Action */}

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

                Start Journey 

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

                    Already exploring with us?

                </p>



                <Link

                    to="/login"

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

                    Continue Journey 

                </Link>


            </div>



        </form>


    </AuthLayout>

);


};


export default Register;