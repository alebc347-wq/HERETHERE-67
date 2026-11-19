import React, { useState, useEffect } from "react"
import { motion, useReducedMotion } from "framer-motion"
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
    if (brewingStage >= 3) {
      return
    }
    const timer = setTimeout(() => {
      const next = brewingStage + 1
      setBrewingStage(next)
      if (next >= 3) {
        setIsBrewing(false)
        if (!prefersReducedMotion) {
          try {
            confetti({
              particleCount: 40,
              spread: 60,
              origin: { y: 0.7 },
              colors: ["#b87a4c", "#e3a857", "#2c1d11"],
            })
          } catch {
            // Ignore canvas fallback errors
          }
        }
      }
    }, 1500)
    return () => clearTimeout(timer)
  }, [isBrewing, brewingStage, prefersReducedMotion])

  const handleStartBrewing = () => {
    setBrewingStage(1)
    setIsBrewing(true)
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

  return (
    <div className="p-6 pt-2 flex flex-col gap-6 max-h-[75vh] overflow-y-auto">
      {/* Animated Brewing Chamber */}
      <div className="relative rounded-xl bg-gradient-to-b from-secondary/50 via-secondary/20 to-background border border-border/70 px-6 py-7 flex flex-col items-center justify-center min-h-[240px] overflow-hidden">
        <div className="relative h-24 w-32 flex items-center justify-center">
          {/* Steam */}
          {!prefersReducedMotion && (
            <div className="absolute -top-3 flex gap-2" aria-hidden="true">
              <span className="w-1.5 h-6 bg-accent/40 rounded-full animate-steam" />
              <span className="w-1.5 h-8 bg-accent/30 rounded-full animate-steam [animation-delay:0.7s]" />
              <span className="w-1.5 h-5 bg-accent/40 rounded-full animate-steam [animation-delay:1.4s]" />
            </div>
          )}

          {/* Dripper / Filter graphic */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-16 h-10 border-t-[20px] border-t-accent/80 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent relative drop-shadow-sm">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] text-white font-mono font-bold">
                V60
              </div>
            </div>

            <div className="h-6 flex items-center justify-center">
              {brewingStage > 0 && brewingStage < 3 && (
                <motion.div
                  animate={prefersReducedMotion ? { y: 8 } : { y: [0, 16], opacity: [1, 0] }}
                  transition={{ duration: 0.65, repeat: Infinity, ease: "easeIn" }}
                  className="size-2 rounded-full bg-accent-ink"
                  aria-hidden="true"
                />
              )}
              {brewingStage === 3 && (
                <span className="text-xs text-emerald-700 dark:text-emerald-400 font-bold font-chinese">
                  ✦ 滴濾完成 ✦
                </span>
              )}
            </div>

            <div className="w-20 h-12 border-2 border-border/80 rounded-b-xl relative bg-secondary/30 overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-accent/80"
                initial={{ height: "10%" }}
                animate={{
                  height:
                    brewingStage === 0
                      ? "10%"
                      : brewingStage === 1
                      ? "35%"
                      : brewingStage === 2
                      ? "70%"
                      : "90%",
                }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </div>
        </div>

        {/* Stage Progress Pills */}
        <div className="w-full max-w-md pt-5 flex items-center justify-between text-xs font-chinese">
          {["準備", "悶蒸", "萃取", "享用"].map((label, idx) => (
            <div
              key={label}
              className={`flex items-center gap-1.5 transition-colors ${
                brewingStage >= idx
                  ? "text-accent-ink font-semibold"
                  : "text-muted-foreground"
              }`}
            >
              <span
                className={`size-5 rounded-full flex items-center justify-center text-[10px] transition-colors tabular-nums ${
                  brewingStage >= idx
                    ? "bg-accent-ink text-white shadow-xs"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {brewingStage > idx ? "✓" : idx + 1}
              </span>
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Stage Description */}
        <div className="mt-4 text-center" role="status" aria-live="polite">
          <p className="text-sm font-semibold font-heading text-foreground">
            {STAGE_DESCRIPTIONS[brewingStage].title}
          </p>
          <p className="text-xs text-muted-foreground font-chinese max-w-sm mt-0.5">
            {STAGE_DESCRIPTIONS[brewingStage].desc}
          </p>
        </div>

        <div className="mt-3">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleStartBrewing}
            disabled={isBrewing}
            className="h-10 text-xs font-chinese gap-1.5 hover:border-accent-ink hover:text-accent-ink"
          >
            {brewingStage === 3 ? (
              <>
                <RotateCcw className="size-3.5" aria-hidden="true" />
                <span>再次模擬沖煮</span>
              </>
            ) : isBrewing ? (
              <>
                <Droplets className="size-3.5 animate-spin text-accent-ink" aria-hidden="true" />
                <span>注水中...</span>
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

      {/* Flavor Notes */}
      {product.flavor_notes && product.flavor_notes.length > 0 && (
        <div className="flex flex-col gap-2">
          <span className="text-xs font-body uppercase tracking-wider text-muted-foreground">
            Flavor Profile 風味輪廓
          </span>
          <div className="flex flex-wrap gap-2">
            {product.flavor_notes.map((note) => (
              <Badge
                key={note}
                variant="secondary"
                className="px-3 py-1 bg-secondary/80 text-foreground font-chinese text-xs border border-border/50"
              >
                ✦ {note}
              </Badge>
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
