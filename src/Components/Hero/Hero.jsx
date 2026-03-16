import React, { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import img from "../../assets/images/hero.png";
import facebook from "../../assets/images/facebook.png";
import whatsapp from "../../assets/images/whatsapp.png";
import instagram from "../../assets/images/instagram.png";
import telegram from "../../assets/images/telegram.png";
import messenger from "../../assets/images/messenger.png";
import twitter from "../../assets/images/twitter.png";
import { Input } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { useSelector } from "react-redux";
import { currentAccessToken } from "@/redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import {
   heroSequenceVariants,
   socialIconVariants,
} from "@/animations/staggerVariants";
import {
   headingRevealVariants,
   textRevealVariants,
   buttonRevealVariants,
   imageRevealVariants,
} from "@/animations/scrollVariants";
import {
   buttonHoverVariants,
   socialIconHoverVariants,
} from "@/animations/hoverVariants";
import { useImageParallax } from "@/hooks/useParallax";

const Hero = () => {
   const { t } = useTranslation();
   const { data: profileData } = useProfileQuery();
   const [decodedToken, setDecodedToken] = useState(null);
   const accessToken = useSelector(currentAccessToken);
   const navigate = useNavigate();

   // Parallax hook for hero image
   const {
      ref: imageRef,
      y: imageY,
      scale: imageScale,
   } = useImageParallax(60, [1, 1.1]);

   // Scroll-based background effect
   const { scrollYProgress } = useScroll();
   const backgroundY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
   const springBackgroundY = useSpring(backgroundY, {
      stiffness: 100,
      damping: 30,
   });

   useEffect(() => {
      if (accessToken) {
         try {
            const decoded = jwtDecode(accessToken);
            setDecodedToken(decoded);
         } catch (error) {
            console.error("Error decoding token:", error);
         }
      }
   }, [accessToken]);

   const handleCopy = (text) => {
      navigator.clipboard
         .writeText(text)
         .then(() => {
            toast.success(t("referralCodeCopied"));
         })
         .catch(() => {
            toast.error(t("failedToCopy"));
         });
   };

   const handleReferring = () => {
      navigate("/login");
   };

   const handleShare = (platform) => {
      const referralLink = `${window.location.origin}/register?code=${profileData?.referralCode}`;
      switch (platform) {
         case "whatsapp":
            window.open(
               `https://wa.me/?text=${encodeURIComponent(referralLink)}`,
               "_blank",
            );
            break;
         case "facebook":
            window.open(
               `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`,
               "_blank",
            );
            break;
         case "twitter":
            window.open(
               `https://twitter.com/intent/tweet?text=${encodeURIComponent(referralLink)}`,
               "_blank",
            );
            break;
         case "instagram":
            toast.error(
               "Instagram does not support sharing via URL. Use the app.",
            );
            break;
         case "telegram":
            window.open(
               `https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(referralLink)}`,
               "_blank",
            );
            break;
         case "messenger":
            window.open(
               `https://www.messenger.com/t/?text=${encodeURIComponent(referralLink)}`,
               "_blank",
            );
            break;
         default:
            break;
      }
   };

   const socialIcons = [
      { src: facebook, platform: "facebook" },
      { src: whatsapp, platform: "whatsapp" },
      { src: instagram, platform: "instagram" },
      { src: telegram, platform: "telegram" },
      { src: messenger, platform: "messenger" },
      { src: twitter, platform: "twitter" },
   ];

   return (
      <motion.div
         className="text-white grid grid-cols-1 md:grid-cols-2 justify-between py-20 px-2 md:px-0 relative"
         style={{ y: springBackgroundY }}
      >
         {/* Left Content - Layered Sequential Animation */}
         <motion.div
            variants={heroSequenceVariants}
            initial="hidden"
            animate="visible"
            style={{ perspective: 1000 }}
         >
            {/* Main Heading - Stage 1 */}
            <motion.p
               className="text-[30px] md:text-[64px] font-bold mb-5"
               variants={headingRevealVariants}
               style={{ transformStyle: "preserve-3d" }}
            >
               {t("referEarnRewards")}
            </motion.p>

            {/* Description Text - Stage 2 */}
            <motion.p className="mb-2" variants={textRevealVariants}>
               {t("referFriendsEarnCash")}
            </motion.p>

            <motion.p className="mb-5" variants={textRevealVariants}>
               {t("noLimitsNoHassle")}
            </motion.p>

            {/* Social Share Section - Stage 3 */}
            <motion.div
               className="md:flex items-center gap-4"
               variants={textRevealVariants}
            >
               <p>{t("shareReferralCodeThrough")}</p>

               {/* Social Icons with Staggered Animation */}
               <motion.div
                  className="flex items-center gap-1 my-5"
                  variants={heroSequenceVariants}
               >
                  {socialIcons.map((icon, idx) => (
                     <motion.img
                        key={idx}
                        src={icon.src}
                        alt={icon.platform}
                        variants={socialIconVariants}
                        whileHover={socialIconHoverVariants.hover}
                        whileTap={socialIconHoverVariants.tap}
                        className="cursor-pointer"
                        onClick={() => handleShare(icon.platform)}
                        style={{ originX: 0.5, originY: 0.5 }}
                     />
                  ))}
               </motion.div>
            </motion.div>

            {/* CTA Section - Stage 4 */}
            {!decodedToken ? (
               <motion.button
                  onClick={handleReferring}
                  className="bg-[#22A59A] px-5 text-white rounded-sm py-2 cursor-pointer max-h-10"
                  variants={buttonRevealVariants}
                  whileHover={buttonHoverVariants.hover}
                  whileTap={buttonHoverVariants.tap}
               >
                  {t("startReferring")}
               </motion.button>
            ) : (
               <motion.div
                  className="flex items-center gap-4 rounded-md"
                  variants={buttonRevealVariants}
               >
                  <Input
                     value={profileData?.referralCode}
                     readOnly
                     className="max-w-[320px] text-white bg-white rounded-md"
                     size="large"
                     addonAfter={
                        <motion.button
                           onClick={() => handleCopy(profileData?.referralCode)}
                           className="text-[#22A59A] font-black rounded-sm px-3 py-2 cursor-pointer"
                           whileHover={{ scale: 1.1 }}
                           whileTap={{ scale: 0.9 }}
                        >
                           <CopyOutlined size={40} />
                        </motion.button>
                     }
                  />
                  <motion.button
                     className="bg-[#22A59A] px-5 text-white rounded-sm py-2 cursor-pointer max-h-10"
                     onClick={() => handleShare("whatsapp")}
                     whileHover={buttonHoverVariants.hover}
                     whileTap={buttonHoverVariants.tap}
                  >
                     Invite Now
                  </motion.button>
               </motion.div>
            )}
         </motion.div>

         {/* Hero Image - Stage 5 with Parallax */}
         <motion.div
            ref={imageRef}
            className="mx-auto relative"
            initial="hidden"
            animate="visible"
            variants={imageRevealVariants}
            style={{
               y: imageY,
               scale: imageScale,
               transformStyle: "preserve-3d",
            }}
         >
            {/* Background glow effect */}
            <motion.div
               className="absolute inset-0 bg-gradient-to-r from-[#22A59A]/20 to-transparent rounded-full blur-3xl"
               animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
               }}
               transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
               }}
            />

            <motion.img
               src={img}
               alt="hero_img"
               className="w-full max-w-md relative z-10"
               whileHover={{
                  scale: 1.03,
                  rotateY: 5,
                  transition: { duration: 0.4 },
               }}
            />
         </motion.div>
      </motion.div>
   );
};

export default Hero;
