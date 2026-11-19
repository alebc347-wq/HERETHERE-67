import React, { useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { Copy, Check, MessageCircle } from "lucide-react"
import { useCoffee } from "@/context/CoffeeContext"
import { Button } from "@/components/ui/button"
import { MagneticWrapper } from "@/components/motion/CoffeeMotion"
import { PREMIUM_EASE } from "@/lib/motion"

export const LineSection = () => {
  const { brandSettings } = useCoffee()
  const [copied, setCopied] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const copyKeyword = () => {
    navigator.clipboard.writeText("HERETHERE")
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2200)
  }

  return (
    <section className="py-20 md:py-24 bg-[hsl(15_30%_9%)] border-t border-[hsl(15_25%_18%)] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: PREMIUM_EASE }}
          className="flex flex-col items-center gap-4"
        >
          <span className="font-body text-xs uppercase tracking-[0.35em] text-emerald-400 font-semibold">
            JOIN US
          </span>

          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-white">
            加入 HERETHERE
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2, ease: PREMIUM_EASE }}
            className="h-0.5 w-12 bg-emerald-500/70 my-1 origin-center"
            aria-hidden="true"
          />

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative bg-[hsl(15_25%_13%)] border border-[hsl(15_25%_22%)] rounded-xl p-6 my-3 max-w-lg shadow-sm"
          >
            <div className="flex items-center justify-center gap-2 text-emerald-400 mb-2">
              <motion.span
                animate={prefersReducedMotion ? undefined : { rotate: [0, -8, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex"
              >
                <MessageCircle className="size-5" aria-hidden="true" />
              </motion.span>
              <span className="text-sm font-semibold tracking-wider">LINE 官方好友指南</span>
            </div>
            <p className="font-chinese text-sm md:text-base text-[hsl(30_15%_85%)] leading-relaxed">
              {brandSettings.lineInstructions}
            </p>
          </motion.div>

          <MagneticWrapper strength={0.18}>
            <Button
              type="button"
              onClick={copyKeyword}
              className={`h-12 px-7 rounded-full font-chinese text-sm tracking-wider shadow-md transition-colors duration-200 flex items-center gap-2.5 ${
                copied
                  ? "bg-emerald-700 hover:bg-emerald-700 text-white font-medium"
                  : "bg-emerald-500 hover:bg-emerald-400 text-[hsl(15_30%_8%)] font-semibold"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Check className="size-4" aria-hidden="true" />
                    <span>已複製！</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex items-center gap-2"
                  >
                    <Copy className="size-4" aria-hidden="true" />
                    <span>複製搜尋關鍵字：HERETHERE</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </MagneticWrapper>

          <p className="text-xs text-[hsl(30_15%_74%)] pt-2 font-chinese">
            加入官方 LINE 享專屬好友折扣碼、限量豆款到貨優先通知
          </p>
        </motion.div>
      </div>
    </section>
  )
}
