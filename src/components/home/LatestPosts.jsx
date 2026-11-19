import React from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowRight, Calendar, Coffee } from "lucide-react"
import moment from "moment"
import { useCoffee } from "@/context/CoffeeContext"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { SpotlightTiltCard } from "@/components/motion/CoffeeMotion"
import { PREMIUM_EASE } from "@/lib/motion"

export const LatestPosts = () => {
  const { blogPosts } = useCoffee()

  const publishedPosts = blogPosts
    .filter((post) => post.is_published)
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
    .slice(0, 3)

  if (publishedPosts.length === 0) {
    return null
  }

  return (
    <section className="py-20 md:py-24 bg-card/70 border-y border-border/50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
            className="flex flex-col gap-2"
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-accent-ink font-semibold">
              LATEST STORIES
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              最新文章
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
          >
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-sm font-chinese text-accent-ink hover:text-foreground font-medium transition-colors py-2"
            >
              <span>查看全部</span>
              <motion.span
                className="inline-flex"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {publishedPosts.map((post, index) => {
            const formattedDate = moment(post.created_at).format("YYYY.MM.DD")

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: PREMIUM_EASE,
                }}
              >
                <SpotlightTiltCard className="h-full rounded-lg">
                  <Link to={`/blog/${post.id}`} className="group block h-full rounded-lg">
                    <Card className="h-full overflow-hidden border-border/70 hover:border-accent-ink/60 hover:shadow-lg transition-all duration-300 bg-background flex flex-col">
                      <div className="aspect-[16/10] overflow-hidden bg-secondary relative">
                        {post.cover_image ? (
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            width={800}
                            height={500}
                            className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : (
                          <div className="size-full flex items-center justify-center text-muted-foreground/60">
                            <Coffee className="size-10" aria-hidden="true" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <Badge
                            variant="subtle"
                            className="font-chinese text-xs bg-background/95 text-foreground"
                          >
                            {post.category}
                          </Badge>
                        </div>
                      </div>

                      <CardContent className="p-6 flex flex-col flex-1 justify-between gap-4">
                        <div className="flex flex-col gap-2.5">
                          <h3 className="font-heading text-lg font-semibold text-foreground group-hover:text-accent-ink transition-colors line-clamp-2 leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-sm text-foreground/75 font-chinese line-clamp-2 leading-relaxed">
                            {post.summary}
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground pt-2 border-t border-border/50 font-body tabular-nums">
                          <Calendar className="size-3.5 text-accent-ink" aria-hidden="true" />
                          <span>{formattedDate}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </SpotlightTiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
