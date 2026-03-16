import React from "react";
import Hero from "../../Components/Hero/Hero";
import WhyChooseUs from "../../Components/WhyChooseUs/WhyChooseUs";
import StepEarn from "../../Components/StepEarn/StepEarn";
import DownloadApp from "../../Components/DownloadApp/DownloadApp";
import { motion } from "framer-motion";

const HomePage = () => {
   return (
      <div className="bg-[#090909] overflow-hidden">
         {/* Smooth scroll container with GPU acceleration */}
         <motion.div
            className="container mx-auto flex flex-col gap-24 md:gap-40 pb-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ willChange: "transform" }}
         >
            <Hero />
            <WhyChooseUs />
            <StepEarn />
            <DownloadApp />
         </motion.div>
      </div>
   );
};

export default HomePage;
