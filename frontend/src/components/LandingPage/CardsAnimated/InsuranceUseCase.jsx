import React, { useState } from 'react';
import assets from '../../../assets/assets';

function InsuranceUseCase() {
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);

  const handleMouseEnter = () => {
    setOverlayOpacity(0); // Light up the image
  };

  const handleMouseLeave = () => {
    setOverlayOpacity(0.5); // Darken the image
  };

  const handleTouchStart = () => {
    setOverlayOpacity(0); // Light up the image on touch
  };

  const handleTouchEnd = () => {
    setOverlayOpacity(0.5); // Darken the image when touch ends
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <img 
        className="w-full h-full object-cover transition-opacity duration-300" 
        src={assets.ShwetUseCase2} 
        alt="Insurance Use Case" 
      />
      <div 
        className="absolute inset-0 bg-black transition-opacity duration-300" 
        style={{ opacity: overlayOpacity }}
      ></div>
    </div>
  );
}

export default InsuranceUseCase;
