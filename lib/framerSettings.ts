// centralised settings for animations - while still allowing flexibility in motion.type e.g. motion.div, motion.ul
import {  Variants } from "framer-motion";

const  animation = { 
  inViewAmount: 0.2,
  initialState: "offscreen",
}

export const defaultAnimations: Variants = {
  offscreen: {
    opacity: 0
  },
  onscreen: {
    opacity: 1,
    transition: {
      staggerChildren: .35
    }
  }
};


// shared settings for both up and down - same end state
const onscreenSlide = {
  y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.45,
      delay: 0.45
    }
}

export const animateUp: Variants = {
  offscreen: {
    y:'100%' ,
    opacity: 0
  },
  onscreen: {...onscreenSlide}
};

export const animateDown: Variants = {
  offscreen: {
    y:'-100%' ,
    opacity: 0
  },
  onscreen: {...onscreenSlide}
  
};


export const wrapperAnimationSettings = {
  initial:animation.initialState,
  whileInView:"onscreen",
  variants:defaultAnimations,
  viewport:{ once: true, amount: animation.inViewAmount }
}


// navigation menu //

export const navMenuItem = {
  offscreen: { opacity: 0, y: '-100%' },
  onscreen: { opacity: 1, y: 0 }
}


export const navMenuVariants = {
  open: { opacity: 1, x: 0,
    transition: {
      bounce: 0,
      duration: 0.25,
    } },
  closed: { opacity: 0, x: "100%" },
}


export const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2
    }
  },
  end: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const loadingCircleVariants = {
  start: {
    y: "50%"
  },
  end: {
    y: "150%"
  }
};

export const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  ease: "easeInOut"
};