import React, { useState } from "react"
import { Link } from "react-router-dom"
import { motion, useReducedMotion } from "framer-motion"
import { ChevronDown, Coffee, Pause, Play } from "lucide-react"
import { useCoffee } from "@/context/CoffeeContext"
import { PREMIUM_EASE } from "@/lib/motion"

export const HeroSection = () => {
  const { brandSettings } = useCoffee()
  const prefersReducedMotion = useReducedMotion()
  const [motionPaused, setMotionPaused] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const titleText = brandSettings.brandName || "HERETHERE COFFEE"

  const shouldAnimateAmbient = !prefersReducedMotion && !motionPaused

  const scrollToStory = () => {
    const el = document.getElementById("story")
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
    }
  }

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 pb-16">
      {/* Background with 12s breathing zoom animation (paused if reduced-motion or toggled) */}
      <div className="absolute inset-0 overflow-hidden bg-[hsl(15_30%_8%)]">
        <motion.div
          animate={shouldAnimateAmbient ? { scale: [1, 1.08, 1] } : { scale: 1 }}
          transition={
            shouldAnimateAmbient
              ? {
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
              : { duration: 0.3 }
          }
          className="size-full origin-center"
        >
          <img
            src={brandSettings.heroBgUrl}
            alt="HERETHERE COFFEE 精品咖啡手沖與烘焙氛圍"
            width={1920}
            height={1080}
            fetchpriority="high"
            className="size-full object-cover object-center brightness-[0.88]"
          />
        </motion.div>
      </div>

      {/* Layered Gradient Overlay: black/55 -> black/35 -> black/75 */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/75 pointer-events-none"
        aria-hidden="true"
      />

      {/* Ambient motion pause/resume control for accessibility (WCAG 2.2.2 / antislop R-39) */}
      {!prefersReducedMotion && (
        <button
          type="button"
          onClick={() => setMotionPaused((prev) => !prev)}
          aria-label={motionPaused ? "恢復背景動態" : "暫停背景動態"}
          aria-pressed={motionPaused}
          className="absolute bottom-6 right-6 z-20 size-10 rounded-full bg-black/45 hover:bg-black/65 border border-white/25 text-white/85 hover:text-white flex items-center justify-center transition-colors backdrop-blur-sm"
          title={motionPaused ? "恢復背景動態" : "暫停背景動態"}
        >
          {motionPaused ? (
            <Play className="size-4" aria-hidden="true" />
          ) : (
            <Pause className="size-4" aria-hidden="true" />
          )}
        </button>
      )}

      {/* Center Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Circular Logo with white border & fade/scale in */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: PREMIUM_EASE }}
          className="size-20 md:size-24 rounded-full border-2 border-white/85 p-0.5 shadow-2xl backdrop-blur-sm mb-6 overflow-hidden bg-black/30 flex items-center justify-center"
        >
          {brandSettings.logoUrl && !logoFailed ? (
            <img
              src={brandSettings.logoUrl}
              alt={brandSettings.brandName}
              width={96}
              height={96}
              onError={() => setLogoFailed(true)}
              className="size-full object-cover rounded-full"
            />
          ) : (
            <Coffee className="size-8 text-white/90" aria-hidden="true" />
          )}
        </motion.div>

        {/* Title: HERETHERE COFFEE in Cormorant Garamond with letter blur & translateY */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-white tracking-wider flex flex-wrap justify-center items-center gap-x-3 gap-y-1 mb-4">
          {titleText.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="inline-flex overflow-hidden">
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={`${wordIndex}-${charIndex}`}
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: 24, filter: "blur(6px)" }
                  }
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + (wordIndex * 5 + charIndex) * 0.035,
                    ease: PREMIUM_EASE,
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {/* English Subtitle */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: PREMIUM_EASE }}
          className="text-xs sm:text-sm md:text-base font-body uppercase tracking-[0.35em] text-white/95 mb-6 font-light"
        >
          WHEREVER YOU ARE, FIND YOUR CUP.
        </motion.p>

        {/* Divider: two white line segments sandwiching a ✦ */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.9, ease: PREMIUM_EASE }}
          className="flex items-center justify-center gap-4 w-48 sm:w-64 mb-6"
          aria-hidden="true"
        >
          <span className="h-[1px] flex-1 bg-white/45" />
          <span className="text-white/85 text-xs sm:text-sm select-none">✦</span>
          <span className="h-[1px] flex-1 bg-white/45" />
        </motion.div>

        {/* Chinese Subtitle: Noto Serif TC 細體 */}
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.05, ease: PREMIUM_EASE }}
          className="font-chinese font-light text-base sm:text-lg md:text-xl text-white max-w-xl mb-10 tracking-widest leading-relaxed"
        >
          無論你在哪裡，都能找到屬於自己的那杯咖啡。
        </motion.p>

        {/* Two Rounded Buttons */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: PREMIUM_EASE }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
        >
          <Link
            to="/shop"
            className="min-w-[176px] min-h-[44px] inline-flex items-center justify-center px-8 py-3 rounded-full bg-white text-black font-chinese font-medium text-sm tracking-wider shadow-lg hover:bg-white/90 active:scale-[0.98] transition-colors duration-200"
          >
            探索商品
          </Link>

          <button
            type="button"
            onClick={scrollToStory}
            className="min-w-[176px] min-h-[44px] inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/80 text-white font-chinese font-normal text-sm tracking-wider bg-black/25 backdrop-blur-sm hover:bg-white/15 hover:border-white active:scale-[0.98] transition-colors duration-200"
          >
            閱讀故事
          </button>
        </motion.div>
      </div>

      {/* Bottom Floating Downward Arrow */}
      <motion.button
        type="button"
        onClick={scrollToStory}
        animate={shouldAnimateAmbient ? { y: [0, 8, 0] } : { y: 0 }}
        transition={
          shouldAnimateAmbient
            ? {
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }
            : { duration: 0.2 }
        }
        aria-label="向下捲動至品牌故事"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 size-11 flex items-center justify-center text-white/85 hover:text-white rounded-full transition-colors"
      >
        <ChevronDown className="size-7" aria-hidden="true" />
      </motion.button>
    </section>
  )
}
