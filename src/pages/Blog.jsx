import React, { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar, Search, ArrowRight, BookOpen, Coffee } from "lucide-react"
import moment from "moment"
import { useCoffee } from "@/context/CoffeeContext"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { pageTransition, PREMIUM_EASE } from "@/lib/motion"

const BLOG_CATEGORIES = ["全部", "品牌公告", "手沖知識", "咖啡豆介紹"]

export const Blog = () => {
  const { blogPosts } = useCoffee()
  const [selectedCategory, setSelectedCategory] = useState("全部")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPosts = blogPosts
    .filter((post) => post.is_published)
    .filter((post) => {
      if (selectedCategory !== "全部" && post.category !== selectedCategory) {
        return false
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = post.title?.toLowerCase().includes(q)
        const matchSummary = post.summary?.toLowerCase().includes(q)
        return matchTitle || matchSummary
      }
      return true
    })
    .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="pt-28 pb-24 min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
            className="flex flex-col items-center gap-2"
          >
            <span className="font-body text-xs uppercase tracking-[0.3em] text-accent-ink font-semibold">
              COFFEE JOURNAL & STORIES
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              咖啡誌 ｜ 部落格
            </h1>
            <p className="font-chinese text-sm sm:text-base text-foreground/80 max-w-xl mt-1 leading-relaxed">
              記錄每一批微風土的故事、咖啡師的手沖筆記，以及生活裡的咖啡片刻。
            </p>
          </motion.div>

          {/* Search Bar & Category Filters */}
          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
            <div
              role="group"
              aria-label="文章分類篩選"
              className="flex flex-wrap items-center justify-center gap-2"
            >
              {BLOG_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={isSelected}
                    className={`min-h-[44px] px-4 py-1.5 rounded-full text-xs sm:text-sm font-chinese transition-colors duration-200 ${
                      isSelected
                        ? "bg-accent-ink text-white font-medium shadow-sm"
                        : "bg-secondary/75 hover:bg-secondary text-foreground/85 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>

            <div className="relative w-full md:w-72">
              <label htmlFor="blog-search" className="sr-only">
                搜尋文章或風味
              </label>
              <Search
                className="size-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <Input
                id="blog-search"
                type="search"
                placeholder="搜尋文章或風味..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-11 bg-secondary/40 border-border/80 text-sm font-chinese rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Blog Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="sync">
            {filteredPosts.map((post, index) => {
              const formattedDate = moment(post.created_at).format("YYYY.MM.DD")

              return (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{
                    duration: 0.3,
                    delay: Math.min(index * 0.04, 0.2),
                    ease: PREMIUM_EASE,
                  }}
                >
                  <Link to={`/blog/${post.id}`} className="group block h-full rounded-lg">
                    <Card className="h-full overflow-hidden border-border/80 hover:border-accent-ink/70 hover:shadow-lg transition-all duration-300 bg-card flex flex-col justify-between">
                      <div>
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
                              <BookOpen className="size-10" aria-hidden="true" />
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

                        <CardContent className="p-6 flex flex-col gap-3">
                          <h2 className="font-heading text-xl font-semibold text-foreground group-hover:text-accent-ink transition-colors leading-snug line-clamp-2">
                            {post.title}
                          </h2>
                          <p className="text-sm text-foreground/75 font-chinese line-clamp-3 leading-relaxed">
                            {post.summary}
                          </p>
                        </CardContent>
                      </div>

                      <div className="p-6 pt-0 flex items-center justify-between text-xs text-muted-foreground border-t border-border/40 font-body">
                        <div className="flex items-center gap-1.5 tabular-nums">
                          <Calendar className="size-3.5 text-accent-ink" aria-hidden="true" />
                          <span>{formattedDate}</span>
                        </div>
                        <span className="font-chinese text-accent-ink group-hover:underline flex items-center gap-1 font-medium">
                          閱讀文章 <ArrowRight className="size-3" aria-hidden="true" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center gap-3">
            <Coffee className="size-12 text-muted-foreground/50" aria-hidden="true" />
            <p className="font-chinese text-base text-muted-foreground">
              未找到符合條件的文章，請更換搜尋詞或分類。
            </p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
