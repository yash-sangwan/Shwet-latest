import React, { useState } from "react";
import Button from "./NavbarButton";
import {
  faRightToBracket,
  faMoneyCheckDollar,
  faFile,
  faAnglesLeft,
  faBook,
  faBarsStaggered
} from "@fortawesome/free-solid-svg-icons";
import assets from "../../assets/assets";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import { useAuth } from "../Private/AuthContext"; // Adjust path accordingly
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TopNavbar() {
  const { isAuthenticated, logout } = useAuth();
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

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      console.log("Some error occurred.");
    }
  };

  return (
    <nav className="pt-2 relative flex justify-between navbar">
      <a
        href="/"
        className="text-white text-xl font-bold font-Montserrat px-10 my-2 flex flex-col justify-center text-left"
      >
        <img src={assets.Logo} className="w-12"></img>
      </a>

      <ul className="flex flex-row justify-evenly items-center pr-10 font-Montserrat">
        {/* <HoverDropDown /> */}
        <Button text={"Contributors"} icon={faBook} href={"/docs"}></Button>
        <Button text={"Docs"} icon={faFile} href={"#"}></Button>
        <Button
          text={"Pricing"}
          icon={faMoneyCheckDollar}
          href={"/pricing"}
        ></Button>
        {!isAuthenticated ? (
          <Button
            text={"Login"}
            handleClick={openSheet}
            clickType="login"
            icon={faRightToBracket}
          ></Button>
        ) : (
          <>
            
            <Button text={"Dashboard"} icon={faBarsStaggered} href={"/user/init"}></Button>

            <a
            className="h-[70%] group w-max rounded-2xl text-white hover:bg-PURPLESHADE5 px-4 py-2 md:py-4 flex items-center transition-all duration-300 ease-in-out"
            onClick={handleLogout}
            >
            <FontAwesomeIcon
              className="pl-1 transform scale-0 group-hover:scale-100 transition-transform duration-500 ease-in-out"
              icon={faAnglesLeft}
              />
            <span className="group-hover:ml-2 transition-all duration-300 ease-in-out">
              Logout
            </span>

          </a>
        </>
        )}
      </ul>

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

export default TopNavbar;
