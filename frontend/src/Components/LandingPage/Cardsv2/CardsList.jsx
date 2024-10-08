import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated, config } from "react-spring";
import assets from "../../../assets/assets";
import Card from "./Card";
import "./style.css";

const Content = [
  {
    id: 1,
    heading: 'We pay with Solana\'\s zk-compressed tokens, to cut extra cost',
    feature: assets.Feature1,
    color:'#2C315B'
  },
  {
    id: 2,
    heading: 'Get access to global community of AI/ML contributors',
    feature: assets.Feature5,
    color:'#3C315B'
  },
  {
    id: 3,
    heading: 'Recycle data you no longer need & get rewards',
    feature: assets.Feature3,
    color:'#4C315B'
  },
  {
    id: 4,
    heading: 'Monitor real-time progress on your assigned tasks',
    feature: assets.Feature2,
    color:'#5C315B'
  },
  {
    id: 5,
    heading: 'No limits, flexible plans for any budget',
    feature: assets.Feature4,
    color:'#6C315B'
  }
];

const CardsList = () => {
  const outerRef = useRef(null); // For the outer animated div
  const innerRef = useRef(null); // For the inner scrollable div
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const [{ x }, api] = useSpring(() => ({
    x: 0,
    config: { ...config.stiff, tension: 400, friction: 30 },
  }));

  useEffect(() => {
    const updateMaxScroll = () => {
      if (innerRef.current) {
        setMaxScroll(
          innerRef.current.scrollWidth - innerRef.current.clientWidth
        );
      }
    };

    updateMaxScroll();
    window.addEventListener("resize", updateMaxScroll);
    return () => window.removeEventListener("resize", updateMaxScroll);
  }, []);

  const handleStart = (e) => {
    setIsDragging(true);
    outerRef.current.classList.add("cursor-grabbing");

    // Detect if the event is a touch event or mouse event
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    setStartX(x - innerRef.current.offsetLeft);
    setScrollLeft(innerRef.current.scrollLeft);
  };

  const handleMove = (e) => {
    if (!isDragging) return;

    // Detect if the event is a touch event or mouse event
    const x = e.touches ? e.touches[0].pageX : e.pageX;
    const walkMultiplier = e.touches ? 0.8 : 1; // Adjust sensitivity for touch
    const walk = (x - startX) * walkMultiplier;
    let newScrollLeft = scrollLeft - walk;

    // Apply overscroll/stretch effect
    if (newScrollLeft < 0) {
      api.start({ x: -Math.pow(-newScrollLeft, 0.8) });
    } else if (newScrollLeft > maxScroll) {
      api.start({ x: Math.pow(newScrollLeft - maxScroll, 0.8) });
    } else {
      api.start({ x: 0 });
      if (innerRef.current) {
        innerRef.current.scrollLeft = newScrollLeft;
      }
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    outerRef.current.classList.remove("cursor-grabbing");

    // Spring back if overscrolled
    api.start({ x: 0 });
  };

  useEffect(() => {
    const inner = innerRef.current;

    // Add non-passive event listeners for touch events
    const addNonPassiveTouchListeners = () => {
      if (inner) {
        inner.addEventListener("touchstart", handleStart, { passive: false });
        inner.addEventListener("touchmove", handleMove, { passive: false });
        inner.addEventListener("touchend", handleEnd);
      }
    };

    const removeNonPassiveTouchListeners = () => {
      if (inner) {
        inner.removeEventListener("touchstart", handleStart);
        inner.removeEventListener("touchmove", handleMove);
        inner.removeEventListener("touchend", handleEnd);
      }
    };

    addNonPassiveTouchListeners();

    // Clean up listeners on component unmount
    return () => {
      removeNonPassiveTouchListeners();
    };
  }, []);

  return (

      <div className="relative py-52  max-h-max flex justify-center items-center">
        <animated.div
          className="w-full h-full flex justify-center items-center"
          ref={outerRef}
          style={{
            transform: x.to((val) => `translateX(${-val}px)`),
          }}
        >
          <div
            className="cards w-full h-[500px] md:h-[600px] overflow-hidden scrollbar-hide cursor-ew-resize z-10"
            ref={innerRef}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          >
            {Content.map((item, index) => (
              <Card
                key={index}
                heading={item.heading}
                image={item.feature}
                isWhite={item.id === 2}
                color={item.color}
              />
            ))}
          </div>
        </animated.div>
      </div>
  );
};

export default CardsList;