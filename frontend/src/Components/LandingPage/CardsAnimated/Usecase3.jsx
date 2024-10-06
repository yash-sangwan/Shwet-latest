import React, { useRef, useState, useEffect } from "react";
import assets from "../../../assets/assets";

function Usecase4() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleMouseEnter = () => {
    playVideo();
  };

  const handleMouseLeave = () => {
    pauseVideo();
  };

  useEffect(() => {
    const handleTouchEnd = () => {
      pauseVideo();
    };

    // Add event listener for touchend globally
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      // Clean up the event listener
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div 
      className="w-full max-h-[320px] relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={playVideo}
      onTouchMove={playVideo} // Keep playing if dragged
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={true}
        playsInline={true}
        loop={true}
        preload="metadata"
      >
        <source src={assets.Usecase4} type="video/mp4" />
      </video>
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 text-white">
          {/* Optional: Play button or overlay */}
        </div>
      )}
    </div>
  );
}

export default Usecase4;
