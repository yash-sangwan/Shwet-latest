import React from "react";
import Footer from "../Components/LandingPage/Footer";
import SubscribeSection from "../Components/LandingPage/SubscribeSection";
import FAQS from "../Components/LandingPage/FAQS";
import Navbar from "../Components/Navbars/Navbar";
import CardsList from "../Components/LandingPage/Cards v2/CardsList";
import HeroSection from "../Components/LandingPage/HeroSection";
import InfoSection from "../Components/LandingPage/InfoSection";
import ScrollToTopButton from "../Components/ScrollEffects/ScrollToTopButton";

function Home() {
  return (
    <>
      <div className="relative scrollbar-hide herosection scrollEffectClass bg-PURPLESHADE1 min-w-mobile sm:min-w-tablet lg:min-w-desktop 2xl:min-w-extralarge h-screen mx-auto text-slate-50 overflow-x-auto select-none">

        <Navbar animate={true}/>

        <div className="relative h-screen">
          
          <HeroSection />
          
          <CardsList />

          <InfoSection />

          <FAQS />

          <SubscribeSection />

          <Footer />
        </div>

        <ScrollToTopButton height={1000}/>
      </div>
    </>
  );
}

export default Home;
