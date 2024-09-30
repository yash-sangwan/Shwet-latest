import React, { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

const HoverDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <Popover className="relative w-max">
      <div
        onMouseOver={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative"
      >
        <PopoverButton className={`h-[70%] group w-max rounded-2xl text-white ${isOpen ? "bg-PURPLESHADE5" : ""} px-4 py-2 md:py-4 flex items-center transition-all duration-300 ease-in-out`}>
          <FontAwesomeIcon
            className={`pl-1 transform ${isOpen ? "scale-100" : "scale-0"} transition-transform duration-500 ease-in-out`}
            icon={faCaretDown}
          />
          <span className={`${isOpen ? "ml-2" : ""} transition-all duration-300 ease-in-out`}>
            Products
          </span>
        </PopoverButton>

        {/* Wrap PopoverPanel in a div to handle mouse events */}
        <div
          onMouseLeave={handleMouseLeave}
        >
          {isOpen && (
            <PopoverPanel
              static
              className="absolute z-10 w-56 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="py-1">
                <a
                  href="/analytics"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Analytics
                </a>
                <a
                  href="/engagement"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Engagement
                </a>
                <a
                  href="/security"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Security
                </a>
                <a
                  href="/integrations"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Integrations
                </a>
              </div>
            </PopoverPanel>
          )}
        </div>
      </div>
    </Popover>
  );
};

export default HoverDropdown;
