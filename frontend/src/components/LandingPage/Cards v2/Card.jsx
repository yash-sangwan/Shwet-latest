import React, { useRef, useState } from 'react';

const Card = ({ heading, video, isWhite, color }) => {
  const videoRef = useRef(null);
  const [isDoubleClick, setIsDoubleClick] = useState(false);

  const handleMouseEnter = () => {
    videoRef.current.play();
  };

  const handleMouseLeave = () => {
    videoRef.current.pause();
  };

  const handleDoubleClick = () => {
    setIsDoubleClick(true);
    setTimeout(() => setIsDoubleClick(false), 300); // Reset after showing hand cursor
  };

  return (
    <div
      className={`indivcard relative h-full md:max-h-[600px] md:w-[370px] lg:w-[400px] w-[350px] flex flex-col justify-between rounded-xl shadow-lg ${isDoubleClick ? 'cursor-pointer' : 'cursor-ew-resize'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      style={{overflow: 'auto', userSelect: 'none', backgroundColor : color }} // Disable text selection
    >
      {/* Video as Background */}
      <video
        ref={videoRef}
        src={video}
        className="absolute bottom-0 w-full h-[70%] object-cover"
        loop
        muted
        playsInline
      />

      {/* Content Overlay */}
      <div className="relative z-10 p-6">
        <h3
          className={`text-3xl md:text-4xl font-bold mb-4 ${
            isWhite ? 'text-white' : 'text-black'
          }`}
        >
          {heading}
        </h3>
      </div>

      {/* Optional Overlay for gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-0"></div>
    </div>
  );
};

export default Card;
