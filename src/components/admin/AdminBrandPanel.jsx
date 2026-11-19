import React, { useState } from "react"
import { Upload, Check, Save } from "lucide-react"
import { useCoffee } from "@/context/CoffeeContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

function handleImageUpload(e, onLoaded) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    if (typeof event.target?.result === "string") {
      onLoaded(event.target.result)
    }
  }
  reader.readAsDataURL(file)
}

export const AdminBrandPanel = () => {
  const { brandSettings, updateBrandSettings } = useCoffee()
  const [brandForm, setBrandForm] = useState(() => ({ ...brandSettings }))
  const [saveBrandSuccess, setSaveBrandSuccess] = useState(false)

  const handleBrandSubmit = (e) => {
    e.preventDefault()
    updateBrandSettings(brandForm)
    setSaveBrandSuccess(true)
    setTimeout(() => setSaveBrandSuccess(false), 2500)
  }

  return (
    <Card className="p-6 md:p-8 max-w-4xl mx-auto border-border bg-card">
      <form onSubmit={handleBrandSubmit} className="flex flex-col gap-6">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-foreground">品牌基本設定</h2>
          <p className="text-xs text-muted-foreground font-chinese mt-1">
            修改名稱、標語、社群連結與代表圖片。支援直接貼圖檔網址或從電腦上傳圖片預覽。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="brand-name" className="text-xs font-semibold font-chinese">
              品牌名稱
            </label>
            <Input
              id="brand-name"
              value={brandForm.brandName}
              onChange={(e) => setBrandForm({ ...brandForm, brandName: e.target.value })}
              className="font-chinese"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="brand-slogan" className="text-xs font-semibold font-chinese">
              品牌標語 (Slogan)
            </label>
            <Input
              id="brand-slogan"
              value={brandForm.slogan}
              onChange={(e) => setBrandForm({ ...brandForm, slogan: e.target.value })}
              className="font-chinese"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="brand-desc" className="text-xs font-semibold font-chinese">
              品牌核心描述
            </label>
            <Textarea
              id="brand-desc"
              value={brandForm.description}
              onChange={(e) => setBrandForm({ ...brandForm, description: e.target.value })}
              rows={3}
              className="font-chinese"
              required
            />
          </div>

          {/* Logo URL & Upload */}
          <div className="flex flex-col gap-2 md:col-span-2 bg-secondary/30 p-4 rounded-xl border border-border/60">
            <div className="flex items-center justify-between">
              <label htmlFor="brand-logo-url" className="text-xs font-semibold font-chinese">
                品牌圓形 Logo 圖片
              </label>
              <span className="text-xs text-muted-foreground font-chinese">支援貼連結或上傳</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-14 rounded-full overflow-hidden border-2 border-accent shrink-0 bg-card">
                <img
                  src={brandForm.logoUrl}
                  alt="品牌 Logo 預覽"
                  className="size-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <Input
                  id="brand-logo-url"
                  value={brandForm.logoUrl}
                  onChange={(e) => setBrandForm({ ...brandForm, logoUrl: e.target.value })}
                  placeholder="請輸入 Logo 圖片網址"
                  className="text-xs font-mono"
                />
                <div className="flex items-center gap-2">
                  <label
                    htmlFor="brand-logo-file"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-secondary hover:bg-secondary/80 text-xs font-chinese transition-colors"
                  >
                    <Upload className="size-3.5" aria-hidden="true" />
                    <span>從電腦選取 Logo 上傳</span>
                    <input
                      id="brand-logo-file"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleImageUpload(e, (url) =>
                          setBrandForm((prev) => ({ ...prev, logoUrl: url }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="brand-fb" className="text-xs font-semibold font-chinese">
              Facebook 專頁網址
            </label>
            <Input
              id="brand-fb"
              value={brandForm.facebookUrl}
              onChange={(e) => setBrandForm({ ...brandForm, facebookUrl: e.target.value })}
              className="font-mono text-xs"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="brand-ig" className="text-xs font-semibold font-chinese">
              Instagram 專頁網址
            </label>
            <Input
              id="brand-ig"
              value={brandForm.instagramUrl}
              onChange={(e) => setBrandForm({ ...brandForm, instagramUrl: e.target.value })}
              className="font-mono text-xs"
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="brand-yt" className="text-xs font-semibold font-chinese">
              YouTube 頻道網址
            </label>
            <Input
              id="brand-yt"
              value={brandForm.youtubeUrl}
              onChange={(e) => setBrandForm({ ...brandForm, youtubeUrl: e.target.value })}
              className="font-mono text-xs"
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label htmlFor="brand-line" className="text-xs font-semibold font-chinese">
              LINE 加入引導文字
            </label>
            <Textarea
              id="brand-line"
              value={brandForm.lineInstructions}
              onChange={(e) => setBrandForm({ ...brandForm, lineInstructions: e.target.value })}
              rows={2}
              className="font-chinese text-sm"
            />
          </div>

          {/* Hero Background Image */}
          <div className="flex flex-col gap-2 md:col-span-2 bg-secondary/30 p-4 rounded-xl border border-border/60">
            <label htmlFor="brand-hero-url" className="text-xs font-semibold font-chinese">
              首頁滿版 Hero 背景圖
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-32 h-20 rounded-md overflow-hidden border border-border bg-card shrink-0">
                <img
                  src={brandForm.heroBgUrl}
                  alt="Hero 背景圖預覽"
                  className="size-full object-cover"
                />
              </div>
              <div className="flex-1 w-full flex flex-col gap-2">
                <Input
                  id="brand-hero-url"
                  value={brandForm.heroBgUrl}
                  onChange={(e) => setBrandForm({ ...brandForm, heroBgUrl: e.target.value })}
                  className="text-xs font-mono"
                />
                <label
                  htmlFor="brand-hero-file"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-secondary hover:bg-secondary/80 text-xs font-chinese transition-colors w-fit"
                >
                  <Upload className="size-3.5" aria-hidden="true" />
                  <span>更換 Hero 背景圖片</span>
                  <input
                    id="brand-hero-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(e, (url) =>
                        setBrandForm((prev) => ({ ...prev, heroBgUrl: url }))
                      )
                    }
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Story Section Image */}
          <div className="flex flex-col gap-2 md:col-span-2 bg-secondary/30 p-4 rounded-xl border border-border/60">
            <label htmlFor="brand-story-url" className="text-xs font-semibold font-chinese">
              品牌故事配圖（種植園）
            </label>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="w-32 h-20 rounded-md overflow-hidden border border-border bg-card shrink-0">
                <img
                  src={brandForm.storyBgUrl}
                  alt="品牌故事圖片預覽"
                  className="size-full object-cover"
                />
              </div>
              <div className="flex-1 w-full flex flex-col gap-2">
                <Input
                  id="brand-story-url"
                  value={brandForm.storyBgUrl}
                  onChange={(e) => setBrandForm({ ...brandForm, storyBgUrl: e.target.value })}
                  className="text-xs font-mono"
                />
                <label
                  htmlFor="brand-story-file"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-secondary hover:bg-secondary/80 text-xs font-chinese transition-colors w-fit"
                >
                  <Upload className="size-3.5" aria-hidden="true" />
                  <span>更換故事圖片</span>
                  <input
                    id="brand-story-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleImageUpload(e, (url) =>
                        setBrandForm((prev) => ({ ...prev, storyBgUrl: url }))
                      )
                    }
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground font-chinese">
            所有更改儲存後將即時反映於全站
          </span>

          <div className="flex items-center gap-3">
            <div role="status" aria-live="polite">
              {saveBrandSuccess && (
                <span className="text-emerald-700 dark:text-emerald-400 text-xs font-chinese flex items-center gap-1">
                  <Check className="size-4" aria-hidden="true" /> 品牌設定已成功保存！
                </span>
              )}
            </div>
            <Button
              type="submit"
              className="h-10 bg-accent-ink hover:bg-accent-ink/90 text-white font-chinese px-6 gap-2"
            >
              <Save className="size-4" aria-hidden="true" />
              <span>儲存設定</span>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
