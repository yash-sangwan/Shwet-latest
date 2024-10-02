import React from "react";
import "./style.css";
import assets from "../../../assets/assets"

export default function AnimatedBorder() {
  return (
    <div className="animatedBorder">
      <img src={assets.MediaNetImage} alt="" className="w-[95%] h-[95%] z-20" />
    </div>
  );
}
