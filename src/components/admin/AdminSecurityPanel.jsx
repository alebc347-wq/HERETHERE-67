import React, { useState } from "react"
import {
  KeyRound,
  ShieldCheck,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  LogOut,
  RotateCcw,
} from "lucide-react"
import { useCoffee } from "@/context/CoffeeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const AdminSecurityPanel = () => {
  const {
    isCustomPasswordSet,
    changeAdminPassword,
    resetAdminPasswordToDefault,
    logoutAdmin,
  } = useCoffee()

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showFields, setShowFields] = useState({
    current: false,
    next: false,
    confirm: false,
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [statusMessage, setStatusMessage] = useState(null)
  const [saving, setSaving] = useState(false)

  // Two-step confirmation state for resetting back to default password
  const [showResetBox, setShowResetBox] = useState(false)
  const [resetCurrentPw, setResetCurrentPw] = useState("")
  const [resetStatus, setResetStatus] = useState(null)

  const toggleShow = (key) => {
    setShowFields((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (saving) return

    const errors = {}
    if (!currentPassword) errors.current = "請輸入目前密碼。"
    if (!newPassword || newPassword.length < 4) {
      errors.next = "新密碼長度至少需 4 個字元。"
    }
    if (newPassword !== confirmPassword) {
      errors.confirm = "兩次輸入的新密碼不一致。"
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatusMessage(null)
      return
    }

    setSaving(true)
    setFieldErrors({})
    setStatusMessage(null)

    const result = await changeAdminPassword(currentPassword, newPassword)
    setSaving(false)

    if (!result.success) {
      if (result.field === "current" || result.field === "next") {
        setFieldErrors({ [result.field]: result.message })
      } else {
        setStatusMessage({ type: "error", text: result.message })
      }
      return
    }

    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
    setStatusMessage({ type: "success", text: result.message })
  }

  const handleResetDefaultPassword = async (e) => {
    e.preventDefault()
    setResetStatus(null)
    const res = await resetAdminPasswordToDefault(resetCurrentPw)
    if (!res.success) {
      setResetStatus({ type: "error", text: res.message })
      return
    }
    setResetCurrentPw("")
    setShowResetBox(false)
    setStatusMessage({ type: "success", text: res.message })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-5xl mx-auto">
      {/* Main Form: Change Password */}
      <Card className="lg:col-span-7 border-border bg-card">
        <CardHeader>
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <KeyRound className="size-5 text-accent-ink" aria-hidden="true" />
              <CardTitle className="font-heading text-xl font-semibold">
                修改管理員密碼
              </CardTitle>
            </div>
            <Badge variant={isCustomPasswordSet ? "default" : "secondary"} className="font-chinese">
              {isCustomPasswordSet ? "已自訂密碼" : "使用預設密碼"}
            </Badge>
          </div>
          <CardDescription className="font-chinese text-xs sm:text-sm">
            密碼經過 SHA-256 雜湊後儲存於此瀏覽器中，變更後立即生效。
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handlePasswordSubmit} noValidate className="flex flex-col gap-5">
            {/* Current Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="security-current-pw"
                className="text-xs font-semibold font-chinese text-foreground"
              >
                目前密碼
              </label>
              <div className="relative">
                <Input
                  id="security-current-pw"
                  type={showFields.current ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value)
                    setFieldErrors((prev) => ({ ...prev, current: undefined }))
                  }}
                  autoComplete="current-password"
                  placeholder="輸入目前使用的密碼"
                  aria-invalid={fieldErrors.current ? "true" : "false"}
                  aria-describedby={fieldErrors.current ? "err-current-pw" : undefined}
                  className="h-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleShow("current")}
                  aria-label={showFields.current ? "隱藏目前密碼" : "顯示目前密碼"}
                  aria-pressed={showFields.current}
                  className="absolute right-1 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                >
                  {showFields.current ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {fieldErrors.current && (
                <p
                  id="err-current-pw"
                  role="alert"
                  className="text-xs text-destructive font-chinese flex items-center gap-1"
                >
                  <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{fieldErrors.current}</span>
                </p>
              )}
            </div>

            {/* New Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="security-new-pw"
                className="text-xs font-semibold font-chinese text-foreground"
              >
                新密碼
              </label>
              <div className="relative">
                <Input
                  id="security-new-pw"
                  type={showFields.next ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value)
                    setFieldErrors((prev) => ({ ...prev, next: undefined }))
                  }}
                  autoComplete="new-password"
                  placeholder="設定新密碼（至少 4 個字元）"
                  aria-invalid={fieldErrors.next ? "true" : "false"}
                  aria-describedby={fieldErrors.next ? "err-new-pw" : "hint-new-pw"}
                  className="h-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleShow("next")}
                  aria-label={showFields.next ? "隱藏新密碼" : "顯示新密碼"}
                  aria-pressed={showFields.next}
                  className="absolute right-1 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                >
                  {showFields.next ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {fieldErrors.next ? (
                <p
                  id="err-new-pw"
                  role="alert"
                  className="text-xs text-destructive font-chinese flex items-center gap-1"
                >
                  <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{fieldErrors.next}</span>
                </p>
              ) : (
                <p id="hint-new-pw" className="text-xs text-muted-foreground font-chinese">
                  建議混合英文字母與數字，提升後台防護強度。
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="security-confirm-pw"
                className="text-xs font-semibold font-chinese text-foreground"
              >
                確認新密碼
              </label>
              <div className="relative">
                <Input
                  id="security-confirm-pw"
                  type={showFields.confirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value)
                    setFieldErrors((prev) => ({ ...prev, confirm: undefined }))
                  }}
                  autoComplete="new-password"
                  placeholder="再次輸入新密碼"
                  aria-invalid={fieldErrors.confirm ? "true" : "false"}
                  aria-describedby={fieldErrors.confirm ? "err-confirm-pw" : undefined}
                  className="h-11 pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => toggleShow("confirm")}
                  aria-label={showFields.confirm ? "隱藏確認密碼" : "顯示確認密碼"}
                  aria-pressed={showFields.confirm}
                  className="absolute right-1 top-1/2 -translate-y-1/2 size-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                >
                  {showFields.confirm ? (
                    <EyeOff className="size-4" aria-hidden="true" />
                  ) : (
                    <Eye className="size-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {fieldErrors.confirm && (
                <p
                  id="err-confirm-pw"
                  role="alert"
                  className="text-xs text-destructive font-chinese flex items-center gap-1"
                >
                  <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
                  <span>{fieldErrors.confirm}</span>
                </p>
              )}
            </div>

            {statusMessage && (
              <div
                role="status"
                aria-live="polite"
                className={`p-3 rounded-lg border text-xs font-chinese flex items-center gap-2 ${
                  statusMessage.type === "success"
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-950/50 dark:border-emerald-800 dark:text-emerald-200"
                    : "bg-destructive/10 border-destructive/30 text-destructive"
                }`}
              >
                {statusMessage.type === "success" ? (
                  <CheckCircle2 className="size-4 shrink-0" aria-hidden="true" />
                ) : (
                  <AlertCircle className="size-4 shrink-0" aria-hidden="true" />
                )}
                <span>{statusMessage.text}</span>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                disabled={saving}
                className="h-11 px-6 bg-accent-ink hover:bg-accent-ink/90 text-white font-chinese font-medium"
              >
                {saving ? "更新密碼中..." : "更新管理員密碼"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Side Card: Session & Recovery */}
      <Card className="lg:col-span-5 border-border bg-card h-fit">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-accent-ink" aria-hidden="true" />
            <CardTitle className="font-heading text-xl font-semibold">
              工作階段與鎖定
            </CardTitle>
          </div>
          <CardDescription className="font-chinese text-xs sm:text-sm">
            管理目前登入狀態，或將密碼重設為出廠預設值。
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5">
          <div className="p-4 rounded-lg bg-secondary/40 border border-border/60 flex flex-col gap-2">
            <p className="text-sm font-medium font-chinese text-foreground">
              立即鎖定管理後台
            </p>
            <p className="text-xs text-muted-foreground font-chinese leading-relaxed">
              若您使用的是共用電腦，完成編輯後建議立即登出以清除目前分頁的驗證權限。
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={logoutAdmin}
              className="h-11 mt-1 font-chinese gap-2 justify-center"
            >
              <LogOut className="size-4" aria-hidden="true" />
              <span>登出並鎖定後台</span>
            </Button>
          </div>

          {isCustomPasswordSet && (
            <>
              <Separator />
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium font-chinese text-foreground">
                      恢復預設密碼
                    </p>
                    <p className="text-xs text-muted-foreground font-chinese">
                      移除自訂密碼並恢復為系統預設密碼。
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowResetBox((prev) => !prev)
                      setResetStatus(null)
                    }}
                    className="font-chinese text-xs gap-1.5"
                  >
                    <RotateCcw className="size-3.5" aria-hidden="true" />
                    <span>{showResetBox ? "取消" : "重設"}</span>
                  </Button>
                </div>

                {showResetBox && (
                  <form
                    onSubmit={handleResetDefaultPassword}
                    className="p-3.5 rounded-lg border border-border bg-background flex flex-col gap-3"
                  >
                    <label
                      htmlFor="reset-verify-pw"
                      className="text-xs font-medium font-chinese text-foreground"
                    >
                      輸入目前密碼以確認恢復預設值
                    </label>
                    <Input
                      id="reset-verify-pw"
                      type="password"
                      value={resetCurrentPw}
                      onChange={(e) => setResetCurrentPw(e.target.value)}
                      placeholder="請輸入目前密碼"
                      className="h-10"
                      required
                    />
                    {resetStatus && (
                      <p role="alert" className="text-xs text-destructive font-chinese">
                        {resetStatus.text}
                      </p>
                    )}
                    <Button
                      type="submit"
                      variant="destructive"
                      size="sm"
                      className="h-10 font-chinese"
                    >
                      確認恢復為預設密碼
                    </Button>
                  </form>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
