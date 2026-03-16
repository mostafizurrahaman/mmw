/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import {
   motion,
   useScroll,
   useTransform,
   useSpring,
   useMotionValueEvent,
   AnimatePresence,
} from "framer-motion";
import logo from "../../assets/images/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { jwtDecode } from "jwt-decode";
import { currentAccessToken } from "@/redux/features/auth/authSlice";
import { useProfileQuery } from "@/redux/features/auth/authApi";
import { useSelector } from "react-redux";
import Loading from "../shared/Loading";
import { Avatar, Select } from "antd";
import { UserOutlined } from "@ant-design/icons";
import english from "@/assets/images/uk-flag.png";
import spanish from "@/assets/images/spain.png";
import { useTranslation } from "react-i18next";

// Language options
const options = [
   {
      value: "en",
      label: (
         <div className="flex gap-1 items-center">
            <img className="h-5 w-5" src={english} alt="English" />
            <span>English</span>
         </div>
      ),
   },
   {
      value: "es",
      label: (
         <div className="flex gap-1 items-center">
            <img className="h-5 w-5" src={spanish} alt="Spanish" />
            <span>Spanish</span>
         </div>
      ),
   },
];

// Animation Variants
const navContainerVariants = {
   hidden: { y: -100, opacity: 0 },
   visible: {
      y: 0,
      opacity: 1,
      transition: {
         duration: 0.6,
         ease: [0.22, 1, 0.36, 1],
         staggerChildren: 0.08,
         delayChildren: 0.2,
      },
   },
};

const logoVariants = {
   hidden: { opacity: 0, x: -30, filter: "blur(10px)" },
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

const navItemVariants = {
   hidden: { opacity: 0, y: -20, filter: "blur(4px)" },
   visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
         duration: 0.5,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

const menuItemHoverVariants = {
   initial: { scale: 1 },
   hover: {
      scale: 1.08,
      color: "#22A59A",
      transition: {
         duration: 0.25,
         ease: [0.22, 1, 0.36, 1],
      },
   },
   tap: { scale: 0.95 },
};

const buttonVariants = {
   hidden: { opacity: 0, scale: 0.8, filter: "blur(8px)" },
   visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
         duration: 0.5,
         ease: [0.22, 1, 0.36, 1],
      },
   },
   hover: {
      scale: 1.05,
      boxShadow: "0 10px 30px rgba(234, 179, 8, 0.3)",
      transition: {
         duration: 0.25,
         ease: [0.22, 1, 0.36, 1],
      },
   },
   tap: { scale: 0.95 },
};

const iconButtonVariants = {
   initial: { scale: 1 },
   hover: {
      scale: 1.15,
      rotate: 15,
      transition: {
         type: "spring",
         stiffness: 400,
         damping: 10,
      },
   },
   tap: { scale: 0.9 },
};

const mobileMenuVariants = {
   hidden: {
      opacity: 0,
      height: 0,
      transition: {
         duration: 0.3,
         ease: [0.22, 1, 0.36, 1],
         when: "afterChildren",
      },
   },
   visible: {
      opacity: 1,
      height: "auto",
      transition: {
         duration: 0.4,
         ease: [0.22, 1, 0.36, 1],
         when: "beforeChildren",
         staggerChildren: 0.08,
         delayChildren: 0.1,
      },
   },
};

const mobileMenuItemVariants = {
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
         duration: 0.4,
         ease: [0.22, 1, 0.36, 1],
      },
   },
   exit: {
      opacity: 0,
      x: 30,
      transition: {
         duration: 0.2,
      },
   },
};

const hamburgerVariants = {
   closed: { rotate: 0 },
   open: { rotate: 180 },
};

// Underline animation for active link
const UnderlineMotion = ({ isActive }) => (
   <motion.span
      className="absolute bottom-0 left-0 h-[2px] bg-[#22A59A]"
      initial={{ width: 0 }}
      animate={{ width: isActive ? "100%" : 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
   />
);

// NavLink with animation
const AnimatedNavLink = ({ to, children, onClick }) => {
   const location = useLocation();
   const isActive = location.pathname === to;

   return (
      <motion.div
         className="relative"
         variants={navItemVariants}
         whileHover="hover"
         whileTap="tap"
         initial="initial"
      >
         <NavLink
            to={to}
            onClick={onClick}
            className={({ isActive }) =>
               `relative pb-1 transition-colors duration-300 ${
                  isActive
                     ? "text-[#22A59A]"
                     : "text-white hover:text-[#22A59A]"
               }`
            }
         >
            <motion.span
               variants={menuItemHoverVariants}
               className="inline-block"
            >
               {children}
            </motion.span>
            <UnderlineMotion isActive={isActive} />
         </NavLink>
      </motion.div>
   );
};

const NavBar = () => {
   const [menuOpen, setMenuOpen] = useState(false);
   const [decodedToken, setDecodedToken] = useState(null);
   const [isScrolled, setIsScrolled] = useState(false);
   const [isHidden, setIsHidden] = useState(false);
   const [lastScrollY, setLastScrollY] = useState(0);

   const accessToken = useSelector(currentAccessToken);
   const { data: profileData, isLoading } = useProfileQuery();
   const { i18n, t } = useTranslation();
   const navRef = useRef(null);

   // Scroll tracking
   const { scrollY } = useScroll();

   // Transform values based on scroll
   const navBackground = useTransform(
      scrollY,
      [0, 100],
      ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.95)"],
   );

   const navBlur = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(12px)"]);

   const navPadding = useTransform(scrollY, [0, 100], [16, 8]);
   const navScale = useTransform(scrollY, [0, 100], [1, 0.98]);

   // Spring physics for smooth animations
   const springNavPadding = useSpring(navPadding, {
      stiffness: 100,
      damping: 20,
   });
   const springNavScale = useSpring(navScale, { stiffness: 100, damping: 20 });

   // Border radius animation
   const navBorderRadius = useTransform(scrollY, [0, 100], [9999, 20]);
   const springBorderRadius = useSpring(navBorderRadius, {
      stiffness: 100,
      damping: 20,
   });

   // Shadow on scroll
   const navShadow = useTransform(
      scrollY,
      [0, 100],
      ["0 0 0 rgba(0,0,0,0)", "0 10px 40px rgba(0,0,0,0.3)"],
   );

   // Track scroll direction for hide/show navbar
   useMotionValueEvent(scrollY, "change", (latest) => {
      const previous = lastScrollY;

      if (latest > previous && latest > 150) {
         setIsHidden(true);
      } else {
         setIsHidden(false);
      }

      setLastScrollY(latest);
      setIsScrolled(latest > 50);
   });

   useEffect(() => {
      if (accessToken) {
         try {
            const decoded = jwtDecode(accessToken);
            setDecodedToken(decoded);
         } catch (error) {
            console.error("Token decode error:", error);
         }
      }
   }, [accessToken]);

   const handleLanguageChange = (value) => {
      i18n.changeLanguage(value);
   };

   const navLinks = [
      { to: "/", label: t("home") },
      { to: "/videos", label: t("videos") },
      { to: "/files", label: t("files") },
      { to: "/contact-us", label: t("contactUs") },
   ];

   return (
      <>
         {isLoading && <Loading />}

         {/* Navbar Container */}
         <motion.div
            ref={navRef}
            className="sticky top-0 z-50"
            initial="hidden"
            animate="visible"
            variants={navContainerVariants}
            style={{
               paddingTop: springNavPadding,
               paddingBottom: springNavPadding,
            }}
         >
            {/* Animated background layer */}
            <motion.div
               className="absolute inset-0 -z-10"
               style={{
                  backgroundColor: navBackground,
                  backdropFilter: navBlur,
               }}
            />

            <div className="container mx-auto px-4">
               <motion.div
                  className="flex items-center justify-between border border-gray-700 px-6 py-3"
                  style={{
                     backgroundColor: isScrolled
                        ? "rgba(17, 17, 17, 0.95)"
                        : "rgba(17, 17, 17, 0.8)",
                     borderRadius: springBorderRadius,
                     scale: springNavScale,
                     boxShadow: navShadow,
                     y: isHidden ? -100 : 0,
                  }}
                  animate={{
                     y: isHidden ? -100 : 0,
                  }}
                  transition={{
                     y: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                  }}
               >
                  {/* Logo */}
                  <motion.div variants={logoVariants}>
                     <Link to="/">
                        <motion.div
                           className="flex items-center gap-2"
                           whileHover={{
                              scale: 1.05,
                              transition: { duration: 0.3 },
                           }}
                           whileTap={{ scale: 0.95 }}
                        >
                           <motion.img
                              src={logo}
                              className="h-[40px]"
                              alt="logo"
                              initial={{ rotate: -180, opacity: 0 }}
                              animate={{ rotate: 0, opacity: 1 }}
                              transition={{
                                 type: "spring",
                                 stiffness: 200,
                                 damping: 15,
                                 delay: 0.2,
                              }}
                              whileHover={{
                                 rotate: 360,
                                 transition: { duration: 0.6 },
                              }}
                           />
                           <motion.p
                              className="text-white text-xl font-semibold"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3, duration: 0.5 }}
                           >
                              AVANTRA
                           </motion.p>
                        </motion.div>
                     </Link>
                  </motion.div>

                  {/* Desktop Menu */}
                  <motion.div
                     className="hidden md:flex items-center gap-8 bg-[#1a1a1a]/80 px-8 py-2 rounded-full text-white text-sm"
                     initial={{ opacity: 0, y: -20, scale: 0.9 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     transition={{
                        delay: 0.3,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                     }}
                  >
                     {navLinks.map((link, index) => (
                        <AnimatedNavLink key={link.to} to={link.to}>
                           {link.label}
                        </AnimatedNavLink>
                     ))}
                  </motion.div>

                  {/* Right Side */}
                  <motion.div
                     className="flex items-center gap-4"
                     variants={{
                        hidden: { opacity: 0 },
                        visible: {
                           opacity: 1,
                           transition: {
                              staggerChildren: 0.1,
                              delayChildren: 0.4,
                           },
                        },
                     }}
                  >
                     {/* Language Selector */}
                     <motion.div
                        className="hidden md:block"
                        variants={navItemVariants}
                        whileHover={{ scale: 1.05 }}
                     >
                        <Select
                           defaultValue="en"
                           style={{ width: 110 }}
                           optionLabelProp="label"
                           options={options}
                           onChange={handleLanguageChange}
                        />
                     </motion.div>

                     {decodedToken?.userId ? (
                        <>
                           {/* Notification Icon */}
                           <motion.div
                              variants={navItemVariants}
                              whileHover={iconButtonVariants.hover}
                              whileTap={iconButtonVariants.tap}
                           >
                              <NavLink
                                 to="/notification"
                                 className="bg-white p-2 rounded-full hidden md:block relative"
                              >
                                 <IoMdNotificationsOutline
                                    size={20}
                                    color="#22A59A"
                                 />

                                 {/* Notification pulse */}
                                 <motion.span
                                    className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"
                                    animate={{
                                       scale: [1, 1.2, 1],
                                       opacity: [1, 0.8, 1],
                                    }}
                                    transition={{
                                       duration: 2,
                                       repeat: Infinity,
                                       ease: "easeInOut",
                                    }}
                                 />
                              </NavLink>
                           </motion.div>

                           {/* Profile Avatar */}
                           <motion.div
                              variants={navItemVariants}
                              whileHover={{
                                 scale: 1.1,
                                 boxShadow: "0 0 20px rgba(34, 165, 154, 0.5)",
                              }}
                              whileTap={{ scale: 0.95 }}
                              className="hidden md:block"
                           >
                              <NavLink to="/my-profile">
                                 <motion.div
                                    className="rounded-full overflow-hidden border-2 border-transparent"
                                    whileHover={{
                                       borderColor: "#22A59A",
                                       transition: { duration: 0.3 },
                                    }}
                                 >
                                    <Avatar
                                       size="large"
                                       icon={<UserOutlined />}
                                       src={profileData?.photoUrl}
                                    />
                                 </motion.div>
                              </NavLink>
                           </motion.div>
                        </>
                     ) : (
                        <motion.div
                           variants={buttonVariants}
                           className="hidden md:block"
                        >
                           <NavLink to="/login">
                              <motion.button
                                 className="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-2 rounded-full text-white font-medium relative overflow-hidden"
                                 whileHover="hover"
                                 whileTap="tap"
                                 variants={buttonVariants}
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
                                 <span className="relative z-10">
                                    {t("login")}
                                 </span>
                              </motion.button>
                           </NavLink>
                        </motion.div>
                     )}

                     {/* Mobile Menu Button */}
                     <motion.button
                        className="md:hidden text-white p-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                        variants={hamburgerVariants}
                        animate={menuOpen ? "open" : "closed"}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                     >
                        <AnimatePresence mode="wait">
                           {menuOpen ? (
                              <motion.div
                                 key="close"
                                 initial={{ rotate: -90, opacity: 0 }}
                                 animate={{ rotate: 0, opacity: 1 }}
                                 exit={{ rotate: 90, opacity: 0 }}
                                 transition={{ duration: 0.2 }}
                              >
                                 <HiX size={28} />
                              </motion.div>
                           ) : (
                              <motion.div
                                 key="menu"
                                 initial={{ rotate: 90, opacity: 0 }}
                                 animate={{ rotate: 0, opacity: 1 }}
                                 exit={{ rotate: -90, opacity: 0 }}
                                 transition={{ duration: 0.2 }}
                              >
                                 <HiMenu size={28} />
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </motion.button>
                  </motion.div>
               </motion.div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
               {menuOpen && (
                  <motion.div
                     className="md:hidden overflow-hidden"
                     variants={mobileMenuVariants}
                     initial="hidden"
                     animate="visible"
                     exit="hidden"
                  >
                     <motion.div
                        className="bg-black/95 backdrop-blur-lg border-t border-gray-700 mt-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                     >
                        <div className="flex flex-col items-center gap-5 py-6 text-white">
                           {navLinks.map((link, index) => (
                              <motion.div
                                 key={link.to}
                                 variants={mobileMenuItemVariants}
                                 custom={index}
                                 whileHover={{
                                    scale: 1.1,
                                    color: "#22A59A",
                                    x: 10,
                                 }}
                                 whileTap={{ scale: 0.95 }}
                              >
                                 <NavLink
                                    to={link.to}
                                    onClick={() => setMenuOpen(false)}
                                    className={({ isActive }) =>
                                       isActive
                                          ? "text-[#22A59A] font-medium"
                                          : ""
                                    }
                                 >
                                    {link.label}
                                 </NavLink>
                              </motion.div>
                           ))}

                           {/* Language Selector in Mobile */}
                           <motion.div
                              variants={mobileMenuItemVariants}
                              whileHover={{ scale: 1.05 }}
                           >
                              <Select
                                 defaultValue="en"
                                 style={{ width: 150 }}
                                 optionLabelProp="label"
                                 options={options}
                                 onChange={handleLanguageChange}
                              />
                           </motion.div>

                           {/* Mobile Auth Section */}
                           {decodedToken?.userId ? (
                              <motion.div
                                 variants={mobileMenuItemVariants}
                                 whileHover={iconButtonVariants.hover}
                                 whileTap={iconButtonVariants.tap}
                              >
                                 <NavLink
                                    to="/notification"
                                    onClick={() => setMenuOpen(false)}
                                    className="bg-white p-2 rounded-full"
                                 >
                                    <IoMdNotificationsOutline
                                       size={22}
                                       color="#22A59A"
                                    />
                                 </NavLink>
                              </motion.div>
                           ) : (
                              <motion.div variants={mobileMenuItemVariants}>
                                 <NavLink
                                    to="/login"
                                    onClick={() => setMenuOpen(false)}
                                 >
                                    <motion.button
                                       className="bg-gradient-to-r from-[#22A59A] to-[#1f8f87] px-8 py-3 rounded-full font-medium relative overflow-hidden"
                                       whileHover={{
                                          scale: 1.05,
                                          boxShadow:
                                             "0 10px 30px rgba(34, 165, 154, 0.4)",
                                       }}
                                       whileTap={{ scale: 0.95 }}
                                    >
                                       {/* Shimmer effect */}
                                       <motion.span
                                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                          animate={{
                                             x: ["-100%", "100%"],
                                          }}
                                          transition={{
                                             duration: 2,
                                             repeat: Infinity,
                                             repeatDelay: 1,
                                          }}
                                       />
                                       <span className="relative z-10">
                                          {t("login")}
                                       </span>
                                    </motion.button>
                                 </NavLink>
                              </motion.div>
                           )}
                        </div>
                     </motion.div>
                  </motion.div>
               )}
            </AnimatePresence>
         </motion.div>
      </>
   );
};

export default NavBar;
