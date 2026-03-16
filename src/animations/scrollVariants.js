/**
 * Advanced Scroll Reveal Variants
 * Multi-stage motion with opacity, translate, scale, and blur
 */

// Primary scroll reveal - used for sections and major elements
export const scrollRevealVariants = {
   hidden: {
      opacity: 0,
      y: 60,
      scale: 0.95,
      filter: "blur(8px)",
   },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
         duration: 0.9,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// 3D depth reveal for cards and content blocks
export const depthRevealVariants = {
   hidden: {
      opacity: 0,
      y: 50,
      scale: 0.96,
      rotateX: 6,
   },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
         duration: 0.8,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Image reveal with scale and blur
export const imageRevealVariants = {
   hidden: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(12px)",
   },
   visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
         duration: 1.2,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Heading reveal with blur effect
export const headingRevealVariants = {
   hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(6px)",
   },
   visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
         duration: 0.8,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Text/paragraph reveal
export const textRevealVariants = {
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
         duration: 0.7,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Button reveal with scale
export const buttonRevealVariants = {
   hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
   },
   visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
         duration: 0.6,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Slide from left
export const slideFromLeftVariants = {
   hidden: {
      opacity: 0,
      x: -60,
      filter: "blur(6px)",
   },
   visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
         duration: 0.8,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Slide from right
export const slideFromRightVariants = {
   hidden: {
      opacity: 0,
      x: 60,
      filter: "blur(6px)",
   },
   visible: {
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
         duration: 0.8,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};

// Scale up reveal
export const scaleUpRevealVariants = {
   hidden: {
      opacity: 0,
      scale: 0.8,
      filter: "blur(10px)",
   },
   visible: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
         duration: 0.9,
         ease: [0.22, 1, 0.36, 1],
      },
   },
};
