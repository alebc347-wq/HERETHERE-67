import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, Sparkles, Coffee } from "lucide-react"
import { useCoffee } from "@/context/CoffeeContext"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { BrewingModal } from "@/components/shop/BrewingModal"
import { SpotlightTiltCard } from "@/components/motion/CoffeeMotion"
import { pageTransition, PREMIUM_EASE } from "@/lib/motion"

const CATEGORIES = ["全部", "咖啡豆", "濾掛包", "器具"]

export const Shop = () => {
  const { products } = useCoffee()
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [activeModalProduct, setActiveModalProduct] = useState(null)

  const filteredProducts = products.filter((product) => {
    if (selectedCategory === "全部") return true
    return product.category === selectedCategory
  })

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="pt-28 pb-24 min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-accent-ink font-semibold">
              OUR SELECTIONS
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              精選商品
            </h1>
            <p className="font-chinese text-sm sm:text-base text-foreground/80 max-w-xl mt-1 leading-relaxed">
              從產地到杯中，每一款商品都承載著我們對品質的堅持。
            </p>
          </motion.div>

          {/* Sliding Category Filter Pills */}
          <div
            role="group"
            aria-label="商品分類篩選"
            className="flex flex-wrap items-center justify-center gap-2 mt-8"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={isSelected}
                  className={`relative min-h-[44px] px-5 py-2 rounded-full text-sm font-chinese transition-colors duration-200 ${
                    isSelected
                      ? "text-white font-medium"
                      : "bg-secondary/70 hover:bg-secondary text-foreground/85 hover:text-foreground"
                  }`}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="shop-category-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="absolute inset-0 rounded-full bg-accent-ink shadow-sm"
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="sync">
            {filteredProducts.map((product, index) => {
              const strippedDesc = product.description
                ? product.description.replace(/<[^>]*>?/gm, "").slice(0, 52) + "..."
                : ""

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{
                    duration: 0.35,
                    delay: Math.min(index * 0.04, 0.24),
                    ease: PREMIUM_EASE,
                  }}
                  className="h-full"
                >
                  <SpotlightTiltCard className="h-full rounded-xl" maxTilt={3.5}>
                    <Card className="group relative h-full flex flex-col justify-between overflow-hidden rounded-xl border border-border/80 hover:border-accent-ink/70 bg-card hover:shadow-lg transition-all duration-300">
                      {/* 3:4 Aspect Ratio Image Area */}
                      <div className="relative aspect-[3/4] overflow-hidden bg-secondary">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            width={600}
                            height={800}
                            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="size-full flex flex-col items-center justify-center text-muted-foreground/60 bg-secondary/60">
                            <ShoppingBag className="size-12" aria-hidden="true" />
                            <span className="text-xs font-chinese mt-2">典雅精品</span>
                          </div>
                        )}

                        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
                          <Badge
                            variant="subtle"
                            className="font-chinese text-xs bg-background/95 text-foreground font-medium"
                          >
                            {product.category}
                          </Badge>
                          {!product.is_available && (
                            <Badge variant="destructive" className="font-chinese text-xs">
                              補貨中
                            </Badge>
                          )}
                        </div>

                        <div
                          className="absolute inset-0 bg-black/45 backdrop-blur-sm opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-250 flex items-center justify-center z-20 pointer-events-none"
                          aria-hidden="true"
                        >
                          <span className="px-5 py-2.5 rounded-full bg-white text-black font-chinese font-semibold text-xs tracking-wider shadow-md flex items-center gap-1.5 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            <Sparkles className="size-3.5 text-accent-ink" />
                            <span>探索風味</span>
                          </span>
                        </div>
                      </div>

                      {/* Product Details */}
                      <CardContent className="p-5 flex flex-col flex-1 justify-between gap-3">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-[11px] font-body text-accent-ink tracking-wider uppercase font-medium">
                            {product.origin || product.roast_level || "Specialty Choice"}
                          </span>
                          <h2 className="font-heading text-lg font-semibold text-foreground group-hover:text-accent-ink transition-colors line-clamp-1">
                            <button
                              type="button"
                              onClick={() => setActiveModalProduct(product)}
                              className="text-left focus:outline-none after:absolute after:inset-0 after:z-10"
                            >
                              {product.name}
                            </button>
                          </h2>
                          <p className="text-xs text-foreground/75 font-chinese line-clamp-2 leading-relaxed">
                            {strippedDesc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <div className="flex items-baseline gap-1 tabular-nums">
                            <span className="text-xs text-muted-foreground font-body">NT$</span>
                            <span className="font-display text-xl font-bold text-foreground">
                              {product.price?.toLocaleString()}
                            </span>
                          </div>

                          <span
                            className="text-xs text-accent-ink font-chinese font-medium group-hover:translate-x-0.5 transition-transform"
                            aria-hidden="true"
                          >
                            沖煮參數 →
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </SpotlightTiltCard>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <Coffee className="size-12 text-muted-foreground/50" aria-hidden="true" />
            <p className="font-chinese text-base text-muted-foreground">
              目前該分類下暫無商品，請選擇其他分類探索。
            </p>
          </div>
        )}
      </div>

      <BrewingModal
        product={activeModalProduct}
        isOpen={!!activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />
    </motion.div>
  )
}
