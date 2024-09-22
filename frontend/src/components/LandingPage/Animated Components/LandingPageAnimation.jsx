import React, { useState, useEffect } from "react";

function LandingPageAnimation({animState, setAnimState}) {
//   const [animState, setAnimState] = useState(true);
  const [isShrunk, setIsShrunk] = useState(false);
  const [startLoading, setStartLoading] = useState(false);
  const [loading, setLoading] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false); 

  useEffect(() => {
    // Trigger the resize animation after a small delay (e.g., 700ms)
    const timer = setTimeout(() => {
      setIsShrunk(true);
      setStartLoading(true);
    }, 700);

    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  // Effect to update the loading value from 0 to 100
  useEffect(() => {
    if (startLoading) {
      const loadingInterval = setInterval(() => {
        setLoading((prevLoading) => {
          if (prevLoading < 100) {
            return prevLoading + 1; // Increment loading by 1
          } else {
            clearInterval(loadingInterval); // Stop when it reaches 100
 
            return 100;
          }
        });
      }, 25); // Update every 50ms for smooth loading
      
      // Clean up the interval when the component unmounts
      return () => clearInterval(loadingInterval);
    }
  }, [startLoading]);

  useEffect(() => {
    if (loading === 100) {
      setIsFadingOut(true);
      setTimeout(() => {
        setIsFadingOut(false);
        setAnimState(false)
      }, 700); // Duration of the fade-out (in ms)
    }
  }, [loading]);

  return (
    <div
        className={`h-screen w-screen bg-zinc-500 flex justify-center items-center transition-opacity duration-700 ${
        animState && !isFadingOut ? "opacity-100" : "opacity-0"
        } ${!animState && !isFadingOut ? "hidden" : ""}`}
    >
      <div
        className={`flex flex-col justify-center items-center transition-all rounded-lg duration-700 ease-in-out ${isShrunk ? "w-9/12 h-4/6" : "w-screen h-screen"} bg-gray-300`}
      >
        <div className="flex gap-10">
          {["We", "Are"].map((item, index) => (
            <span
              key={index}
              className="text-zinc-700 font-semibold uppercase leading-none text-[8vw]"
            >
              {item}
            </span>
          ))}
        </div>
        <span className="font-semibold uppercase text-[8vw] leading-none text-byzantium">
          Shwet
        </span>

        {/* Loading animation */}
        <div className="relative w-full h-1/4 -my-10">
          <div className="absolute bottom-0 right-0 -my-10 text-[4vw] px-5 font-medium text-zinc-700">
            Loading {loading} %
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageAnimation;
