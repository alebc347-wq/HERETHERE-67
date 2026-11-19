// Cinematic coffee motion primitives & variants

export const PREMIUM_EASE = [0.22, 1, 0.36, 1]
export const ENTRANCE_EASE = [0.05, 0.7, 0.1, 1]
export const EXIT_EASE = [0.3, 0, 1, 1]

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.55, ease: PREMIUM_EASE },
  },
}

export const fadeInUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: PREMIUM_EASE },
  },
}

export const fadeInScale = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: PREMIUM_EASE },
  },
}

export const clipRevealUp = {
  hidden: {
    opacity: 0,
    clipPath: "inset(14% 0% 14% 0% round 8px)",
    scale: 1.08,
  },
  visible: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0% round 8px)",
    scale: 1,
    transition: { duration: 0.85, ease: PREMIUM_EASE },
  },
}

export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0.08) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
})

export const letterFadeIn = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: PREMIUM_EASE },
  },
}

export const pageTransition = {
  initial: { opacity: 0, y: 16, filter: "blur(4px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.42, ease: PREMIUM_EASE },
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: "blur(3px)",
    transition: { duration: 0.24, ease: EXIT_EASE },
  },
}

export const shakeAnimation = {
  x: [0, -10, 10, -8, 8, -4, 4, 0],
  transition: { duration: 0.45, ease: "easeInOut" },
}
