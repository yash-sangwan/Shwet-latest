import React, { useRef } from "react";

const Card = ({ heading, image, color }) => {
  const imageRef = useRef(null);

  return (
    <div
      className="indivcard relative flex flex-col h-full md:max-h-[600px] md:w-[370px] lg:w-[400px] w-[350px] rounded-xl shadow-lg overflow-hidden"
      style={{ backgroundColor: color }}
    >
      {/* Heading */}
      <div className="relative z-10 p-6">
        <h3 className="text-3xl md:text-3xl font-bold mb-4 font-Montserrat">
          {heading}
        </h3>
      </div>

      {/* Image Container */}
      <div className="flex-grow relative overflow-hidden flex justify-center">
        <img
          ref={imageRef}
          src={image}
          alt={heading}
          className="w-[95%] h-full object-fill select-none rounded-t-xl"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
      </div>
    </div>
  );
};

export default Card;