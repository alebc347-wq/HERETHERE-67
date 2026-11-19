import React, { useState } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

function readImageFile(file, onLoaded) {
  if (!file) return
  const reader = new FileReader()
  reader.onload = (event) => {
    if (typeof event.target?.result === "string") {
      onLoaded(event.target.result)
    }
  }
  reader.readAsDataURL(file)
}

export function ConfirmActionDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "確認刪除",
  variant = "destructive",
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="font-chinese pt-1">{description}</DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose} className="h-10 font-chinese">
            取消
          </Button>
          <Button
            type="button"
            variant={variant}
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="h-10 font-chinese"
          >
            {confirmLabel}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function BlogPostForm({ post, onSave, onClose }) {
  const [formData, setFormData] = useState(() =>
    post
      ? {
          title: post.title || "",
          category: post.category || "咖啡豆介紹",
          summary: post.summary || "",
          content: post.content || "",
          cover_image: post.cover_image || "",
          is_published: post.is_published ?? true,
        }
      : {
          title: "",
          category: "咖啡豆介紹",
          summary: "",
          content: "<p>請在此撰寫豐富的文章內容...</p>",
          cover_image:
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=900&q=80",
          is_published: true,
        }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="post-title" className="text-xs font-semibold font-chinese">
          文章標題
        </label>
        <Input
          id="post-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="post-category" className="text-xs font-semibold font-chinese">
            分類
          </label>
          <select
            id="post-category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm font-chinese"
          >
            <option value="咖啡豆介紹">咖啡豆介紹</option>
            <option value="手沖知識">手沖知識</option>
            <option value="品牌公告">品牌公告</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="post-status" className="text-xs font-semibold font-chinese">
            發布狀態
          </label>
          <select
            id="post-status"
            value={formData.is_published ? "true" : "false"}
            onChange={(e) =>
              setFormData({ ...formData, is_published: e.target.value === "true" })
            }
            className="h-10 rounded-md border border-input bg-background px-3 text-sm font-chinese"
          >
            <option value="true">公開發布</option>
            <option value="false">儲存為草稿</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="post-summary" className="text-xs font-semibold font-chinese">
          摘要簡介
        </label>
        <Textarea
          id="post-summary"
          value={formData.summary}
          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          rows={2}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="post-cover" className="text-xs font-semibold font-chinese">
          封面圖片網址或上傳
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            id="post-cover"
            value={formData.cover_image}
            onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
            className="flex-1 text-xs font-mono"
          />
          <label
            htmlFor="post-cover-upload"
            className="inline-flex items-center justify-center gap-1.5 px-3 h-10 rounded-md bg-secondary hover:bg-secondary/80 text-xs font-chinese shrink-0"
          >
            <Upload className="size-3.5" aria-hidden="true" />
            <span>上傳圖片</span>
            <input
              id="post-cover-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                readImageFile(e.target.files?.[0], (url) =>
                  setFormData((prev) => ({ ...prev, cover_image: url }))
                )
              }
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="post-content" className="text-xs font-semibold font-chinese">
          內文 (HTML 格式，輸出自動淨化)
        </label>
        <Textarea
          id="post-content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={7}
          className="font-mono text-xs"
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="h-10 font-chinese">
          取消
        </Button>
        <Button
          type="submit"
          className="h-10 bg-accent-ink text-white hover:bg-accent-ink/90 font-chinese"
        >
          儲存文章
        </Button>
      </div>
    </form>
  )
}

export function BlogPostEditorModal({ isOpen, onClose, post, onSave }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{post ? "編輯文章" : "新增文章"}</DialogTitle>
          <DialogDescription>設定文章分類、摘要、封面圖與 HTML 內容</DialogDescription>
        </DialogHeader>
        {isOpen && (
          <BlogPostForm
            key={post?.id || "new-post"}
            post={post}
            onSave={onSave}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function ProductForm({ product, onSave, onClose }) {
  const [formData, setFormData] = useState(() =>
    product
      ? {
          name: product.name || "",
          category: product.category || "咖啡豆",
          price: product.price || 480,
          image: product.image || "",
          roast_level: product.roast_level || "淺焙 Light Roast",
          origin: product.origin || "",
          flavor_notes: Array.isArray(product.flavor_notes)
            ? product.flavor_notes.join(", ")
            : product.flavor_notes || "",
          description: product.description || "",
          is_available: product.is_available ?? true,
        }
      : {
          name: "",
          category: "咖啡豆",
          price: 480,
          image:
            "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?auto=format&fit=crop&w=800&q=80",
          roast_level: "淺焙 Light Roast",
          origin: "衣索比亞",
          flavor_notes: "茉莉花, 蜜桃, 佛手柑",
          description: "<p>優雅的花香與多汁的水果酸甜，細緻綿密的尾韻。</p>",
          is_available: true,
        }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="prod-name" className="text-xs font-semibold font-chinese">
          商品名稱
        </label>
        <Input
          id="prod-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="prod-category" className="text-xs font-semibold font-chinese">
            商品類別
          </label>
          <select
            id="prod-category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm font-chinese"
          >
            <option value="咖啡豆">咖啡豆</option>
            <option value="濾掛包">濾掛包</option>
            <option value="器具">器具</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="prod-price" className="text-xs font-semibold font-chinese">
            價格 (NT$)
          </label>
          <Input
            id="prod-price"
            type="number"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="prod-roast" className="text-xs font-semibold font-chinese">
            烘焙度 / 規格說明
          </label>
          <Input
            id="prod-roast"
            value={formData.roast_level}
            onChange={(e) => setFormData({ ...formData, roast_level: e.target.value })}
            placeholder="例如：淺焙 Light Roast"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="prod-origin" className="text-xs font-semibold font-chinese">
            產地資訊
          </label>
          <Input
            id="prod-origin"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            placeholder="例如：衣索比亞 耶加雪菲"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="prod-notes" className="text-xs font-semibold font-chinese">
          風味標籤 (以逗號分隔)
        </label>
        <Input
          id="prod-notes"
          value={formData.flavor_notes}
          onChange={(e) => setFormData({ ...formData, flavor_notes: e.target.value })}
          placeholder="茉莉花香, 水蜜桃, 佛手柑"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="prod-image" className="text-xs font-semibold font-chinese">
          商品圖片網址或上傳
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            id="prod-image"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="flex-1 text-xs font-mono"
          />
          <label
            htmlFor="prod-image-upload"
            className="inline-flex items-center justify-center gap-1.5 px-3 h-10 rounded-md bg-secondary hover:bg-secondary/80 text-xs font-chinese shrink-0"
          >
            <Upload className="size-3.5" aria-hidden="true" />
            <span>上傳圖片</span>
            <input
              id="prod-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                readImageFile(e.target.files?.[0], (url) =>
                  setFormData((prev) => ({ ...prev, image: url }))
                )
              }
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="prod-desc" className="text-xs font-semibold font-chinese">
          商品詳情 (HTML 格式)
        </label>
        <Textarea
          id="prod-desc"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={4}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="h-10 font-chinese">
          取消
        </Button>
        <Button
          type="submit"
          className="h-10 bg-accent-ink text-white hover:bg-accent-ink/90 font-chinese"
        >
          儲存商品
        </Button>
      </div>
    </form>
  )
}

export function ProductEditorModal({ isOpen, onClose, product, onSave }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "編輯商品" : "新增商品"}</DialogTitle>
          <DialogDescription>設定名稱、定價、圖片與沖煮相關參數</DialogDescription>
        </DialogHeader>
        {isOpen && (
          <ProductForm
            key={product?.id || "new-product"}
            product={product}
            onSave={onSave}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function EventForm({ event, onSave, onClose }) {
  const [formData, setFormData] = useState(() =>
    event
      ? {
          title: event.title || "",
          description: event.description || "",
          event_start: event.event_start || "2026-11-12T10:00:00",
          event_end: event.event_end || "2026-11-22T19:00:00",
          location_name: event.location_name || "",
          address: event.address || "",
          map_link: event.map_link || "",
          images: Array.isArray(event.images) ? event.images.join("\n") : event.images || "",
          is_active: event.is_active ?? true,
        }
      : {
          title: "",
          description: "",
          event_start: "2026-11-25T10:00:00",
          event_end: "2026-12-02T19:00:00",
          location_name: "華山概念快閃館",
          address: "台北市中正區八德路一段 1 號",
          map_link: "https://maps.google.com/?q=華山1914",
          images:
            "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
          is_active: true,
        }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="event-title" className="text-xs font-semibold font-chinese">
          活動名稱
        </label>
        <Input
          id="event-title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="event-start" className="text-xs font-semibold font-chinese">
            開始時間
          </label>
          <Input
            id="event-start"
            type="datetime-local"
            value={formData.event_start.slice(0, 16)}
            onChange={(e) => setFormData({ ...formData, event_start: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="event-end" className="text-xs font-semibold font-chinese">
            結束時間
          </label>
          <Input
            id="event-end"
            type="datetime-local"
            value={formData.event_end.slice(0, 16)}
            onChange={(e) => setFormData({ ...formData, event_end: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="event-loc" className="text-xs font-semibold font-chinese">
            空間 / 館名
          </label>
          <Input
            id="event-loc"
            value={formData.location_name}
            onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="event-addr" className="text-xs font-semibold font-chinese">
            詳細地址
          </label>
          <Input
            id="event-addr"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="event-map" className="text-xs font-semibold font-chinese">
          Google 地圖連結
        </label>
        <Input
          id="event-map"
          value={formData.map_link}
          onChange={(e) => setFormData({ ...formData, map_link: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <label htmlFor="event-images" className="text-xs font-semibold font-chinese">
            活動圖片網址 (每行一張)
          </label>
          <label
            htmlFor="event-image-upload"
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 text-xs font-chinese"
          >
            <Upload className="size-3" aria-hidden="true" />
            <span>加入本機圖片</span>
            <input
              id="event-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                readImageFile(e.target.files?.[0], (url) =>
                  setFormData((prev) => ({
                    ...prev,
                    images: prev.images ? `${prev.images}\n${url}` : url,
                  }))
                )
              }
            />
          </label>
        </div>
        <Textarea
          id="event-images"
          value={formData.images}
          onChange={(e) => setFormData({ ...formData, images: e.target.value })}
          rows={3}
          className="font-mono text-xs"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="event-desc" className="text-xs font-semibold font-chinese">
          活動描述
        </label>
        <Textarea
          id="event-desc"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="h-10 font-chinese">
          取消
        </Button>
        <Button
          type="submit"
          className="h-10 bg-accent-ink text-white hover:bg-accent-ink/90 font-chinese"
        >
          儲存活動
        </Button>
      </div>
    </form>
  )
}

export function EventEditorModal({ isOpen, onClose, event, onSave }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{event ? "編輯快閃活動" : "新增快閃活動"}</DialogTitle>
          <DialogDescription>設定時間、倒數計時與地點資訊</DialogDescription>
        </DialogHeader>
        {isOpen && (
          <EventForm
            key={event?.id || "new-event"}
            event={event}
            onSave={onSave}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}

function TestimonialForm({ testimonial, onSave, onClose }) {
  const [formData, setFormData] = useState(() =>
    testimonial
      ? {
          name: testimonial.name || "",
          rating: testimonial.rating || 5,
          product: testimonial.product || "",
          content: testimonial.content || "",
          avatar: testimonial.avatar || "",
          is_visible: testimonial.is_visible ?? true,
        }
      : {
          name: "",
          rating: 5,
          product: "",
          content: "",
          avatar: "",
          is_visible: true,
        }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="test-name" className="text-xs font-semibold font-chinese">
          顧客姓名 / 暱稱
        </label>
        <Input
          id="test-name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="test-rating" className="text-xs font-semibold font-chinese">
            評分星級
          </label>
          <select
            id="test-rating"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm font-chinese"
          >
            <option value="5">5 星評價</option>
            <option value="4">4 星評價</option>
            <option value="3">3 星評價</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="test-product" className="text-xs font-semibold font-chinese">
            購買之商品
          </label>
          <Input
            id="test-product"
            value={formData.product}
            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="test-content" className="text-xs font-semibold font-chinese">
          評價內容引言
        </label>
        <Textarea
          id="test-content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          rows={3}
          required
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="test-avatar" className="text-xs font-semibold font-chinese">
          頭像圖片網址或上傳（選填，留空顯示姓氏圓圈）
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <Input
            id="test-avatar"
            value={formData.avatar}
            onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            className="flex-1 text-xs font-mono"
          />
          <label
            htmlFor="test-avatar-upload"
            className="inline-flex items-center justify-center gap-1.5 px-3 h-10 rounded-md bg-secondary hover:bg-secondary/80 text-xs font-chinese shrink-0"
          >
            <Upload className="size-3.5" aria-hidden="true" />
            <span>上傳頭像</span>
            <input
              id="test-avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                readImageFile(e.target.files?.[0], (url) =>
                  setFormData((prev) => ({ ...prev, avatar: url }))
                )
              }
            />
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onClose} className="h-10 font-chinese">
          取消
        </Button>
        <Button
          type="submit"
          className="h-10 bg-accent-ink text-white hover:bg-accent-ink/90 font-chinese"
        >
          儲存評價
        </Button>
      </div>
    </form>
  )
}

export function TestimonialEditorModal({ isOpen, onClose, testimonial, onSave }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{testimonial ? "編輯評價" : "新增評價"}</DialogTitle>
          <DialogDescription>來自客人的真實回饋</DialogDescription>
        </DialogHeader>
        {isOpen && (
          <TestimonialForm
            key={testimonial?.id || "new-testimonial"}
            testimonial={testimonial}
            onSave={onSave}
            onClose={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  )
}
