import React from "react";
import Footer from "../Components/LandingPage/Footer";
import ScrollToTopButton from "../Components/ScrollEffects/ScrollToTopButton";
import Price from "../Components/Pricing/Price";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const navigate = useNavigate();
  return (
    <>
      <div className="relative scrollbar-hide scrollEffectClass bg-PURPLESHADE1 min-w-mobile sm:min-w-tablet lg:min-w-desktop 2xl:min-w-extralarge h-screen mx-auto text-slate-50 overflow-x-auto select-none">
        <div className="flex justify-start mt-8 ml-4">
          <button
            onClick={() => navigate("/")}
            className="text-blue-400 hover:text-blue-300"
          >
            <ChevronLeft size={30} />
          </button>
        </div>
        <div className="relative h-screen">
          <Price />

          <Footer />
        </div>

        <ScrollToTopButton height={300} />
      </div>
    </>
  );
}

export default Pricing;
