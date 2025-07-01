import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Landing = () => {
   
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/register");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative bg-gray-800 h-screen w-full flex justify-center items-center">
      <div className="text-6xl text-gray-300 font-bold animate-pulse">
        <h2>Bienvenido</h2>
      </div>
      <div className="absolute bottom-6 w-full flex justify-center">
        <h2 className="text-gray-500">© 2025 REBECA CARRIZO BOURLOT</h2>
      </div>
    </div>
  )
}

export default Landing