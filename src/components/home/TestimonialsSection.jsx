import React from "react"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { useCoffee } from "@/context/CoffeeContext"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { PREMIUM_EASE } from "@/lib/motion"

export const TestimonialsSection = () => {
  const { testimonials } = useCoffee()

  const visibleTestimonials = testimonials
    .filter((t) => t.is_visible)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
    .slice(0, 3)

  if (visibleTestimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-24 bg-secondary/40 border-b border-border/50 relative">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: PREMIUM_EASE }}
            className="flex flex-col gap-2 items-center"
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-accent-ink font-semibold">
              COMMUNITY VOICES
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              來自咖啡愛好者的心聲
            </h2>
            <div className="h-0.5 w-12 bg-accent mt-2" aria-hidden="true" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {visibleTestimonials.map((item, index) => {
            const initials = item.name ? item.name.slice(0, 1) : "客"
            const ratingValue = Math.min(5, Math.max(1, Number(item.rating) || 5))

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: PREMIUM_EASE,
                }}
              >
                <Card className="h-full rounded-xl border border-border/80 bg-card p-7 shadow-sm flex flex-col justify-between">
                  <CardContent className="p-0 flex flex-col gap-5">
                    <div
                      className="flex items-center gap-1"
                      aria-label={`評分 ${ratingValue} 顆星，滿分 5 顆星`}
                    >
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <Star
                          key={starIdx}
                          aria-hidden="true"
                          className={`size-4 ${
                            starIdx < ratingValue
                              ? "text-amber-600 fill-amber-500"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>

                    <p className="font-chinese text-foreground/85 text-sm md:text-base italic leading-relaxed">
                      「{item.content}」
                    </p>
                  </CardContent>

                  <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-border/50">
                    <Avatar className="size-11 border border-accent/40 shadow-xs">
                      {item.avatar && (
                        <AvatarImage src={item.avatar} alt={item.name} />
                      )}
                      <AvatarFallback className="bg-secondary text-accent-ink font-semibold text-sm">
                        {initials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                      <span className="font-heading font-semibold text-sm text-foreground">
                        {item.name}
                      </span>
                      <span className="text-xs text-muted-foreground font-chinese">
                        購買：{item.product}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
