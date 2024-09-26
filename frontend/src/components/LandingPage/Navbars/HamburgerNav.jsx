"use client";

import React, { useEffect, useState } from "react";
import Button from "./NavbarButton";
import { faBolt, faX, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import assets from "../../../assets/assets";
import Login from "../../Auth/Login";
import Signup from "../../Auth/Signup";

function HamburgerNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const openSheet = (type) => {
    if (type === "signup") {
      setIsSignupOpen(true);
    } else if (type === "login") {
      setIsLoginOpen(true);
    }
  };

  const closeAllSheets = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  const openSignupOTP = () => {
    setIsSignupOpen(false);
  };

  // Close menu when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".menu-btn") &&
        !event.target.closest(".menu-content")
      ) {
        setMenuOpen(false);
      }
    };

    // Add event listener to close menu on outside click
    if (menuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      // Cleanup event listener when component unmounts
      document.removeEventListener("click", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="relative flex justify-between items-center navbar text-white">
      <h3 className="p-2 m-4">
        <img src={assets.Logo} className="w-10" alt="Logo" />
      </h3>

      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Full-page overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-10"
            ></motion.div>

            {/* Vertical nav below the menu button */}
            <motion.ul
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute right-10 top-16 bg-white border border-gray-300 rounded-lg z-20 flex flex-col shadow-md menu-content p-2"
            >
              <a
                className="text-gray-700 text-left m-2 transition-colors duration-300 hover:text-gray-900"
                onClick={() => openSheet("login")}

              >
                Login
              </a>
              <a
                className="text-gray-700 text-left m-2 transition-colors duration-300 hover:text-gray-900"
                onClick={() => openSheet("signup")}

              >
                Signup
              </a>
              <a
                className="text-gray-700 text-left m-2 transition-colors duration-300 hover:text-gray-900"
                href="/playground"
              >
                Playground
              </a>
            </motion.ul>
          </>
        )}
      </AnimatePresence>

      <div className="flex justify-center gap-4 items-center p-2 m-4 menu-btn relative">
        {/* Container with a round white border */}
        <Button text={"Playground"} href={"/playground"} icon={faBolt}></Button>

        <div className="flex justify-center items-center bg-white w-8 h-8 border-2 border-white rounded-full">
          <AnimatePresence mode="wait">
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon
                  className="w-5 h-4 text-2xl cursor-pointer"
                  icon={faX}
                  style={{ color: "#0a0a0a" }}
                  onClick={() => setMenuOpen(false)}
                />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FontAwesomeIcon
                  className="w-5 h-4 text-2xl cursor-pointer"
                  icon={faBars}
                  style={{ color: "#0a0a0a" }}
                  onClick={() => setMenuOpen(true)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {isLoginOpen && (
        <div className="fixed inset-0 bg-primaryBg bg-opacity-95 flex items-center justify-center z-50">
          <Login onClose={closeAllSheets} />
        </div>
      )}

      {isSignupOpen && (
        <div className="fixed inset-0 bg-primaryBg bg-opacity-95 flex items-center justify-center z-50">
          <Signup onClose={closeAllSheets} openSignupOTP={openSignupOTP} />
        </div>
      )}
    </nav>
  );
}

export default HamburgerNav;
