import React, { useState } from "react";
import Button from "./NavbarButton";
import { faBolt, faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import assets from "../../../assets/assets";
import Login from "../../Auth/Login";
import Signup from "../../Auth/Signup";


function TopNavbar() {
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
    setIsSignupOTPOpen(false);
  };

  const openSignupOTP = () => {
    setIsSignupOpen(false);
    setIsSignupOTPOpen(true);
  };

  return (
    <nav className="pt-2 relative flex justify-between navbar">
      <a
        href="#"
        className="text-white text-xl font-bold font-Montserrat px-10 my-2 flex flex-col justify-center text-left"
      >
        <img src={assets.Logo} className="w-12"></img>
      </a>

      <ul className="flex flex-row justify-evenly items-center pr-10 font-Montserrat">
        <Button text={"Playground"} icon={faBolt} href={"/playground"} ></Button>
        <Button
          text={"Login"}
          handleClick={openSheet}
          clickType="login"
          icon={faRightToBracket}
        ></Button>
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
