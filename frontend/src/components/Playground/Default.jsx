import React from "react";
import assets from "../../assets/assets";

export default function Default() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-white ">
      <div 
        className="relative bg-cover bg-no-repeat bg-center rounded-lg  flex flex-col items-center w-full max-w-[600px] aspect-[6/5]"
      >
        <img
          src={assets.playgroundLogo}
          alt="Playground Logo"
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-gray-800 bg-opacity-80 rounded-lg"></div>

       
      </div>
    </div>
  );
}