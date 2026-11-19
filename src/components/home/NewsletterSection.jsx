import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, CheckCircle2, Coffee } from "lucide-react"
import { useCoffee } from "@/context/CoffeeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PREMIUM_EASE } from "@/lib/motion"

export const NewsletterSection = () => {
  const { addSubscriber } = useCoffee()
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email || !email.includes("@")) {
      setStatus({ type: "error", message: "請輸入有效的電子郵件地址" })
      return
    }

    setLoading(true)
    setTimeout(() => {
      const res = addSubscriber(email)
      if (res.success) {
        setStatus({ type: "success", message: res.message })
        setEmail("")
      } else {
        setStatus({ type: "error", message: res.message })
      }
      setLoading(false)
    }, 300)
  }

  return (
    <section className="py-20 md:py-24 bg-[hsl(15_30%_8%)] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.35, ease: PREMIUM_EASE }}
          className="flex flex-col items-center gap-4 max-w-xl w-full"
        >
          <div className="size-14 rounded-full bg-accent/20 border border-accent/50 flex items-center justify-center text-accent mb-2">
            <Mail className="size-6" aria-hidden="true" />
          </div>

          <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-tight text-white">
            訂閱電子報
          </h2>

          <p className="text-[hsl(30_15%_82%)] font-chinese text-sm md:text-base leading-relaxed">
            每當有新文章發布，我們將第一時間通知你。只聊咖啡，不發垃圾信。
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="w-full flex flex-col sm:flex-row gap-3 pt-4"
          >
            <div className="relative flex-1">
              <label htmlFor="newsletter-email" className="sr-only">
                電子郵件地址
              </label>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="輸入您的電子郵件地址（例如：name@example.com）"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (status) setStatus(null)
                }}
                disabled={loading}
                aria-invalid={status?.type === "error" ? "true" : "false"}
                aria-describedby={status ? "newsletter-feedback" : undefined}
                className="h-12 bg-[hsl(15_25%_14%)] border-[hsl(15_25%_28%)] text-white placeholder:text-[hsl(30_12%_65%)] focus-visible:ring-accent font-chinese text-sm rounded-lg"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-8 bg-accent hover:bg-accent/90 text-[hsl(15_30%_8%)] font-chinese font-semibold tracking-wider rounded-lg shadow-md shrink-0"
            >
              {loading ? "處理中..." : "立即訂閱"}
            </Button>
          </form>

          <div
            id="newsletter-feedback"
            role="status"
            aria-live="polite"
            className="min-h-[28px] flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              {status && (
                <motion.div
                  key={status.message}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className={`flex items-center gap-2 text-sm font-chinese pt-1 ${
                    status.type === "success" ? "text-emerald-300" : "text-amber-300"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
                  ) : (
                    <Coffee className="size-4 shrink-0 text-amber-300" aria-hidden="true" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
