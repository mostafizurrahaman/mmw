/* eslint-disable no-unused-vars */
import React from "react";
import easy from "../../assets/images/easy.png";
import Affiliate from "../../assets/images/Affiliate.png";
import tracking from "../../assets/images/tracking.png";
import reward from "../../assets/images/reward.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8, ease: [0.22, 1, 0.36, 1],
    },
  },
};

const WhyChooseUs = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="text-white mt-10 px-2 md:px-0"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Title Animation */}
      <motion.p
        variants={item}
        className="text-center text-[30px] md:text-[48px] font-bold"
      >
        {t("whyChooseUs")}
      </motion.p>

      <motion.p
        variants={item}
        className="text-center mt-5"
      >
        {t("unlockOpportunitiesPart1")}
      </motion.p>

      <motion.p
        variants={item}
        className="text-center"
      >
        {t("unlockOpportunitiesPart2")}
      </motion.p>

      {/* Cards Animation */}
      <motion.div
        variants={container}
        className="md:flex justify-between items-center py-10 mt-20"
      >
        {/* Card 1 */}
        <motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col justify-center items-center my-5"
        >
          <img src={easy} alt={t("easyFreeSignupAlt")} />
          <p className="text-xl font-semibold my-3">
            {t("easyFreeSignupTitle")}
          </p>
          <p>{t("easyFreeSignupLine1")}</p>
          <p>{t("easyFreeSignupLine2")}</p>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col justify-center items-center my-5"
        >
          <img src={Affiliate} alt={t("multiLevelEarningsAlt")} />
          <p className="text-xl font-semibold my-3">
            {t("multiLevelEarningsTitle")}
          </p>
          <p>{t("multiLevelEarningsLine1")}</p>
          <p>{t("multiLevelEarningsLine2")}</p>
          <p>{t("multiLevelEarningsLine3")}</p>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col justify-center items-center my-5"
        >
          <img src={tracking} alt={t("seamlessTrackingAlt")} />
          <p className="text-xl font-semibold my-3">
            {t("seamlessTrackingTitle")}
          </p>
          <p>{t("seamlessTrackingLine1")}</p>
          <p>{t("seamlessTrackingLine2")}</p>
          <p>{t("seamlessTrackingLine3")}</p>
        </motion.div>

        {/* Card 4 */}
        <motion.div
          variants={item}
          whileHover={{ scale: 1.05 }}
          className="flex flex-col justify-center items-center my-5"
        >
          <img src={reward} alt={t("instantRewardsAlt")} />
          <p className="text-xl font-semibold my-3">
            {t("instantRewardsTitle")}
          </p>
          <p>{t("instantRewardsLine1")}</p>
          <p>{t("instantRewardsLine2")}</p>
          <p>{t("instantRewardsLine3")}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WhyChooseUs;
