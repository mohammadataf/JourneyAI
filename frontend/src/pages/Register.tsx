import { useState } from "react";

import { registerUser } from "../api/auth.api";


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

        <div className="min-h-screen flex items-center justify-center">


            <form
                onSubmit={handleRegister}

                className="flex flex-col gap-4 w-80"
            >


                <h1 className="text-3xl font-bold">

                    Create Account

                </h1>



                <input

                    className="border p-2"

                    placeholder="Name"

                    value={name}

                    onChange={
                        (e)=>setName(e.target.value)
                    }

                />



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

                    Register


                </button>


            </form>


        </div>

    );


};


export default Register;