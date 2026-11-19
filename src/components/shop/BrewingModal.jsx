import React, { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Thermometer,
  Scale,
  Clock,
  Sparkles,
  ShoppingBag,
  Check,
  Flame,
  Droplets,
  RotateCcw,
} from "lucide-react"
import confetti from "canvas-confetti"
import { sanitizeHtml } from "@/lib/security"
import { PREMIUM_EASE } from "@/lib/motion"

const STAGE_DESCRIPTIONS = [
  { title: "研磨就緒", desc: "新鮮研磨釋放出迷人乾香氣，粉層均勻平整" },
  { title: "悶蒸膨脹 (Bloom)", desc: "注入 35ml 沸水，咖啡粉膨脹如蘑菇帽，釋放芳香氣體" },
  { title: "黃金萃取 (Extraction)", desc: "平穩細水流由內而外畫圓，溶出層次豐富的水果酸甜" },
  { title: "萃取完成 (Ready to Savor)", desc: "輕輕搖晃分享壺，一杯極致乾淨純粹的精品咖啡完成" },
]

function BrewingModalBody({ product }) {
  const prefersReducedMotion = useReducedMotion()
  const [brewingStage, setBrewingStage] = useState(0)
  const [isBrewing, setIsBrewing] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [addedSuccess, setAddedSuccess] = useState(false)

  useEffect(() => {
    if (!isBrewing) return
    if (brewingStage >= 3) return

    const timer = setTimeout(() => {
      const next = brewingStage + 1
      setBrewingStage(next)
      if (next >= 3) {
        setIsBrewing(false)
        if (!prefersReducedMotion) {
          try {
            confetti({
              particleCount: 45,
              spread: 65,
              origin: { y: 0.7 },
              colors: ["#b87a4c", "#e3a857", "#2c1d11"],
            })
          } catch {
            // Ignore canvas fallback errors
          }
        }
      }
    }, 1600)
    return () => clearTimeout(timer)
  }, [isBrewing, brewingStage, prefersReducedMotion])

  const handleStartBrewing = () => {
    setBrewingStage(1)
    setIsBrewing(true)
  }

  const handleSelectStage = (idx) => {
    setIsBrewing(false)
    setBrewingStage(idx)
  }

  const handleAddToCart = () => {
    setAddedSuccess(true)
    if (!prefersReducedMotion) {
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#b87a4c", "#52b788", "#1a120e"],
        })
      } catch {
        // Ignore canvas fallback errors
      }
    }
    setTimeout(() => {
      setAddedSuccess(false)
    }, 2500)
  }

  const safeDescriptionHtml = sanitizeHtml(product.description)
  const isPouring = brewingStage === 1 || brewingStage === 2
  const fillPercent =
    brewingStage === 0 ? "8%" : brewingStage === 1 ? "34%" : brewingStage === 2 ? "72%" : "90%"

  return (
    <div className="p-6 pt-2 flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
      {/* Choreographed SVG Hand-Pour Brewing Chamber */}
      <div className="relative shrink-0 rounded-xl bg-gradient-to-b from-secondary/55 via-secondary/25 to-background border border-border/70 px-5 pt-8 pb-6 flex flex-col items-center overflow-x-hidden">
        <div className="relative h-44 w-60 pt-2 flex items-center justify-center">
          <svg
            viewBox="0 -10 220 175"
            className="size-full overflow-visible"
            aria-hidden="true"
          >
            {/* Aromatic Steam Wisps */}
            {!prefersReducedMotion && brewingStage >= 1 && (
              <g>
                <motion.path
                  d="M95,62 Q88,48 96,35 Q103,22 95,10"
                  fill="none"
                  stroke="hsl(28 45% 55% / 0.45)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  animate={{ y: [0, -8, -14], opacity: [0, 0.7, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.path
                  d="M112,58 Q119,44 111,30 Q105,18 113,6"
                  fill="none"
                  stroke="hsl(28 45% 55% / 0.35)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  animate={{ y: [0, -10, -16], opacity: [0, 0.65, 0] }}
                  transition={{
                    duration: 2.5,
                    delay: 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </g>
            )}

            {/* Gooseneck Kettle (slides & tilts in during Bloom / Extraction) */}
            <motion.g
              initial={false}
              animate={
                isPouring
                  ? { x: 0, y: 0, rotate: -14, opacity: 1 }
                  : { x: 24, y: -6, rotate: 0, opacity: 0.35 }
              }
              transition={{ duration: 0.55, ease: PREMIUM_EASE }}
              style={{ transformOrigin: "175px 38px" }}
            >
              {/* Kettle body */}
              <path
                d="M158,28 L194,28 L200,56 L154,56 Z"
                fill="hsl(15 30% 14%)"
                stroke="hsl(28 40% 55%)"
                strokeWidth="1.5"
              />
              {/* Kettle handle */}
              <path
                d="M196,32 C209,32 209,52 199,52"
                fill="none"
                stroke="hsl(15 30% 14%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Gooseneck spout */}
              <path
                d="M156,50 C142,50 138,34 128,34"
                fill="none"
                stroke="hsl(15 30% 14%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </motion.g>

            {/* Pouring Hot Water Stream */}
            {isPouring && (
              <motion.path
                d="M124,38 Q114,48 110,68"
                fill="none"
                stroke="hsl(28 50% 65%)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { strokeDashoffset: [0, -20] }
                }
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />
            )}

            {/* V60 Dripper Cone */}
            <path
              d="M78,66 L142,66 L118,98 L102,98 Z"
              fill="hsl(28 45% 42%)"
              stroke="hsl(15 30% 14%)"
              strokeWidth="1.5"
            />
            {/* Coffee Bed Bloom Dome */}
            <motion.path
              d="M84,66 Q110,56 136,66 Z"
              fill="hsl(20 35% 24%)"
              animate={{
                scaleY: brewingStage === 1 ? 1.45 : brewingStage === 2 ? 1.15 : 0.7,
              }}
              transition={{ duration: 0.6, ease: PREMIUM_EASE }}
              style={{ transformOrigin: "110px 66px" }}
            />
            {/* Dripper Base Collar */}
            <rect
              x="92"
              y="98"
              width="36"
              height="4"
              rx="2"
              fill="hsl(15 30% 14%)"
            />

            {/* Falling Coffee Droplet */}
            {isPouring && !prefersReducedMotion && (
              <motion.circle
                cx="110"
                cy="104"
                r="2.8"
                fill="hsl(26 55% 32%)"
                animate={{ cy: [104, 128], opacity: [1, 0.9, 0] }}
                transition={{ duration: 0.65, repeat: Infinity, ease: "easeIn" }}
              />
            )}

            {/* Glass Carafe Outline & Rising Liquid */}
            <defs>
              <clipPath id="carafe-clip">
                <path d="M84,104 L136,104 L144,148 Q145,156 136,156 L84,156 Q75,156 76,148 Z" />
              </clipPath>
            </defs>

            <g clipPath="url(#carafe-clip)">
              <rect
                x="70"
                y="104"
                width="80"
                height="54"
                fill="hsl(30 15% 88% / 0.45)"
              />
              <motion.rect
                x="70"
                width="80"
                height="56"
                fill="hsl(24 55% 32% / 0.85)"
                initial={false}
                animate={{
                  y:
                    brewingStage === 0
                      ? 150
                      : brewingStage === 1
                      ? 136
                      : brewingStage === 2
                      ? 118
                      : 110,
                }}
                transition={{ duration: 0.85, ease: PREMIUM_EASE }}
              />
            </g>

            {/* Carafe Border & Handle */}
            <path
              d="M84,104 L136,104 L144,148 Q145,156 136,156 L84,156 Q75,156 76,148 Z"
              fill="none"
              stroke="hsl(15 20% 40%)"
              strokeWidth="2"
            />
            <path
              d="M138,116 C152,116 154,142 142,142"
              fill="none"
              stroke="hsl(15 20% 40%)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Continuous Progress Bar */}
        <div className="w-full max-w-md h-1.5 rounded-full bg-secondary overflow-hidden mt-2 mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-accent-ink via-accent to-amber-500 rounded-full"
            initial={false}
            animate={{ width: fillPercent }}
            transition={{ duration: 0.6, ease: PREMIUM_EASE }}
          />
        </div>

        {/* Interactive Stage Progress Pills */}
        <div className="w-full max-w-md flex items-center justify-between text-xs font-chinese">
          {["準備", "悶蒸", "萃取", "享用"].map((label, idx) => (
            <button
              key={label}
              type="button"
              onClick={() => handleSelectStage(idx)}
              className={`flex items-center gap-1.5 transition-colors py-1 px-1.5 rounded-md hover:bg-secondary/60 ${
                brewingStage >= idx
                  ? "text-accent-ink font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <motion.span
                animate={brewingStage === idx ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
                className={`size-5 rounded-full flex items-center justify-center text-[10px] transition-colors tabular-nums ${
                  brewingStage >= idx
                    ? "bg-accent-ink text-white shadow-xs"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {brewingStage > idx ? "✓" : idx + 1}
              </motion.span>
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Stage Description with Smooth Transition */}
        <div className="mt-3 text-center min-h-[42px]" role="status" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={brewingStage}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
            >
              <p className="text-sm font-semibold font-heading text-foreground">
                {STAGE_DESCRIPTIONS[brewingStage].title}
              </p>
              <p className="text-xs text-muted-foreground font-chinese max-w-sm mt-0.5">
                {STAGE_DESCRIPTIONS[brewingStage].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleStartBrewing}
            disabled={isBrewing}
            className="h-10 px-4 text-xs font-chinese gap-1.5 hover:border-accent-ink hover:text-accent-ink"
          >
            {brewingStage === 3 ? (
              <>
                <RotateCcw className="size-3.5" aria-hidden="true" />
                <span>再次模擬沖煮</span>
              </>
            ) : isBrewing ? (
              <>
                <Droplets className="size-3.5 animate-spin text-accent-ink" aria-hidden="true" />
                <span>手沖注水中...</span>
              </>
            ) : (
              <>
                <Flame className="size-3.5 text-accent-ink" aria-hidden="true" />
                <span>開始模擬沖煮</span>
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Flavor Notes with Stagger */}
      {product.flavor_notes && product.flavor_notes.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-body uppercase tracking-wider text-muted-foreground">
            Flavor Profile 風味輪廓
          </span>
          <div className="flex flex-wrap gap-2">
            {product.flavor_notes.map((note, idx) => (
              <motion.div
                key={note}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * idx, duration: 0.25 }}
              >
                <Badge
                  variant="secondary"
                  className="px-3 py-1 bg-secondary/80 text-foreground font-chinese text-xs border border-border/50"
                >
                  ✦ {note}
                </Badge>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Brewing Guide Recommendations */}
      <div className="rounded-lg bg-card border border-border p-4 flex flex-col gap-3">
        <span className="text-xs font-body uppercase tracking-wider text-accent-ink font-semibold flex items-center gap-1.5">
          <Sparkles className="size-3.5" aria-hidden="true" />
          <span>Recommended Recipe 推薦沖煮參數</span>
        </span>

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="p-2.5 rounded-md bg-background border border-border/60">
            <Thermometer className="size-4 text-accent-ink mx-auto mb-1" aria-hidden="true" />
            <span className="text-[11px] text-muted-foreground font-chinese">水溫</span>
            <p className="font-heading text-sm font-semibold text-foreground tabular-nums">92°C</p>
          </div>
          <div className="p-2.5 rounded-md bg-background border border-border/60">
            <Scale className="size-4 text-accent-ink mx-auto mb-1" aria-hidden="true" />
            <span className="text-[11px] text-muted-foreground font-chinese">粉水比</span>
            <p className="font-heading text-sm font-semibold text-foreground tabular-nums">
              1 : 15
            </p>
          </div>
          <div className="p-2.5 rounded-md bg-background border border-border/60">
            <Clock className="size-4 text-accent-ink mx-auto mb-1" aria-hidden="true" />
            <span className="text-[11px] text-muted-foreground font-chinese">總萃取時間</span>
            <p className="font-heading text-sm font-semibold text-foreground tabular-nums">
              2m 15s
            </p>
          </div>
        </div>
      </div>

      {/* Product Description HTML (Sanitized with DOMPurify) */}
      <div
        className="text-xs sm:text-sm text-foreground/85 font-chinese leading-relaxed border-t border-border/40 pt-4 prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }}
      />

      <Separator />

      {/* Price & Action Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
        <div className="flex items-baseline gap-2 tabular-nums">
          <span className="text-xs text-muted-foreground font-body">NT$</span>
          <span className="font-display text-3xl font-bold text-accent-ink">
            {product.price.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center border border-border rounded-md bg-background">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              aria-label="減少數量"
              className="size-10 flex items-center justify-center text-sm text-foreground hover:bg-secondary transition-colors"
            >
              -
            </button>
            <span
              className="px-3 py-1 text-sm font-mono font-medium tabular-nums"
              aria-live="polite"
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              aria-label="增加數量"
              className="size-10 flex items-center justify-center text-sm text-foreground hover:bg-secondary transition-colors"
            >
              +
            </button>
          </div>

          <Button
            type="button"
            onClick={handleAddToCart}
            disabled={!product.is_available}
            className={`flex-1 sm:flex-initial h-10 px-6 font-chinese tracking-wider gap-2 shadow-sm ${
              addedSuccess
                ? "bg-emerald-700 hover:bg-emerald-700 text-white"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="size-4" aria-hidden="true" />
                <span>已加入購物清單！</span>
              </>
            ) : (
              <>
                <ShoppingBag className="size-4" aria-hidden="true" />
                <span>{product.is_available ? "預訂風味" : "暫時缺貨"}</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export const BrewingModal = ({ product, isOpen, onClose }) => {
  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden bg-background border-border">
        <DialogHeader className="p-6 pb-2 text-left">
          <div className="flex items-center gap-2">
            <Badge variant="accent" className="font-chinese text-xs text-accent-ink">
              {product.category}
            </Badge>
            {product.roast_level && (
              <span className="text-xs text-muted-foreground font-chinese">
                {product.roast_level}
              </span>
            )}
          </div>

          <DialogTitle className="font-heading text-2xl sm:text-3xl text-foreground font-semibold pt-1">
            {product.name}
          </DialogTitle>

          <DialogDescription className="text-muted-foreground text-xs sm:text-sm font-chinese pt-0.5">
            {product.origin ? `產地風土：${product.origin}` : "HERETHERE 嚴選精品咖啡體驗"}
          </DialogDescription>
        </DialogHeader>

        <BrewingModalBody key={product.id} product={product} />
      </DialogContent>
    </Dialog>
  )
}
