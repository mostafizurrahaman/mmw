import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import mobile from "../../assets/images/mobile.png";
import qr from "../../assets/images/qr.png";
import google from "../../assets/images/google.png";
import app from "../../assets/images/app.png";
import { useTranslation } from "react-i18next";
import {
   heroSequenceVariants,
   staggerItemVariants,
} from "@/animations/staggerVariants";
import {
   headingRevealVariants,
   textRevealVariants,
   imageRevealVariants,
   scaleUpRevealVariants,
} from "@/animations/scrollVariants";
import {
   imageHoverVariants,
   buttonHoverVariants,
} from "@/animations/hoverVariants";
import { useImageParallax } from "@/hooks/useParallax";

const DownloadApp = () => {
   const { t } = useTranslation();
   const sectionRef = useRef(null);

   // Parallax for mobile image
   const {
      ref: mobileRef,
      y: mobileY,
      scale: mobileScale,
   } = useImageParallax(80, [0.95, 1.05]);

   const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
   });

   // Background parallax
   const backgroundY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
   const springBackgroundY = useSpring(backgroundY, {
      stiffness: 80,
      damping: 30,
   });

   // QR code rotation
   const qrRotate = useTransform(scrollYProgress, [0, 1], [-5, 5]);
   const springQrRotate = useSpring(qrRotate, { stiffness: 100, damping: 30 });

   return (
      <motion.div
         ref={sectionRef}
         className="flex items-center justify-between text-white px-2 mt-20 md:px-0 relative"
         style={{ y: springBackgroundY }}
      >
         {/* Left Content Section */}
         <motion.div
            className="w-full md:flex flex-col justify-center items-center"
            variants={heroSequenceVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
         >
            <motion.div>
               {/* Main Heading with Split Animation */}
               <motion.p
                  className="text-[40px] md:text-[60px] font-bold text-center"
                  variants={headingRevealVariants}
               >
                  {t("download")}
               </motion.p>

               <motion.p
                  className="text-[40px] text-center font-bold"
                  variants={headingRevealVariants}
               >
                  {t("ourApp")}
               </motion.p>

               {/* Description Text */}
               <motion.p
                  className="text-center mt-2"
                  variants={textRevealVariants}
               >
                  {t("tipYourFavoritePlayers1")}
               </motion.p>

               <motion.p className="text-center" variants={textRevealVariants}>
                  {t("tipYourFavoritePlayers2")}
               </motion.p>

               <motion.p className="text-center" variants={textRevealVariants}>
                  {t("tipYourFavoritePlayers3")}
               </motion.p>

               {/* QR Code and Store Badges */}
               <motion.div
                  className="md:flex items-center gap-5 mt-10"
                  variants={staggerItemVariants}
               >
                  {/* QR Code with Rotation Parallax */}
                  <motion.div
                     className="flex justify-center mb-5"
                     style={{ rotate: springQrRotate }}
                     whileHover={{
                        scale: 1.1,
                        rotate: 5,
                        transition: { duration: 0.3 },
                     }}
                  >
                     <motion.img
                        src={qr}
                        alt={t("qrCodeAlt")}
                        initial={{
                           opacity: 0,
                           scale: 0.8,
                           filter: "blur(10px)",
                        }}
                        whileInView={{
                           opacity: 1,
                           scale: 1,
                           filter: "blur(0px)",
                        }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                     />
                  </motion.div>

                  {/* Store Badges with Stagger */}
                  <motion.div
                     className="space-y-3 flex flex-col justify-center gap-5 px-10 pb-10"
                     variants={{
                        hidden: { opacity: 0 },
                        visible: {
                           opacity: 1,
                           transition: {
                              staggerChildren: 0.15,
                              delayChildren: 0.3,
                           },
                        },
                     }}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                  >
                     <motion.img
                        src={google}
                        alt={t("googlePlayAlt")}
                        variants={scaleUpRevealVariants}
                        whileHover={buttonHoverVariants.hover}
                        whileTap={buttonHoverVariants.tap}
                        className="cursor-pointer"
                     />
                     <motion.img
                        src={app}
                        alt={t("appStoreAlt")}
                        variants={scaleUpRevealVariants}
                        whileHover={buttonHoverVariants.hover}
                        whileTap={buttonHoverVariants.tap}
                        className="cursor-pointer"
                     />
                  </motion.div>
               </motion.div>
            </motion.div>
         </motion.div>

         {/* Mobile Phone Image with Parallax */}
         <motion.div
            ref={mobileRef}
            className="w-full hidden md:block relative"
            style={{
               y: mobileY,
               scale: mobileScale,
               transformStyle: "preserve-3d",
            }}
         >
            {/* Background Glow */}
            <motion.div
               className="absolute inset-0 bg-gradient-to-t from-[#22A59A]/30 to-transparent rounded-full blur-3xl"
               animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2],
               }}
               transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
               }}
            />

            <motion.img
               src={mobile}
               alt={t("mobileAppAlt")}
               className="relative z-10"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true, amount: 0.3 }}
               variants={imageRevealVariants}
               whileHover={{
                  scale: 1.05,
                  rotateY: 8,
                  rotateX: -5,
                  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
               }}
               style={{
                  transformPerspective: 1000,
                  transformStyle: "preserve-3d",
               }}
            />

            {/* Floating Animation for Phone */}
            <motion.div
               className="absolute inset-0 z-0"
               animate={{
                  y: [-10, 10, -10],
               }}
               transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
               }}
            />
         </motion.div>
      </motion.div>
   );
};

export default DownloadApp;
