import { useForm, Controller } from "react-hook-form";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useRef } from "react";
import {
   staggerContainerVariants,
   mediumStaggerContainerVariants,
} from "@/animations/staggerVariants";
import {
   scrollRevealVariants,
   headingRevealVariants,
   textRevealVariants,
   depthRevealVariants,
} from "@/animations/scrollVariants";
import { buttonHoverVariants } from "@/animations/hoverVariants";

const ContactUs = () => {
   const { t } = useTranslation();
   const navigate = useNavigate();
   const containerRef = useRef(null);

   const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm();

   // Scroll-based parallax
   const { scrollYProgress } = useScroll({
      target: containerRef,
      offset: ["start end", "end start"],
   });

   const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
   const springY = useSpring(y, { stiffness: 100, damping: 30 });

   const onSubmit = async (data) => {
      try {
         const response = await fetch(import.meta.env.VITE_FORMSPREE_ADDRESS, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
               "Content-Type": "application/json",
            },
         });

         if (response.ok) {
            toast.success(t("messageSentSuccess"));
            reset();
            navigate("/");
         } else {
            toast.error(t("failedToSendMessage"));
         }
      } catch {
         toast.error(t("somethingWentWrong"));
      }
   };

   // Animation variants for form fields
   const formFieldVariants = {
      hidden: {
         opacity: 0,
         y: 30,
         filter: "blur(4px)",
      },
      visible: {
         opacity: 1,
         y: 0,
         filter: "blur(0px)",
         transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
         },
      },
   };

   // Contact detail item variants
   const contactDetailVariants = {
      hidden: {
         opacity: 0,
         x: -30,
         filter: "blur(4px)",
      },
      visible: {
         opacity: 1,
         x: 0,
         filter: "blur(0px)",
         transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
         },
      },
   };

   // Icon animation variants
   const iconVariants = {
      initial: { scale: 1 },
      hover: {
         scale: 1.2,
         rotate: 10,
         transition: {
            type: "spring",
            stiffness: 400,
            damping: 10,
         },
      },
   };

   const contactDetails = [
      {
         Icon: FaPhoneAlt,
         text: "839949950252",
         color: "#22A59A",
      },
      {
         Icon: IoMdMail,
         text: "infocompany@gmail.com",
         color: "#22A59A",
      },
      {
         Icon: FaLocationDot,
         text: "123 Main St, Springfield, IL 62701, USA",
         color: "#22A59A",
      },
   ];

   return (
      <div className="text-white container mx-auto" ref={containerRef}>
         {/* Header Section */}
         <motion.div
            initial="hidden"
            animate="visible"
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
            <motion.p
               className="text-center text-4xl font-semibold pt-10"
               variants={headingRevealVariants}
            >
               {t("contactUs")}
            </motion.p>
            <motion.p
               className="text-center mt-2"
               variants={textRevealVariants}
            >
               {t("homeContactUs")}
            </motion.p>
         </motion.div>

         {/* Main Content - Two Columns */}
         <motion.div
            className="md:flex justify-between gap-36 mt-20 py-20"
            style={{ y: springY }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={mediumStaggerContainerVariants}
         >
            {/* Contact Details - Left Column */}
            <motion.div
               className="w-full"
               variants={scrollRevealVariants}
               style={{ perspective: 1000, transformStyle: "preserve-3d" }}
            >
               <motion.p
                  className="text-2xl font-bold"
                  initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
               >
                  {t("contactDetails")}
               </motion.p>

               <motion.p
                  className="mt-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                     duration: 0.6,
                     delay: 0.1,
                     ease: [0.22, 1, 0.36, 1],
                  }}
               >
                  {t("contactDetailsDescription")}
               </motion.p>

               {/* Contact Details List */}
               <motion.div
                  variants={{
                     hidden: { opacity: 0 },
                     visible: {
                        opacity: 1,
                        transition: {
                           staggerChildren: 0.12,
                           delayChildren: 0.3,
                        },
                     },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
               >
                  {contactDetails.map((detail, index) => (
                     <motion.p
                        key={index}
                        className="flex items-center gap-2 mt-5"
                        variants={contactDetailVariants}
                        whileHover={{
                           x: 10,
                           transition: { duration: 0.3 },
                        }}
                     >
                        <motion.span
                           variants={iconVariants}
                           initial="initial"
                           whileHover="hover"
                           className="inline-block"
                        >
                           <detail.Icon color={detail.color} />
                        </motion.span>
                        <motion.span
                           whileHover={{
                              color: detail.color,
                              transition: { duration: 0.3 },
                           }}
                        >
                           {detail.text}
                        </motion.span>
                     </motion.p>
                  ))}
               </motion.div>
            </motion.div>

            {/* Contact Form - Right Column */}
            <motion.div className="w-full" variants={depthRevealVariants}>
               <motion.form
                  onSubmit={handleSubmit(onSubmit)}
                  variants={{
                     hidden: { opacity: 0 },
                     visible: {
                        opacity: 1,
                        transition: {
                           staggerChildren: 0.1,
                           delayChildren: 0.2,
                        },
                     },
                  }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
               >
                  {/* Full Name */}
                  <motion.div className="mb-4" variants={formFieldVariants}>
                     <motion.label
                        className="text-white text-lg"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                     >
                        {t("fullName")}
                     </motion.label>
                     <Controller
                        name="fullName"
                        control={control}
                        rules={{ required: t("fullNameRequired") }}
                        render={({ field }) => (
                           <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                           >
                              <Input
                                 {...field}
                                 size="large"
                                 placeholder={t("typeName")}
                                 className="mt-1"
                              />
                           </motion.div>
                        )}
                     />
                     {errors.fullName && (
                        <motion.p
                           className="text-red-500 text-sm mt-2"
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.3 }}
                        >
                           {errors.fullName.message}
                        </motion.p>
                     )}
                  </motion.div>

                  {/* Email */}
                  <motion.div className="mb-4" variants={formFieldVariants}>
                     <motion.label
                        className="text-white text-lg"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                     >
                        {t("email")}
                     </motion.label>
                     <Controller
                        name="email"
                        control={control}
                        rules={{
                           required: t("emailRequired"),
                           pattern: {
                              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                              message: t("emailValid"),
                           },
                        }}
                        render={({ field }) => (
                           <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                           >
                              <Input
                                 {...field}
                                 size="large"
                                 type="email"
                                 placeholder={t("typeEmail")}
                                 className="mt-1"
                              />
                           </motion.div>
                        )}
                     />
                     {errors.email && (
                        <motion.p
                           className="text-red-500 text-sm mt-2"
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.3 }}
                        >
                           {errors.email.message}
                        </motion.p>
                     )}
                  </motion.div>

                  {/* Phone Number */}
                  <motion.div className="mb-4" variants={formFieldVariants}>
                     <motion.label
                        className="text-white text-lg"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                     >
                        {t("phoneNumber")}
                     </motion.label>
                     <Controller
                        name="phone"
                        control={control}
                        rules={{ required: t("phoneRequired") }}
                        render={({ field }) => (
                           <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                           >
                              <Input
                                 {...field}
                                 size="large"
                                 type="tel"
                                 placeholder={t("phonePlaceholder")}
                                 className="mt-1"
                              />
                           </motion.div>
                        )}
                     />
                     {errors.phone && (
                        <motion.p
                           className="text-red-500 text-sm mt-2"
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.3 }}
                        >
                           {errors.phone.message}
                        </motion.p>
                     )}
                  </motion.div>

                  {/* Message */}
                  <motion.div className="mb-4" variants={formFieldVariants}>
                     <motion.label
                        className="text-white text-lg"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                     >
                        {t("message")}
                     </motion.label>
                     <Controller
                        name="message"
                        control={control}
                        rules={{ required: t("messageRequired") }}
                        render={({ field }) => (
                           <motion.div
                              whileFocus={{ scale: 1.02 }}
                              transition={{ duration: 0.2 }}
                           >
                              <TextArea
                                 {...field}
                                 size="large"
                                 placeholder={t("messagePlaceholder")}
                                 className="mt-1"
                                 rows={4}
                              />
                           </motion.div>
                        )}
                     />
                     {errors.message && (
                        <motion.p
                           className="text-red-500 text-sm mt-2"
                           initial={{ opacity: 0, y: -10 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ duration: 0.3 }}
                        >
                           {errors.message.message}
                        </motion.p>
                     )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                     type="submit"
                     className="bg-[#22A59A] w-full text-white rounded-sm py-2 text-xl cursor-pointer"
                     variants={formFieldVariants}
                     whileHover={buttonHoverVariants.hover}
                     whileTap={buttonHoverVariants.tap}
                     style={{
                        position: "relative",
                        overflow: "hidden",
                     }}
                  >
                     {/* Shimmer effect */}
                     <motion.span
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{
                           x: "100%",
                           transition: { duration: 0.6 },
                        }}
                     />
                     <span className="relative z-10">{t("submit")}</span>
                  </motion.button>
               </motion.form>
            </motion.div>
         </motion.div>
      </div>
   );
};

export default ContactUs;
