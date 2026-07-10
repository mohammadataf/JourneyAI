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

    <div
        className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-emerald-950
        text-white
        px-8
        py-6
        "
    >


        {/* Navbar */}


        <nav
            className="
            flex
            justify-between
            items-center
            "
        >


            <h1
                className="
                text-3xl
                font-bold
                "
            >

                JourneyAI 

            </h1>



            <button

                onClick={handleLogout}

                className="
                bg-white/10
                border
                border-white/20
                px-5
                py-2
                rounded-lg

                hover:bg-red-500/30

                transition
                cursor-pointer
                "

            >

                Logout

            </button>


        </nav>





        {/* Hero */}


        <section
            className="
            max-w-5xl
            mx-auto
            mt-20
            "
        >


            <h2
                className="
                text-5xl
                font-bold
                leading-tight
                "
            >

                Don't just travel.
                <br />

                Experience the journey.

            </h2>




            <p
                className="
                text-gray-300
                mt-5
                text-lg
                max-w-xl
                "
            >

                Discover smarter routes filled with scenic places,
                food stops, viewpoints and memorable experiences.

            </p>





            {/* Journey Planner Card */}


            <div
                className="
                mt-10

                bg-white/10
                border
                border-white/20

                backdrop-blur-lg

                rounded-2xl

                p-6

                grid
                gap-4
                "
            >


                <input

                    placeholder="Where does your journey begin?"

                    className="
                    bg-white/10
                    rounded-lg

                    p-4

                    outline-none

                    placeholder:text-gray-400
                    "

                />



                <input

                    placeholder="Where is your adventure taking you?"

                    className="
                    bg-white/10
                    rounded-lg

                    p-4

                    outline-none

                    placeholder:text-gray-400
                    "

                />



                <button

                    className="
                    bg-emerald-500

                    rounded-lg

                    p-4

                    font-semibold

                    hover:bg-emerald-600
                    hover:scale-105

                    transition

                    cursor-pointer
                    "

                >

                    Plan My Journey 

                </button>


            </div>





            {/* Journey Modes */}


            <div
                className="
                grid
                grid-cols-3
                gap-6

                mt-10
                "
            >


                <div className="
                bg-white/10
                rounded-xl
                p-6
                ">

                    <h3 className="text-xl font-bold">

                        🚗 Fast Route

                    </h3>

                    <p className="text-gray-300 mt-2">

                        Reach your destination efficiently.

                    </p>

                </div>





                <div className="
                bg-white/10
                rounded-xl
                p-6
                ">

                    <h3 className="text-xl font-bold">

                        🏔 Scenic Journey

                    </h3>

                    <p className="text-gray-300 mt-2">

                        Find views, nature and hidden gems.

                    </p>

                </div>





                <div className="
                bg-white/10
                rounded-xl
                p-6
                ">

                    <h3 className="text-xl font-bold">

                        ☕ Explore Mode

                    </h3>

                    <p className="text-gray-300 mt-2">

                        Discover cafes, stays and experiences.

                    </p>

                </div>


            </div>



        </section>


    </div>

);

};


export default Dashboard;