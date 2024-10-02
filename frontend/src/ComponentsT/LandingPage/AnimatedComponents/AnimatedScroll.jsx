import React, { useEffect, useState, useRef } from "react";

const AnimatedScroll = () => {
  const [opacity, setOpacity] = useState(1);
  const [scale, setScale] = useState(1);
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    scrollContainerRef.current = document.querySelector(".herosection");

    const handleScroll = () => {
      if (sectionRef.current && scrollContainerRef.current) {
        const containerRect =
          scrollContainerRef.current.getBoundingClientRect();
        const sectionRect = sectionRef.current.getBoundingClientRect();

        const viewportHeight = window.innerHeight;
        const sectionTop = sectionRect.top - containerRect.top;
        const sectionCenter = sectionTop + sectionRect.height / 2;
        const distanceFromCenter = Math.abs(viewportHeight / 2 - sectionCenter);
        const maxDistance = viewportHeight / 2 + sectionRect.height / 2;

        // Calculate opacity
        let newOpacity = 1 - distanceFromCenter / maxDistance;
        newOpacity = Math.max(0.1, Math.min(1, newOpacity));
        setOpacity(newOpacity);

        // Calculate scale
        let newScale = 1 - (0.4 * distanceFromCenter) / maxDistance; // 0.3 determines the maximum scale reduction
        newScale = Math.min(0.7, Math.min(1, newScale)); // Limit scale between 0.7 and 1
        setScale(newScale);
      }
    };

    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial call to set the opacity and scale correctly
    }

    return () => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <section className="relative w-full flex flex-col justify-evenly items-center transition-all duration-300 ease-out">
      <div
        ref={sectionRef}
        className="absolute top-0 w-[100%] h-[80vh] flex flex-col justify-center items-center"
        style={{
          opacity: opacity,
          transform: `scale(${scale})`,
        }}
      >
        <div className="w-full flex flex-col justify-center items-center">
          <p className="text-sm md:text-2xl text-center">
            The crypto wallet that'll take you places
          </p>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-row gap-4">
              {["Your", "trusted"].map((item, index) => (
                <span
                  key={index}
                  className="text-3xl md:text-5xl lg:text-7xl font-semibold"
                >
                  {item}{" "}
                </span>
              ))}
            </div>
            <span className="text-6xl md:text-8xl lg:text-9xl text-primary font-semibold">
              Companion
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimatedScroll;
