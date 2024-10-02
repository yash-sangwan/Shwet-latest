import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar";
import HamburgerNav from "./HamburgerNav";

function Navbar({ animate }) {
  const [menuBar, setMenuBar] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loadDelay, setLoadDelay] = useState(!animate); // Default to true when animation is not needed

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add window resize event listener
    window.addEventListener("resize", handleResize);

    // Only apply loadDelay if animate is true
    if (animate) {
      const loadDelayTimeout = setTimeout(() => {
        setLoadDelay(true);
      }, 1700);

      return () => {
        clearTimeout(loadDelayTimeout);
      };
    }

    // Clean up resize event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [animate]);

  useEffect(() => {
    if (screenWidth <= 768) {
      setMenuBar(true);
    } else {
      setMenuBar(false);
    }
  }, [screenWidth]);

  return (
    <header
      className={`absolute top-0 right-0 left-0 z-10 block transition-all ${
        animate ? "duration-[2000ms] ease-in-out" : ""
      } ${loadDelay ? "opacity-100" : "opacity-0"}`}
    >
      {!menuBar ? <TopNavbar /> : <HamburgerNav />}
    </header>
  );
}

export default Navbar;
