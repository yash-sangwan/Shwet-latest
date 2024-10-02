import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Button({ text, icon, clickType, handleClick, href}) {
  return (
    <a
      className="h-[70%] group w-max rounded-2xl text-white hover:bg-PURPLESHADE5 px-4 py-2 md:py-4 flex items-center transition-all duration-300 ease-in-out"
      href={href}
      onClick={()=> handleClick(clickType)}
    >

      <FontAwesomeIcon className="pl-1 transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out" icon={icon} />

      <span className="group-hover:ml-2 transition-all duration-300 ease-in-out">
        {text}
      </span>
    </a>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.object,
  handleClick: PropTypes.func,
  href: PropTypes.string
};

export default Button;
