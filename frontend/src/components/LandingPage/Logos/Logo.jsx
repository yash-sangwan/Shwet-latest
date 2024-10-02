import React from "react";
import assets from "../../assets/assets";
function Logo({ logoref }) {
  return (
    <img
      ref={logoref}
      className={`my-4 mx-3 w-10 lg:w-16 ml-6`}
      src={assets.Logo}
      viewBox="0 0 200 180"
      fill="none"
    >
    </img>
  );
}

export default Logo;
