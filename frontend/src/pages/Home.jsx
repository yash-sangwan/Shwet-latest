import React from "react";
import Footer from "../components/LandingPage/Footer";
import SubscribeSection from "../components/LandingPage/SubscribeSection";
import FAQS from "../components/LandingPage/FAQS";
import Navbar from "../components/LandingPage/Navbar";
import CardsList from "../components/LandingPage/Cards v2/CardsList";
import HeroSection from "../components/LandingPage/HeroSection";
import InfoSection from "../components/LandingPage/InfoSection";

function Home() {
  return (
    <>
      <div className="relative scrollbar-hide herosection bg-PURPLESHADE1 min-w-mobile sm:min-w-tablet lg:min-w-desktop 2xl:min-w-extralarge h-screen mx-auto text-slate-50 overflow-x-auto select-none">
        <Navbar />

        <div className="relative h-screen">
          
          <HeroSection />
          
          <CardsList />

          <InfoSection />

          <FAQS />

          <SubscribeSection />

          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
