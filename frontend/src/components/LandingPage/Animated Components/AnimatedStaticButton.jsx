import React from "react";
import PropTypes from "prop-types";
import apiClient from "../../../api/apiClient";

function AnimatedStaticButton({ text }) {

  return (
    <div className="mt-16 inline-block p-[1px] rounded-full animate-gradient-x cursor-default transition duration-400 ease-in-out border-2 border-purple-800 font-Montserrat">
      <div className="px-3 py-1 rounded-full bg-black">
        <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r bg-PURPLESHADE3">
          {text}
        </span>
      </div>
    </div>
  );
}

AnimatedStaticButton.propTypes = {
  text: PropTypes.string.isRequired,
};

export default AnimatedStaticButton;
