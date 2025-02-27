import React from 'react';

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-5">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm">
                <div className="text-red-500 text-5xl mb-4">❌</div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Oops! Something went wrong.</h1>
                <p className="text-gray-600 mb-6">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <a 
                    href="/" 
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-300 inline-block"
                >
                    Go to Home
                </a>
            </div>
        </div>
    );
};

export default Error;
