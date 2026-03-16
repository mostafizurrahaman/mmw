/**
 * Staggered Animation Variants
 * Progressive delay patterns for grids and lists
 */

// Fast stagger container (0.08s delay between children)
export const staggerContainerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.08,
         delayChildren: 0.1,
      },
   },
};

// Medium stagger container (0.12s delay)
export const mediumStaggerContainerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.12,
         delayChildren: 0.15,
      },
   },
};

// Slow stagger container (0.18s delay)
export const slowStaggerContainerVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.18,
         delayChildren: 0.2,
      },
   },
};

// Hero sequence container - for layered hero animation
export const heroSequenceVariants = {
   hidden: { opacity: 0 },
   visible: {
      opacity: 1,
      transition: {
         staggerChildren: 0.12,
         delayChildren: 0.2,
      },
   },
};

// Card grid item with 3D depth
export const cardItemVariants = {
   hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
      rotateX: 6,
   },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
         duration: 0.7,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Simple stagger item
export const staggerItemVariants = {
   hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
      filter: "blur(4px)",
   },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
         duration: 0.6,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Feature card item with enhanced depth
export const featureCardVariants = {
   hidden: {
      opacity: 0,
      y: 60,
      scale: 0.92,
      rotateX: 8,
      filter: "blur(6px)",
   },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
         duration: 0.8,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Social icon stagger
export const socialIconVariants = {
   hidden: {
      opacity: 0,
      scale: 0,
      rotate: -180,
   },
   visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
         type: "spring",
         stiffness: 200,
         damping: 15,
      },
   },
};
