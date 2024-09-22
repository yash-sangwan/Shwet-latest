import React, { useEffect, useRef, useState } from "react";
import assets from "../../assets/assets";

function AnimatedDashboardPreview({ margintop }) {
  const imgRef = useRef(null);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isLarge, setIsLarge] = useState(window.innerWidth > 768);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setIsLarge(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldAnimate(true);
        }
      },
      {
        threshold: 0.5, // Trigger when 50% of the image is visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [imgRef]);

  return (
    <>
      {isLarge ? (
        <section className={`relative ${margintop} w-full flex flex-col items-center justify-center`}>
          <div className={`container relative flex flex-col items-center backdrop-container`}>
            <img
              ref={imgRef}
              src={assets.MediaNetImage}
              className={`slanted-div ${shouldAnimate ? "animate" : ""} glowing-border transition-transform translate-z-10 image-fade`}
              alt="Media Preview"
            />
          </div>
        </section>
      ) : (
        <video
          className="md:hidden lg:hidden"
          muted={true}
          playsInline={true}
          loop={true}
          autoPlay={true}
          preload="metadata"
        >
          <source src={assets.Video} type="video/webm" />
        </video>
      )}
    </>
  );
}

export default AnimatedDashboardPreview;
