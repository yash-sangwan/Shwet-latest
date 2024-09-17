import React, { useRef, useState } from 'react';

const Card = ({ heading, video, isWhite }) => {
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
      className={`relative w-[70vw] md:w-[50vw] lg:w-[30vw] h-[50vh] md:h-[70vh] lg:h-[70vh] bg-[#AB9FF2] rounded-xl shadow-lg overflow-hidden transition transform hover:-translate-y-2 hover:shadow-2xl duration-300 ease-in-out select-none ${isDoubleClick ? 'cursor-pointer' : 'cursor-ew-resize'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onDoubleClick={handleDoubleClick}
      style={{ resize: 'horizontal', overflow: 'auto', userSelect: 'none' }} // Disable text selection
    >
      {/* Video as Background */}
      <video
        ref={videoRef}
        src={video}
        className="absolute inset-0 w-full h-full object-cover"
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
