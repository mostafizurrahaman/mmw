/**
 * Hover Micro-Interaction Variants
 * Smooth feedback for interactive elements
 */

// Card hover effect with shadow
export const cardHoverVariants = {
   initial: {
      scale: 1,
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
   },
   hover: {
      scale: 1.04,
      boxShadow: "0 25px 50px rgba(34, 165, 154, 0.15)",
      transition: {
         duration: 0.3,
         ease: [0.22, 1, 0.36, 1],
      },
   },
   tap: {
      scale: 0.98,
   },
};

// Button hover effect
export const buttonHoverVariants = {
   initial: { scale: 1 },
   hover: {
      scale: 1.06,
      transition: {
         duration: 0.25,
         ease: [0.22, 1, 0.36, 1],
      },
   },
   tap: {
      scale: 0.95,
   },
};

// Image hover with zoom
export const imageHoverVariants = {
   initial: { scale: 1 },
   hover: {
      scale: 1.08,
      transition: {
         duration: 0.5,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Icon hover with rotation
export const iconHoverVariants = {
   initial: { scale: 1, rotate: 0 },
   hover: {
      scale: 1.2,
      rotate: 8,
      transition: {
         duration: 0.3,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Link hover underline effect
export const linkHoverVariants = {
   initial: {
      backgroundSize: "0% 2px",
      backgroundPosition: "0% 100%",
   },
   hover: {
      backgroundSize: "100% 2px",
      transition: {
         duration: 0.3,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Feature card hover with glow
export const featureCardHoverVariants = {
   initial: {
      scale: 1,
      y: 0,
   },
   hover: {
      scale: 1.05,
      y: -8,
      transition: {
         duration: 0.35,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Social icon bounce hover
export const socialIconHoverVariants = {
   initial: { scale: 1, y: 0 },
   hover: {
      scale: 1.25,
      y: -5,
      transition: {
         type: "spring",
         stiffness: 400,
         damping: 10,
      },
   },
   tap: {
      scale: 0.9,
   },
};
