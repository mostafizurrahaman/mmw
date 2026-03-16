import { useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

/**
 * Standard parallax effect hook
 * Creates smooth vertical movement based on scroll
 */
export const useParallax = (range = 50) => {
   const ref = useRef(null);

   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
   });

   const rawY = useTransform(scrollYProgress, [0, 1], [-range, range]);

   // Apply spring physics for smoother motion
   const y = useSpring(rawY, {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
   });

   return { ref, y, scrollYProgress };
};

/**
 * Image parallax with scale effect
 * Creates zoom + movement effect for images
 */
export const useImageParallax = (yRange = 40, scaleRange = [1, 1.08]) => {
   const ref = useRef(null);

   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
   });

   const rawY = useTransform(scrollYProgress, [0, 1], [yRange, -yRange]);
   const rawScale = useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [scaleRange[0], scaleRange[1], scaleRange[0]],
   );

   const y = useSpring(rawY, { stiffness: 100, damping: 30 });
   const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });

   return { ref, y, scale, scrollYProgress };
};

/**
 * Scroll-based opacity and scale
 * For fade-in effects tied to scroll
 */
export const useScrollReveal = () => {
   const ref = useRef(null);

   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "center center"],
   });

   const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
   const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1]);
   const y = useTransform(scrollYProgress, [0, 0.5, 1], [60, 0, 0]);

   return { ref, opacity, scale, y, scrollYProgress };
};

/**
 * Horizontal parallax effect
 * For side-scrolling elements
 */
export const useHorizontalParallax = (range = 30) => {
   const ref = useRef(null);

   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
   });

   const rawX = useTransform(scrollYProgress, [0, 1], [-range, range]);
   const x = useSpring(rawX, { stiffness: 100, damping: 30 });

   return { ref, x, scrollYProgress };
};

/**
 * Rotation parallax effect
 * For subtle rotation during scroll
 */
export const useRotationParallax = (rotateRange = 5) => {
   const ref = useRef(null);

   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
   });

   const rawRotate = useTransform(
      scrollYProgress,
      [0, 1],
      [-rotateRange, rotateRange],
   );
   const rotate = useSpring(rawRotate, { stiffness: 100, damping: 30 });

   return { ref, rotate, scrollYProgress };
};

/**
 * Combined parallax effects
 * For complex multi-property animations
 */
export const useAdvancedParallax = () => {
   const ref = useRef(null);

   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
   });

   const y = useTransform(scrollYProgress, [0, 1], [-30, 30]);
   const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.02, 0.98]);
   const opacity = useTransform(
      scrollYProgress,
      [0, 0.2, 0.8, 1],
      [0.7, 1, 1, 0.7],
   );
   const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3]);

   return {
      ref,
      y: useSpring(y, { stiffness: 100, damping: 30 }),
      scale: useSpring(scale, { stiffness: 100, damping: 30 }),
      opacity,
      rotateX: useSpring(rotateX, { stiffness: 100, damping: 30 }),
      scrollYProgress,
   };
};
