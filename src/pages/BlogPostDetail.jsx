import React, { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Share2, Check, Coffee, ArrowRight } from "lucide-react"
import moment from "moment"
import { useCoffee } from "@/context/CoffeeContext"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { pageTransition } from "@/lib/motion"
import { sanitizeHtml } from "@/lib/security"

export const BlogPostDetail = () => {
  const { id } = useParams()
  const { blogPosts, brandSettings } = useCoffee()
  const [copied, setCopied] = useState(false)

  const postIndex = blogPosts.findIndex((p) => p.id === id)
  const post = blogPosts[postIndex]

  if (!post) {
    return (
      <div className="pt-36 pb-24 min-h-screen text-center flex flex-col items-center justify-center gap-4 bg-background">
        <Coffee className="size-16 text-muted-foreground/50" aria-hidden="true" />
        <h1 className="font-heading text-2xl text-foreground">找不到此文章</h1>
        <p className="text-muted-foreground font-chinese text-sm">
          此文章可能已被移除或設定為不公開。
        </p>
        <Link to="/blog">
          <Button variant="outline" className="h-10 font-chinese mt-2">
            返回文章列表
          </Button>
        </Link>
      </div>
    )
  }

  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null
  const formattedDate = moment(post.created_at).format("YYYY 年 MM 月 DD 日")
  const safeContentHtml = sanitizeHtml(post.content)

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <motion.article
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="pt-28 pb-28 min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm font-chinese text-muted-foreground hover:text-accent-ink transition-colors py-1"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            <span>返回咖啡誌列表</span>
          </Link>
        </div>

        {/* Header Metadata */}
        <header className="flex flex-col gap-4 mb-8">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="accent" className="font-chinese text-xs text-accent-ink">
              {post.category}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-chinese tabular-nums">
              <Calendar className="size-3.5 text-accent-ink" aria-hidden="true" />
              <span>{formattedDate}</span>
            </div>
            <span className="text-xs text-muted-foreground font-chinese">· 5 分鐘閱讀</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight leading-tight">
            {post.title}
          </h1>

          <p className="font-chinese text-base sm:text-lg text-foreground/80 leading-relaxed italic border-l-2 border-accent pl-4 py-1 max-w-[65ch]">
            {post.summary}
          </p>

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex items-center gap-2.5">
              <div className="size-9 rounded-full overflow-hidden border border-accent/40 shrink-0">
                <img
                  src={brandSettings.logoUrl}
                  alt={brandSettings.brandName}
                  width={36}
                  height={36}
                  className="size-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-chinese text-xs font-semibold text-foreground">
                  HERETHERE 烘焙團隊
                </span>
                <span className="text-[11px] text-muted-foreground">Specialty Roasters</span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleShare}
              className="h-10 text-xs font-chinese gap-1.5"
            >
              {copied ? (
                <>
                  <Check className="size-3.5 text-emerald-600" aria-hidden="true" />
                  <span>已複製連結！</span>
                </>
              ) : (
                <>
                  <Share2 className="size-3.5 text-muted-foreground" aria-hidden="true" />
                  <span>分享文章</span>
                </>
              )}
            </Button>
          </div>
        </header>

        {/* Cover Image */}
        {post.cover_image && (
          <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl mb-12 shadow-lg bg-secondary">
            <img
              src={post.cover_image}
              alt={post.title}
              width={1200}
              height={675}
              className="size-full object-cover"
            />
          </div>
        )}

        {/* Article Body (Sanitized via DOMPurify) */}
        <div
          className="prose prose-lg dark:prose-invert font-chinese leading-relaxed text-foreground/85 max-w-[68ch] mx-auto pt-2
            prose-headings:font-heading prose-headings:font-semibold prose-headings:text-foreground
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-accent-ink
            prose-p:leading-relaxed prose-p:mb-6
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
            prose-li:mb-2"
          dangerouslySetInnerHTML={{ __html: safeContentHtml }}
        />

        <Separator className="my-14" />

        {/* Post Navigation */}
        <nav aria-label="文章上下篇導覽" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              to={`/blog/${prevPost.id}`}
              className="group p-5 rounded-xl border border-border/80 hover:border-accent-ink bg-card transition-colors flex flex-col gap-1.5"
            >
              <span className="text-xs text-muted-foreground font-chinese flex items-center gap-1">
                <ArrowLeft className="size-3" aria-hidden="true" /> 上一篇文章
              </span>
              <span className="font-heading font-medium text-foreground group-hover:text-accent-ink transition-colors line-clamp-1">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextPost && (
            <Link
              to={`/blog/${nextPost.id}`}
              className="group p-5 rounded-xl border border-border/80 hover:border-accent-ink bg-card transition-colors flex flex-col gap-1.5 text-right"
            >
              <span className="text-xs text-muted-foreground font-chinese flex items-center justify-end gap-1">
                下一篇文章 <ArrowRight className="size-3" aria-hidden="true" />
              </span>
              <span className="font-heading font-medium text-foreground group-hover:text-accent-ink transition-colors line-clamp-1">
                {nextPost.title}
              </span>
            </Link>
          )}
        </nav>
      </div>
    </motion.article>
  )
}
