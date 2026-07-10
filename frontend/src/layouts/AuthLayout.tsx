import type { ReactNode } from "react";


interface Props {

    children: ReactNode;

}



const AuthLayout = ({
    children
}:Props)=>{


    return (

        <div className="
        min-h-screen
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-emerald-950
        flex
        items-center
        justify-center
        px-4
        ">


            <div className="
            w-full
            max-w-md
            bg-white/10
            backdrop-blur-lg
            rounded-2xl
            shadow-2xl
            p-8
            border
            border-white/20
            ">


                <h1 className="
                text-4xl
                font-bold
                text-white
                text-center
                mb-2
                ">

                    JourneyAI

                </h1>



                <p className="
                text-gray-300
                text-center
                mb-8
                ">

                    Discover smarter journeys

                </p>



                {children}


            </div>


        </div>

    );

};


export default AuthLayout;