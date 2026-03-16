import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import easy from "../../assets/images/easy.png";
import Affiliate from "../../assets/images/Affiliate.png";
import tracking from "../../assets/images/tracking.png";
import reward from "../../assets/images/reward.png";
import { useTranslation } from "react-i18next";
import {
   mediumStaggerContainerVariants,
   featureCardVariants,
} from "@/animations/staggerVariants";
import {
   headingRevealVariants,
   textRevealVariants,
} from "@/animations/scrollVariants";
import { featureCardHoverVariants } from "@/animations/hoverVariants";

// Feature Card Component with 3D Depth Animation
const FeatureCard = ({ image, title, lines, index, alt }) => {
   const cardRef = useRef(null);

   const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "end start"],
   });

   // 3D rotation based on scroll
   const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -4]);
   const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });

   return (
      <motion.div
         ref={cardRef}
         className="flex flex-col justify-center items-center my-5"
         variants={featureCardVariants}
         initial="initial"
         whileHover="hover"
         style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
            rotateX: springRotateX,
         }}
      >
         <motion.div
            className="relative"
            whileHover={featureCardHoverVariants.hover}
            style={{ transformStyle: "preserve-3d" }}
         >
            {/* Glow effect behind image */}
            <motion.div
               className="absolute inset-0 bg-[#22A59A]/20 rounded-full blur-2xl"
               initial={{ opacity: 0, scale: 0.8 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: index * 0.1, duration: 0.6 }}
            />

            <motion.img
               src={image}
               alt={alt}
               className="relative z-10"
               whileHover={{
                  scale: 1.15,
                  rotateY: 10,
                  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
               }}
            />
         </motion.div>

         <motion.p
            className="text-xl font-semibold my-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05, duration: 0.5 }}
         >
            {title}
         </motion.p>

         {lines.map((line, lineIdx) => (
            <motion.p
               key={lineIdx}
               initial={{ opacity: 0, y: 15 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{
                  delay: 0.3 + index * 0.05 + lineIdx * 0.05,
                  duration: 0.4,
               }}
            >
               {line}
            </motion.p>
         ))}
      </motion.div>
   );
};

const WhyChooseUs = () => {
   const { t } = useTranslation();
   const sectionRef = useRef(null);

   const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
   });

   // Parallax for section background
   const backgroundY = useTransform(scrollYProgress, [0, 1], [-20, 20]);

   const features = [
      {
         image: easy,
         alt: t("easyFreeSignupAlt"),
         title: t("easyFreeSignupTitle"),
         lines: [t("easyFreeSignupLine1"), t("easyFreeSignupLine2")],
      },
      {
         image: Affiliate,
         alt: t("multiLevelEarningsAlt"),
         title: t("multiLevelEarningsTitle"),
         lines: [
            t("multiLevelEarningsLine1"),
            t("multiLevelEarningsLine2"),
            t("multiLevelEarningsLine3"),
         ],
      },
      {
         image: tracking,
         alt: t("seamlessTrackingAlt"),
         title: t("seamlessTrackingTitle"),
         lines: [
            t("seamlessTrackingLine1"),
            t("seamlessTrackingLine2"),
            t("seamlessTrackingLine3"),
         ],
      },
      {
         image: reward,
         alt: t("instantRewardsAlt"),
         title: t("instantRewardsTitle"),
         lines: [
            t("instantRewardsLine1"),
            t("instantRewardsLine2"),
            t("instantRewardsLine3"),
         ],
      },
   ];

   return (
      <motion.div
         ref={sectionRef}
         className="text-white mt-10 px-2 md:px-0 relative"
         style={{ y: backgroundY }}
      >
         {/* Section Header */}
         <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
         >
            <motion.p
               variants={headingRevealVariants}
               className="text-center text-[30px] md:text-[48px] font-bold"
            >
               {t("whyChooseUs")}
            </motion.p>

            <motion.p
               variants={textRevealVariants}
               className="text-center mt-5"
            >
               {t("unlockOpportunitiesPart1")}
            </motion.p>

            <motion.p variants={textRevealVariants} className="text-center">
               {t("unlockOpportunitiesPart2")}
            </motion.p>
         </motion.div>

         {/* Feature Cards Grid with Staggered Animation */}
         <motion.div
            className="md:flex justify-between items-center py-10 mt-20"
            variants={mediumStaggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
         >
            {features.map((feature, index) => (
               <FeatureCard
                  key={index}
                  index={index}
                  image={feature.image}
                  alt={feature.alt}
                  title={feature.title}
                  lines={feature.lines}
               />
            ))}
         </motion.div>
      </motion.div>
   );
};

export default WhyChooseUs;
