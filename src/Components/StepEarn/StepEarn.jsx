import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const StepEarn = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="text-white py-20 px-2 ms:px-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.p 
        variants={itemVariants}
        className="text-center text-[30px] md:text-[48px] font-bold pb-10"
      >
        {t("threeStepsToEarn")}
      </motion.p>
      <motion.div 
        variants={containerVariants}
        className="mt-10 md:flex justify-between items-center"
      >
        <motion.div variants={itemVariants} className="bg-[#0D0D0D] rounded-md shadow-2xl p-10 relative">
          <p className="bg-[#1479FD] p-5 rounded-full text-4xl font-extrabold inline-block absolute -top-8">
            01
          </p>
          <p className="text-xl font-bold mt-10">{t("step1Title")}</p>
          <p>{t("step1Line1")}</p>
          <p>{t("step1Line2")}</p>
          <p>{t("step1Line3")}</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-[#0D0D0D] rounded-md shadow-2xl p-10 relative">
          <p className="bg-[#1479FD] p-5 rounded-full text-4xl font-extrabold inline-block absolute -top-8">
            02
          </p>
          <p className="text-xl font-bold mt-10">{t("step2Title")}</p>
          <p>{t("step2Line1")}</p>
          <p>{t("step2Line2")}</p>
          <p>{t("step2Line3")}</p>
        </motion.div>
        <motion.div variants={itemVariants} className="bg-[#0D0D0D] rounded-md shadow-2xl p-10 relative">
          <p className="bg-[#1479FD] p-5 rounded-full text-4xl font-extrabold inline-block absolute -top-8">
            03
          </p>
          <p className="text-xl font-bold mt-10">{t("step3Title")}</p>
          <p>{t("step3Line1")}</p>
          <p>{t("step3Line2")}</p>
          <p>{t("step3Line3")}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StepEarn;
