import React, { useState, useEffect, useRef } from "react";
import assets from "../../assets/assets";
import AnimatedStaticButton from "./AnimatedComponents/AnimatedStaticButton";
import AnimatedDashboardPreview from "./AnimatedDashboardPreview";

function HeroSection(zindex) {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const [animateLogo, setAnimateLogo] = useState(false);
  const [animateText, setAnimateText] = useState(false);
  const [loadDelay, setLoadDelay] = useState(false);
  const [loadLogo, setLoadLogo] = useState(true);
  const [logoWidth, setLogoWidth] = useState("120px"); // Initial logo width

  useEffect(() => {
    const remove = setTimeout(() => {
      setLoadLogo(false);
    }, 2000);
    return () => clearTimeout(remove);
  }, []);

  useEffect(() => {
    scrollContainerRef.current = document.querySelector(".herosection");

    const handleScroll = () => {
      if (
        sectionRef.current &&
        videoRef.current &&
        scrollContainerRef.current
      ) {
        const containerRect = scrollContainerRef.current.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();
        const videoRect = videoRef.current.getBoundingClientRect();

        const overlap = Math.max(
          0,
          Math.min(sectionRect.bottom, videoRect.bottom) -
            Math.max(sectionRect.top, videoRect.top)
        );
        const maxOverlap = Math.min(sectionRect.height, videoRect.height);
        const overlapRatio = overlap / maxOverlap;

        const newOpacity = 1 - overlapRatio;
        const newScale = 1 - 0.2 * overlapRatio;

        setOpacity(Math.max(0.1, newOpacity));
        setScale(Math.max(0.8, newScale));
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      handleScroll(); // Initial call
    }

    const logoAnimationTimeout = setTimeout(() => {
      setAnimateLogo(true);
      // Start decreasing the logo width after a delay
      const widthTimeout = setTimeout(() => {
        setLogoWidth("0px");
      }, 2500); // Adjust the delay as needed

      return () => clearTimeout(widthTimeout);
    }, 50);

    const textAnimationTimeout = setTimeout(() => {
      setAnimateText(true);
    }, 800);

    const loadDelayAnimation = setTimeout(() => {
      setLoadDelay(true);
    }, 2000);

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
      clearTimeout(textAnimationTimeout);
      clearTimeout(logoAnimationTimeout);
      clearTimeout(loadDelayAnimation);
    };
  }, []);

  return (
    <section
      className={`relative md:mt-5 h-max ${zindex} w-full flex flex-col items-center transition-all duration-300 ease-out select-none`}
    >
      <div
        ref={sectionRef}
        className="sticky top-0 w-[100%] h-[100vh] flex flex-col justify-center items-center"
        style={{
          opacity: opacity,
          transform: `scale(${scale})`,
        }}
      >
        <div className="w-full h-full flex flex-col justify-center items-center overflow-hidden">
          <p
            className={`text-sm md:text-2xl text-center transition-all duration-[2000ms] ease-out ${
              loadDelay ? "opacity-100" : "opacity-0"
            }`}
          >
           An incentivized collaboration tool for all things Data, AI & ML
          </p>
          <div className="flex flex-col -mt-2 items-center">
            <div className="flex flex-row gap-2 -mt-4 justify-center items-center">
              {/* "Your" text */}
              <span className={`text-3xl md:text-5xl lg:text-7xl font-semibold ${animateText ? "bounce-animation" : ""}`}>
                <div
                  className={`transition-all duration-1000 ease-in-out ${animateText ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                >
                  Data
                </div>
              </span>
              
              {/* Logo */}
              <span
                className={`transition-all duration-1000 ease-in-out ${logoWidth === "0px" ? "opacity-0" : "opacity-100"}`}
                style={{ width: logoWidth, overflow: "hidden" }} // Apply width and overflow styles
              >
                <object
                  type="image/svg+xml"
                  data={assets.AnimatedSVGLogo}
                  className={`h-[120px] mx-2`} // Keep the height constant
                  begin="indefinite"
                >
                  Your browser does not support SVG
                </object>
              </span>

              {/* "trusted" text */}
              <span className={`text-3xl md:text-5xl lg:text-7xl font-semibold ${animateText ? "bounce-animation" : ""}`}>
                <div
                  className={`transition-all duration-1000 ease-in-out ${animateText ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                >
                  Needs
                </div>
              </span>
            </div>
            <span
              className={`text-4xl -mt-10 md:text-6xl lg:text-[7rem] text-PURPLESHADE3 font-semibold transition-all duration-1000 ease-in-out delay-300 ${
                animateText ? "translate-y-0 opacity-100 bounce-animation" : "translate-y-full opacity-0"
              }`}
            >
              Transparency
              <div className="py-5 flex justify-end">
                <img src={assets.VectorWhite} alt="" />
              </div>
            </span>
            <div
              className={`duration-[2000ms] ease-in-out delay-[2000ms] ${animateText ? "opacity-100" : "opacity-0"}`}
            >
              <AnimatedStaticButton text={"Currently on devnet"} />
            </div>
          </div>
        </div>
      </div>

      <div
        ref={videoRef}
        className="md:w-[90%] lg:w-full transition-all duration-300 ease-out"
        style={{
          position: "sticky",
          top: "20vh",
          zIndex: 10,
        }}
      >
        <AnimatedDashboardPreview margintop={"mt-96"} />
      </div>
    </section>
  );
}

export default HeroSection;
