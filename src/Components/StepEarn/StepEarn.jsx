import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
   slowStaggerContainerVariants,
   cardItemVariants,
} from "@/animations/staggerVariants";
import {
   headingRevealVariants,
   depthRevealVariants,
} from "@/animations/scrollVariants";
import { cardHoverVariants } from "@/animations/hoverVariants";

// Step Card Component with 3D Depth
const StepCard = ({ number, title, lines, index }) => {
   const cardRef = useRef(null);

   const { scrollYProgress } = useScroll({
      target: cardRef,
      offset: ["start end", "center center"],
   });

   // 3D transform based on scroll
   const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [12, 0, -4]);
   const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);

   const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 25 });
   const springScale = useSpring(scale, { stiffness: 100, damping: 25 });

   return (
      <motion.div
         ref={cardRef}
         className="bg-[#0D0D0D] rounded-md shadow-2xl p-10 relative"
         variants={cardItemVariants}
         initial="initial"
         whileHover="hover"
         style={{
            perspective: 1200,
            transformStyle: "preserve-3d",
            rotateX: springRotateX,
            scale: springScale,
         }}
      >
         {/* Animated Number Badge */}
         <motion.p
            className="bg-[#1479FD] p-5 rounded-full text-4xl font-extrabold inline-block absolute -top-8"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{
               type: "spring",
               stiffness: 200,
               damping: 15,
               delay: index * 0.15,
            }}
            whileHover={{
               scale: 1.1,
               rotate: 10,
               boxShadow: "0 10px 30px rgba(20, 121, 253, 0.4)",
            }}
         >
            {number}
         </motion.p>

         {/* Card Content with Staggered Text */}
         <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
               hidden: { opacity: 0 },
               visible: {
                  opacity: 1,
                  transition: {
                     staggerChildren: 0.08,
                     delayChildren: 0.3 + index * 0.1,
                  },
               },
            }}
         >
            <motion.p
               className="text-xl font-bold mt-10"
               variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
               }}
            >
               {title}
            </motion.p>

            {lines.map((line, lineIdx) => (
               <motion.p
                  key={lineIdx}
                  variants={{
                     hidden: { opacity: 0, y: 15 },
                     visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
               >
                  {line}
               </motion.p>
            ))}
         </motion.div>

         {/* Hover Glow Effect */}
         <motion.div
            className="absolute inset-0 rounded-md pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{
               opacity: 1,
               background:
                  "linear-gradient(135deg, rgba(34, 165, 154, 0.1) 0%, transparent 50%)",
            }}
            transition={{ duration: 0.3 }}
         />
      </motion.div>
   );
};

const StepEarn = () => {
   const { t } = useTranslation();
   const sectionRef = useRef(null);

   const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start end", "end start"],
   });

   // Subtle parallax for entire section
   const sectionY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
   const springSectionY = useSpring(sectionY, { stiffness: 80, damping: 30 });

   const steps = [
      {
         number: "01",
         title: t("step1Title"),
         lines: [t("step1Line1"), t("step1Line2"), t("step1Line3")],
      },
      {
         number: "02",
         title: t("step2Title"),
         lines: [t("step2Line1"), t("step2Line2"), t("step2Line3")],
      },
      {
         number: "03",
         title: t("step3Title"),
         lines: [t("step3Line1"), t("step3Line2"), t("step3Line3")],
      },
   ];

   return (
      <motion.div
         ref={sectionRef}
         className="text-white py-20 px-2 ms:px-0"
         style={{ y: springSectionY }}
      >
         {/* Section Heading */}
         <motion.p
            className="text-center text-[30px] md:text-[48px] font-bold pb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={headingRevealVariants}
         >
            {t("threeStepsToEarn")}
         </motion.p>

         {/* Step Cards with Stagger */}
         <motion.div
            className="mt-10 md:flex justify-between items-center gap-6"
            variants={slowStaggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{ perspective: 1000 }}
         >
            {steps.map((step, index) => (
               <StepCard
                  key={index}
                  index={index}
                  number={step.number}
                  title={step.title}
                  lines={step.lines}
               />
            ))}
         </motion.div>
      </motion.div>
   );
};

export default StepEarn;
