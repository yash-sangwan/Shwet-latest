import React, { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScrollToTopButton = ({height}) => {
  const [backToTop, setBackToTop] = useState(false);
  const scrollContainerRef = useRef(null);

  const scrollVisibility = useCallback(() => {
    if (scrollContainerRef.current) {
      const scrolled = scrollContainerRef.current.scrollTop;
      if (scrolled > height) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    }
  }, []);

  useEffect(() => {
    const scrollContainer = document.querySelector(".scrollEffectClass");
    if (scrollContainer) {
      scrollContainerRef.current = scrollContainer;
      scrollContainer.addEventListener("scroll", scrollVisibility);
      scrollVisibility(); // Initial check

      return () => {
        scrollContainer.removeEventListener("scroll", scrollVisibility);
      };
    }
  }, [scrollVisibility]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {backToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 w-12 h-12 z-[50] bg-PURPLESHADE5 hover:rotate-[360deg] text-white p-3 rounded-full shadow-lg transition-all duration-500 ease-in-out transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      )}
    </>
  );
};

export default ScrollToTopButton;