import React, { useRef, useState, useEffect } from "react";
import assets from "../../../assets/assets";

function Graph() {
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
      className="w-full h-full relative"
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
      onTouchStart={playVideo}
      onTouchMove={playVideo} // Keep playing if dragged
    >
      <video
        ref={videoRef}
        className="w-full h-full object-fill"
        muted={true}
        playsInline={true}
        loop={true}
        preload="metadata"
      >
        <source src={assets.ShwetUseCase3} type="video/mp4" />
      </video>
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 text-white">
        </div>
      )}
    </div>
  );
}

export default Graph;
