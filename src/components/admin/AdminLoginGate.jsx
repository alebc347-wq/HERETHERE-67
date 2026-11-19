import React, { useState, useRef } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Lock, Eye, EyeOff, ArrowLeft, AlertCircle } from "lucide-react"
import { useCoffee } from "@/context/CoffeeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { PREMIUM_EASE, shakeAnimation } from "@/lib/motion"

export const AdminLoginGate = () => {
  const { brandSettings, verifyAdminPassword } = useCoffee()
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [shakeKey, setShakeKey] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setError("")
    setSubmitting(true)

    const result = await verifyAdminPassword(password)
    if (!result.success) {
      setError(result.message || "密碼驗證失敗，請重試。")
      setShakeKey((k) => k + 1)
      setSubmitting(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="min-h-[calc(100dvh-5rem)] pt-28 pb-20 px-4 flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: PREMIUM_EASE }}
        className="w-full max-w-md"
      >
        <motion.div
          key={shakeKey}
          animate={shakeKey > 0 ? shakeAnimation : undefined}
        >
          <Card className="border-border bg-card shadow-sm rounded-xl">
            <CardHeader className="text-center pb-4">
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="mx-auto size-14 rounded-full overflow-hidden border-2 border-accent mb-3 bg-secondary flex items-center justify-center"
              >
                {brandSettings.logoUrl ? (
                  <img
                    src={brandSettings.logoUrl}
                    alt={brandSettings.brandName}
                    className="size-full object-cover"
                  />
                ) : (
                  <Lock className="size-6 text-accent-ink" aria-hidden="true" />
                )}
              </motion.div>
              <CardTitle className="font-heading text-2xl font-semibold text-foreground">
                管理後台驗證
              </CardTitle>
              <CardDescription className="font-chinese text-sm text-muted-foreground pt-1">
                請輸入管理員密碼以管理 {brandSettings.brandName} 網站內容與設定。
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="admin-login-password"
                    className="text-sm font-medium font-chinese text-foreground flex items-center gap-1.5"
                  >
                    <Lock className="size-3.5 text-accent-ink" aria-hidden="true" />
                    <span>管理員密碼</span>
                  </label>

                  <div className="relative">
                    <Input
                      ref={inputRef}
                      id="admin-login-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        if (error) setError("")
                      }}
                      placeholder="請輸入密碼"
                      autoComplete="current-password"
                      aria-invalid={error ? "true" : "false"}
                      aria-describedby={error ? "admin-login-error" : "admin-login-hint"}
                      className="h-11 pr-11 font-body text-sm bg-background"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
                      aria-pressed={showPassword}
                      className="absolute right-1 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="size-4" aria-hidden="true" />
                      ) : (
                        <Eye className="size-4" aria-hidden="true" />
                      )}
                    </button>
                  </div>

                  {error ? (
                    <p
                      id="admin-login-error"
                      role="alert"
                      className="flex items-center gap-1.5 text-xs font-chinese text-destructive pt-0.5"
                    >
                      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                      <span>{error}</span>
                    </p>
                  ) : (
                    <p
                      id="admin-login-hint"
                      className="text-xs text-muted-foreground font-chinese"
                    >
                      登入後可於「帳號安全」分頁隨時更改管理員密碼。
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-11 w-full bg-accent-ink hover:bg-accent-ink/90 text-white font-chinese font-medium tracking-wider"
                >
                  {submitting ? "驗證中..." : "解鎖進入後台"}
                </Button>

                <div className="pt-2 border-t border-border/60 text-center">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-1.5 text-xs font-chinese text-muted-foreground hover:text-accent-ink transition-colors py-1"
                  >
                    <ArrowLeft className="size-3.5" aria-hidden="true" />
                    <span>返回品牌首頁</span>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}
