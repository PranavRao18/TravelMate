import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <div>
                <Link
                    to="/login"
                    className="w-full flex justify-center">
                    <button className="bg-white text-black py-1 px-4 rounded-[10px] sm:rounded-[15px] font-medium text-2xl hover:scale-110 flex flex-col justify-center items-center">
                        LOGIN
                    </button>
                </Link>
            </div>
            <div>
                <Link
                    to="/register"
                    className="w-full flex justify-center">
                    <button className="bg-white text-black py-1 px-4 rounded-[10px] sm:rounded-[15px] font-medium text-2xl hover:scale-110 flex flex-col justify-center items-center">
                        SIGNUP
                    </button>
                </Link>
            </div>
        </>
    )
}

export default Home
