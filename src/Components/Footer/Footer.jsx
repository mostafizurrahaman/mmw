import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import logo from "../../assets/images/logo.png";
import {
   FaFacebookF,
   FaInstagramSquare,
   FaLinkedinIn,
   FaTwitter,
   FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import {
   staggerContainerVariants,
   socialIconVariants,
} from "@/animations/staggerVariants";
import {
   scrollRevealVariants,
   textRevealVariants,
} from "@/animations/scrollVariants";
import { socialIconHoverVariants } from "@/animations/hoverVariants";

const Footer = () => {
   const { t } = useTranslation();
   const footerRef = useRef(null);

   // Scroll-based parallax for footer
   const { scrollYProgress } = useScroll({
      target: footerRef,
      offset: ["start end", "end end"],
   });

   // Subtle parallax movement
   const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
   const opacity = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);

   const springY = useSpring(y, { stiffness: 100, damping: 30 });

   // Logo rotation on scroll
   const logoRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
   const springLogoRotate = useSpring(logoRotate, {
      stiffness: 80,
      damping: 20,
   });

   const socialIcons = [
      { Icon: FaFacebookF, color: "#1877F2", label: "Facebook" },
      { Icon: FaTwitter, color: "#1DA1F2", label: "Twitter" },
      { Icon: FaInstagramSquare, color: "#E4405F", label: "Instagram" },
      { Icon: FaLinkedinIn, color: "#0A66C2", label: "LinkedIn" },
      { Icon: FaYoutube, color: "#FF0000", label: "YouTube" },
   ];

   return (
      <motion.div ref={footerRef} style={{ y: springY, opacity }}>
         {/* Main Footer Section */}
         <motion.div
            className="bg-[#242424] py-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
               hidden: { opacity: 0 },
               visible: {
                  opacity: 1,
                  transition: {
                     staggerChildren: 0.15,
                     delayChildren: 0.2,
                  },
               },
            }}
         >
            <div className="container mx-auto text-white md:flex justify-between items-center">
               {/* Logo Section */}
               <motion.div
                  className="flex items-center justify-center"
                  variants={scrollRevealVariants}
               >
                  <motion.div
                     className="flex items-center"
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                  >
                     <motion.img
                        src={logo}
                        alt={t("avantraLogoAlt")}
                        style={{ rotate: springLogoRotate }}
                        whileHover={{
                           rotate: 360,
                           transition: {
                              duration: 0.8,
                              ease: "easeInOut",
                           },
                        }}
                     />
                     <motion.p
                        className="text-xl"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                     >
                        AVANTRA
                     </motion.p>
                  </motion.div>
               </motion.div>

               {/* Links and Social Grid */}
               <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 justify-center items-center"
                  variants={textRevealVariants}
               >
                  {/* Navigation Links */}
                  <motion.div
                     className="flex justify-between py-5 mx-5"
                     variants={staggerContainerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                  >
                     <motion.p
                        className="mr-5"
                        variants={{
                           hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                           visible: {
                              opacity: 1,
                              y: 0,
                              filter: "blur(0px)",
                              transition: {
                                 duration: 0.6,
                                 ease: [0.22, 1, 0.36, 1],
                              },
                           },
                        }}
                     >
                        <Link to={"/terms-conditions"}>
                           <motion.span
                              className="inline-block relative"
                              whileHover={{
                                 scale: 1.05,
                                 color: "#22A59A",
                                 transition: { duration: 0.3 },
                              }}
                              whileTap={{ scale: 0.95 }}
                           >
                              {t("termsConditions")}

                              {/* Underline animation on hover */}
                              <motion.span
                                 className="absolute bottom-0 left-0 w-full h-[2px] bg-[#22A59A] origin-left"
                                 initial={{ scaleX: 0 }}
                                 whileHover={{ scaleX: 1 }}
                                 transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                 }}
                              />
                           </motion.span>
                        </Link>
                     </motion.p>

                     <motion.div
                        variants={{
                           hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                           visible: {
                              opacity: 1,
                              y: 0,
                              filter: "blur(0px)",
                              transition: {
                                 duration: 0.6,
                                 ease: [0.22, 1, 0.36, 1],
                              },
                           },
                        }}
                     >
                        <Link to={"/privacy-policy"}>
                           <motion.span
                              className="inline-block relative"
                              whileHover={{
                                 scale: 1.05,
                                 color: "#22A59A",
                                 transition: { duration: 0.3 },
                              }}
                              whileTap={{ scale: 0.95 }}
                           >
                              {t("privacyPolicy")}

                              {/* Underline animation on hover */}
                              <motion.span
                                 className="absolute bottom-0 left-0 w-full h-[2px] bg-[#22A59A] origin-left"
                                 initial={{ scaleX: 0 }}
                                 whileHover={{ scaleX: 1 }}
                                 transition={{
                                    duration: 0.3,
                                    ease: [0.22, 1, 0.36, 1],
                                 }}
                              />
                           </motion.span>
                        </Link>
                     </motion.div>
                  </motion.div>

                  {/* Social Icons */}
                  <motion.div
                     className="flex justify-between mx-5"
                     variants={staggerContainerVariants}
                     initial="hidden"
                     whileInView="visible"
                     viewport={{ once: true }}
                  >
                     {socialIcons.map((social, index) => (
                        <motion.div
                           key={social.label}
                           variants={socialIconVariants}
                           custom={index}
                        >
                           <motion.div
                              whileHover={socialIconHoverVariants.hover}
                              whileTap={socialIconHoverVariants.tap}
                              className="cursor-pointer relative"
                           >
                              {/* Glow effect on hover */}
                              <motion.div
                                 className="absolute inset-0 rounded-full blur-lg opacity-0"
                                 whileHover={{
                                    opacity: 0.6,
                                    backgroundColor: social.color,
                                    scale: 1.5,
                                 }}
                                 transition={{ duration: 0.3 }}
                              />

                              <motion.div
                                 whileHover={{ color: social.color }}
                                 transition={{ duration: 0.3 }}
                              >
                                 <social.Icon
                                    size={22}
                                    className="relative z-10"
                                 />
                              </motion.div>
                           </motion.div>
                        </motion.div>
                     ))}
                  </motion.div>
               </motion.div>
            </div>
         </motion.div>

         {/* Copyright Section */}
         <motion.div
            className="bg-[#050505]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={{
               hidden: {
                  opacity: 0,
                  y: 30,
                  filter: "blur(8px)",
               },
               visible: {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  transition: {
                     duration: 0.8,
                     delay: 0.4,
                     ease: [0.22, 1, 0.36, 1],
                  },
               },
            }}
         >
            <motion.p
               className="text-center text-white text-sm py-4"
               whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
               }}
            >
               © {new Date().getFullYear()} Avantra{" "}
               <motion.span
                  className="inline-block"
                  animate={{
                     opacity: [1, 0.7, 1],
                  }}
                  transition={{
                     duration: 2,
                     repeat: Infinity,
                     ease: "easeInOut",
                  }}
               >
                  {t("allRightsReserved")}
               </motion.span>
            </motion.p>
         </motion.div>
      </motion.div>
   );
};

export default Footer;
