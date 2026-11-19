import React, { useRef } from "react"
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion"
import { cn } from "@/lib/utils"

// Top reading/scroll progress line synced via GPU transform
export const ScrollProgressRoastLine = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  })
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accent-ink via-accent to-amber-300 origin-left z-50 pointer-events-none"
    />
  )
}

// 3D perspective tilt + cursor-tracking warm spotlight card (0 React re-renders on move)
export const SpotlightTiltCard = ({ children, className, maxTilt = 4 }) => {
  const cardRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 220, damping: 24 })
  const spotlightOpacity = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 })

  const spotlightBg = useMotionTemplate`radial-gradient(360px circle at ${mouseX}px ${mouseY}px, hsla(28, 45%, 55%, 0.14), transparent 75%)`

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)
    spotlightOpacity.set(1)

    const pctX = (x / rect.width - 0.5) * 2
    const pctY = (y / rect.height - 0.5) * 2
    rotateY.set(pctX * maxTilt)
    rotateX.set(-pctY * maxTilt)
  }

  const handleMouseLeave = () => {
    spotlightOpacity.set(0)
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={
        prefersReducedMotion
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }
      }
      className={cn("relative", className)}
    >
      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          style={{ background: spotlightBg, opacity: spotlightOpacity }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-20 transition-opacity"
        />
      )}
      {children}
    </motion.div>
  )
}

// Magnetic tactile pull wrapper for hero/primary buttons
export const MagneticWrapper = ({ children, strength = 0.22, className }) => {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const x = useSpring(0, { stiffness: 260, damping: 18 })
  const y = useSpring(0, { stiffness: 260, damping: 18 })

  const handleMove = (e) => {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
    x.set(Math.max(-8, Math.min(8, dx)))
    y.set(Math.max(-8, Math.min(8, dy)))
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={prefersReducedMotion ? undefined : { x, y }}
      className={cn("inline-block", className)}
    >
      {children}
    </motion.div>
  )
}

const DEFAULT_PARTICLES = [
  { left: "12%", size: 4, delay: 0, duration: 7.5, drift: 18 },
  { left: "24%", size: 6, delay: 1.4, duration: 9.2, drift: -22 },
  { left: "38%", size: 3, delay: 0.7, duration: 6.8, drift: 14 },
  { left: "54%", size: 5, delay: 2.3, duration: 8.5, drift: -16 },
  { left: "68%", size: 4, delay: 1.1, duration: 7.9, drift: 24 },
  { left: "81%", size: 6, delay: 3.0, duration: 9.8, drift: -20 },
  { left: "90%", size: 3, delay: 0.4, duration: 7.2, drift: 12 },
  { left: "47%", size: 4, delay: 3.6, duration: 8.8, drift: 15 },
]

// Floating coffee aroma motes using GPU-only transform & opacity
export const CoffeeSteamParticles = ({ active = true, className, tint = "bg-amber-200/40" }) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion || !active) return null

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      {DEFAULT_PARTICLES.map((p, idx) => (
        <motion.span
          key={idx}
          style={{ left: p.left, width: p.size, height: p.size }}
          initial={{ y: "105%", x: 0, opacity: 0, scale: 0.6 }}
          animate={{
            y: ["105%", "-15%"],
            x: [0, p.drift, -p.drift * 0.6, p.drift * 0.4],
            opacity: [0, 0.75, 0.45, 0],
            scale: [0.6, 1.15, 0.85],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn("absolute bottom-0 rounded-full blur-[0.5px]", tint)}
        />
      ))}
    </div>
  )
}

// Live flipping digit unit for countdowns
export const AnimatedCountdownDigit = ({ value, className }) => {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <span className={className}>{value}</span>
  }

  return (
    <span className={cn("relative inline-flex overflow-hidden justify-center", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: -16, opacity: 0, filter: "blur(3px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: 16, opacity: 0, filter: "blur(3px)" }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
