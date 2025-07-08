import React from 'react';
import { useNavigate } from 'react-router-dom';

const First = () => {
  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center bg-white min-h-screen  p-6">
      <div className="relative backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-2xl text-center border border-white/50 overflow-hidden">

        {/* Decorative Blobs (More visible) */}
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-orange-500 opacity-30 rounded-full blur-[100px] z-0"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-orange-500 opacity-30 rounded-full blur-[100px] z-0"></div>

        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-6 tracking-tight">
            Welcome to the Admin Panel
          </h1>

          <p className="text-lg text-gray-800 mb-2">
            This is your central hub for managing settings, users, and much more.
          </p>
          <p className="text-md text-gray-800 mb-8">
            Click the button below to access the admin dashboard.
          </p>

          <button
            onClick={handleAdminClick}
            className="mt-4 px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-lg font-semibold rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-400 focus:ring-opacity-50"
          >
            Go to Admin Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default First;
