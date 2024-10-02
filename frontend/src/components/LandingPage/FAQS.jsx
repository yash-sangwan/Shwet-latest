import React, { useEffect, useState } from "react";
import FAQPc from "./FAQ Components/FAQPc";
import FAQPhone from "./FAQ Components/FAQPhone";
import AnimatedStaticButton from "./Animated Components/AnimatedStaticButton";

function FAQS() {
  const [isLarge, setIsLarge] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add window resize event listener
    window.addEventListener("resize", handleResize);

    return () => {
      // Remove window resize event listener on component unmount
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    if (screenWidth < 768) {
      setIsLarge(false);
    } else {
      setIsLarge(true);
    }
  }, [screenWidth]);

  return (
    <>
      <section className="relative pt-20 pb-40 w-full flex flex-col items-center gap-10 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute h-[1px] top-0 w-full bg-gradient-to-r from-zinc-900 via-purple-500 to-zinc-900 animate-gradient-x"></div>
        <div
          className="absolute -top-10 w-full h-5 rounded-full
             bg-gradient-radial shadow-[0_0_200px_50px_rgba(131,1,135,0.72)]
             filter blur-[30px]"
        ></div>
        {/* <div
          className="absolute -top-10 w-full h-5 rounded-full
             bg-gradient-radial from-PURPLESHADE2 to-PURPLESHADE3
             shadow-[0_0_200px_50px_rgba(255,223,0,0.5)]
             filter blur-[30px]"
        ></div> */}

        {/* <AnimatedStaticButton text={"Knowledge"} /> */}

        <div className="text-3xl md:text-6xl md:font-semibold">
          Your questions, answered
        </div>
        {isLarge ? <FAQPc /> : <FAQPhone />}
      </section>
    </>
  );
}

export default FAQS;
