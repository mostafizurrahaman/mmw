import React from "react";
import Hero from "../../Components/Hero/Hero";
import WhyChooseUs from "../../Components/WhyChooseUs/WhyChooseUs";
import StepEarn from "../../Components/StepEarn/StepEarn";
import DownloadApp from "../../Components/DownloadApp/DownloadApp";

const HomePage = () => {
 
  return (
    <div className="bg-[#090909] overflow-hidden">
      <div className="container mx-auto flex flex-col gap-24 md:gap-40 pb-32">
        <Hero />
        <WhyChooseUs />
        <StepEarn />
        <DownloadApp />
      </div>
    </div>
  );
};

export default HomePage;
