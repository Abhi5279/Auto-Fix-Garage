import React from 'react';
import { Link } from 'react-router-dom';

const Hero = ({ scrollToServices }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <section className="text-white min-h-screen flex items-center justify-center px-6 ">
            <div className="max-w-3xl text-center">
                <h1 className="text-3xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    Your Car Deserves the Best
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-8">
                    Expert Care, Honest Service, Every Time.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <Link to="/form">
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                            Book Appointment
                        </button>
                    </Link>
                    <button
                        onClick={scrollToServices}
                        className="border border-yellow-500 hover:bg-yellow-500 hover:text-black text-yellow-500 font-semibold px-6 py-3 rounded-full transition-all duration-300"
                    >
                        Explore Services
                    </button>
                </div>
                {user?.role === 'admin' && (
                    <div className="flex justify-center mt-6">
                        <Link to="/updateStatus">
                            <button className="border border-white hover:bg-gray-600 hover:border-collapse text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
                                Update Status
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Hero;
