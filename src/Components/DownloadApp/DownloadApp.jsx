import React from "react";
import mobile from "../../assets/images/mobile.png";
import qr from "../../assets/images/qr.png";
import google from "../../assets/images/google.png";
import app from "../../assets/images/app.png";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

const DownloadApp = () => {
  const { t } = useTranslation();

  return (
    <motion.div 
      className="flex items-center justify-between text-white px-2 mt-20 md:px-0"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div className="w-full md:flex flex-col justify-center items-center" variants={itemVariants}>
        <motion.div variants={containerVariants}>
          <motion.p variants={itemVariants} className="text-[40px] md:text-[60px] font-bold text-center">
            {t("download")}
          </motion.p>
          <motion.p variants={itemVariants} className="text-[40px] text-center font-bold">{t("ourApp")}</motion.p>
          <motion.p variants={itemVariants} className="text-center mt-2">{t("tipYourFavoritePlayers1")}</motion.p>
          <motion.p variants={itemVariants} className="text-center">{t("tipYourFavoritePlayers2")}</motion.p>
          <motion.p variants={itemVariants} className="text-center">{t("tipYourFavoritePlayers3")}</motion.p>
          <motion.div variants={itemVariants} className="md:flex items-center gap-5 mt-10">
            <div className="flex justify-center mb-5">
              <img src={qr} alt={t("qrCodeAlt")} />
            </div>
            <div className="space-y-3 flex flex-col justify-center gap-5 px-10 pb-10">
              <img src={google} alt={t("googlePlayAlt")} />
              <img src={app} alt={t("appStoreAlt")} />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div 
        className="w-full hidden md:block"
        variants={{
          hidden: { opacity: 0, y: 60 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
          },
        }}
      >
        <img src={mobile} alt={t("mobileAppAlt")} />
      </motion.div>
    </motion.div>
  );
};

export default DownloadApp;
