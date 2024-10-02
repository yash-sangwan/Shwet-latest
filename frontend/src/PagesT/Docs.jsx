import React from "react";
import Footer from "../components/LandingPage/Footer";
import Navbar from "../components/Navbars/Navbar";
import ScrollToTopButton from "../components/ScrollEffects/ScrollToTopButton";
import Doc from "../components/Docs/Doc";

function Docs() {
  return (
    <>
      <div className="relative scrollbar-hide scrollEffectClass bg-PURPLESHADE1 min-w-mobile sm:min-w-tablet lg:min-w-desktop 2xl:min-w-extralarge h-screen mx-auto text-slate-50 overflow-x-auto select-none">

        <Navbar animate={false} />

        <div className="relative h-screen">
            <Doc />
            
            <Footer />
        </div>

        <ScrollToTopButton height={300} />
      </div>
    </>
  );
}

export default Docs;
