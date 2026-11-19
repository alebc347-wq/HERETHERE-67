import React, { useState } from "react"
import { motion } from "framer-motion"
import {
  FileText,
  Package,
  MessageSquareQuote,
  Zap,
  Settings,
  Users,
  KeyRound,
  Plus,
  Trash2,
  Edit2,
  Check,
  RotateCcw,
  Eye,
  EyeOff,
  LogOut,
  Copy,
} from "lucide-react"
import moment from "moment"
import { useCoffee } from "@/context/CoffeeContext"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLoginGate } from "@/components/admin/AdminLoginGate"
import { AdminBrandPanel } from "@/components/admin/AdminBrandPanel"
import { AdminSecurityPanel } from "@/components/admin/AdminSecurityPanel"
import {
  ConfirmActionDialog,
  BlogPostEditorModal,
  ProductEditorModal,
  EventEditorModal,
  TestimonialEditorModal,
} from "@/components/admin/AdminModals"
import { pageTransition } from "@/lib/motion"

function EmptyTabState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <Card className="p-12 text-center border-dashed border-border bg-card/50 flex flex-col items-center gap-3">
      <div className="size-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-xs sm:text-sm text-muted-foreground font-chinese max-w-md">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button
          type="button"
          onClick={onAction}
          className="mt-2 h-10 bg-accent-ink hover:bg-accent-ink/90 text-white font-chinese gap-1.5"
        >
          <Plus className="size-4" aria-hidden="true" />
          <span>{actionLabel}</span>
        </Button>
      )}
    </Card>
  )
}

export const Admin = () => {
  const {
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    flashEvents,
    addFlashEvent,
    updateFlashEvent,
    deleteFlashEvent,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    subscribers,
    removeSubscriber,
    resetToDefault,
    isAdminAuthenticated,
    logoutAdmin,
  } = useCoffee()

  const [postModal, setPostModal] = useState({ isOpen: false, item: null })
  const [productModal, setProductModal] = useState({ isOpen: false, item: null })
  const [eventModal, setEventModal] = useState({ isOpen: false, item: null })
  const [testimonialModal, setTestimonialModal] = useState({ isOpen: false, item: null })
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmLabel: "確認刪除",
    onConfirm: () => {},
  })
  const [copiedEmails, setCopiedEmails] = useState(false)

  if (!isAdminAuthenticated) {
    return <AdminLoginGate />
  }

  const openDeleteConfirm = (title, description, onConfirm) => {
    setConfirmState({
      isOpen: true,
      title,
      description,
      confirmLabel: "確認刪除",
      onConfirm,
    })
  }

  const handleCopySubscribers = () => {
    if (subscribers.length === 0) return
    const emails = subscribers.map((s) => s.email).join("\n")
    navigator.clipboard.writeText(emails)
    setCopiedEmails(true)
    setTimeout(() => setCopiedEmails(false), 2500)
  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="pt-28 pb-24 min-h-screen bg-background"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-border">
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-semibold text-foreground tracking-tight">
              HERETHERE 品牌管理後台
            </h1>
            <p className="text-xs md:text-sm text-muted-foreground font-chinese mt-1">
              管理文章、商品、快閃活動、評語、品牌視覺與後台密碼。變更即時儲存於本機瀏覽器。
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() =>
                setConfirmState({
                  isOpen: true,
                  title: "恢復範例預設資料",
                  description:
                    "確定要恢復預設範例文章、商品、活動與品牌設定嗎？此操作不會重設您的管理員密碼。",
                  confirmLabel: "確認恢復",
                  onConfirm: () => {
                    resetToDefault()
                  },
                })
              }
              className="h-10 text-xs font-chinese gap-1.5 text-muted-foreground hover:text-destructive"
            >
              <RotateCcw className="size-3.5" aria-hidden="true" />
              <span>恢復範例資料</span>
            </Button>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={logoutAdmin}
              className="h-10 text-xs font-chinese gap-1.5"
            >
              <LogOut className="size-3.5" aria-hidden="true" />
              <span>登出鎖定</span>
            </Button>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full flex flex-wrap lg:flex-nowrap justify-start h-auto gap-1 p-1.5 bg-secondary/50 rounded-xl mb-8 border border-border/50 overflow-x-auto">
            <TabsTrigger
              value="posts"
              className="gap-1.5 px-3 py-2 font-chinese text-xs sm:text-[13px]"
            >
              <FileText className="size-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">文章管理 ({blogPosts.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="products"
              className="gap-1.5 px-3 py-2 font-chinese text-xs sm:text-[13px]"
            >
              <Package className="size-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">商品管理 ({products.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="gap-1.5 px-3 py-2 font-chinese text-xs sm:text-[13px]"
            >
              <Zap className="size-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">快閃活動 ({flashEvents.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="testimonials"
              className="gap-1.5 px-3 py-2 font-chinese text-xs sm:text-[13px]"
            >
              <MessageSquareQuote className="size-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">評語管理 ({testimonials.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="subscribers"
              className="gap-1.5 px-3 py-2 font-chinese text-xs sm:text-[13px]"
            >
              <Users className="size-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">訂閱者 ({subscribers.length})</span>
            </TabsTrigger>
            <TabsTrigger
              value="brand"
              className="gap-1.5 px-3 py-2 font-chinese text-xs sm:text-[13px]"
            >
              <Settings className="size-4 shrink-0" aria-hidden="true" />
              <span>品牌設定</span>
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="gap-1.5 px-3 py-2 font-chinese text-xs sm:text-[13px]"
            >
              <KeyRound className="size-4 shrink-0" aria-hidden="true" />
              <span>帳號安全</span>
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: 文章管理 */}
          <TabsContent value="posts">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-semibold">文章列表</h2>
              <Button
                type="button"
                onClick={() => setPostModal({ isOpen: true, item: null })}
                className="h-10 gap-2 font-chinese bg-accent-ink hover:bg-accent-ink/90 text-white"
              >
                <Plus className="size-4" aria-hidden="true" />
                <span>新增文章</span>
              </Button>
            </div>

            {blogPosts.length === 0 ? (
              <EmptyTabState
                icon={FileText}
                title="目前沒有任何文章"
                description="新增第一篇品牌故事、手沖知識或產區介紹，發布後將顯示於首頁與部落格頁面。"
                actionLabel="新增第一篇文章"
                onAction={() => setPostModal({ isOpen: true, item: null })}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="aspect-[16/9] bg-secondary relative overflow-hidden">
                        {post.cover_image && (
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="size-full object-cover"
                          />
                        )}
                        <div className="absolute top-2 left-2 flex gap-1.5">
                          <Badge variant="subtle" className="text-xs font-chinese">
                            {post.category}
                          </Badge>
                          <Badge
                            variant={post.is_published ? "default" : "secondary"}
                            className="text-xs font-chinese"
                          >
                            {post.is_published ? "已發布" : "草稿"}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader className="p-4">
                        <CardTitle className="text-base line-clamp-1">{post.title}</CardTitle>
                        <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                          {post.summary}
                        </p>
                      </CardHeader>
                    </div>

                    <div className="p-4 pt-0 border-t border-border/40 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground font-body tabular-nums">
                        {moment(post.created_at).format("YYYY.MM.DD")}
                      </span>

                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-9 text-muted-foreground hover:text-accent-ink"
                          onClick={() =>
                            updateBlogPost(post.id, { is_published: !post.is_published })
                          }
                          aria-label={
                            post.is_published
                              ? `將「${post.title}」轉為草稿`
                              : `發布「${post.title}」`
                          }
                          title={post.is_published ? "轉為草稿" : "發布文章"}
                        >
                          {post.is_published ? (
                            <Eye className="size-4" aria-hidden="true" />
                          ) : (
                            <EyeOff
                              className="size-4 text-muted-foreground/70"
                              aria-hidden="true"
                            />
                          )}
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-9 text-muted-foreground hover:text-foreground"
                          onClick={() => setPostModal({ isOpen: true, item: post })}
                          aria-label={`編輯文章「${post.title}」`}
                        >
                          <Edit2 className="size-4" aria-hidden="true" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            openDeleteConfirm(
                              "刪除文章",
                              `確定要永久刪除文章「${post.title}」嗎？`,
                              () => deleteBlogPost(post.id)
                            )
                          }
                          aria-label={`刪除文章「${post.title}」`}
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 2: 商品管理 */}
          <TabsContent value="products">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-semibold">商品列表</h2>
              <Button
                type="button"
                onClick={() => setProductModal({ isOpen: true, item: null })}
                className="h-10 gap-2 font-chinese bg-accent-ink hover:bg-accent-ink/90 text-white"
              >
                <Plus className="size-4" aria-hidden="true" />
                <span>新增商品</span>
              </Button>
            </div>

            {products.length === 0 ? (
              <EmptyTabState
                icon={Package}
                title="目前尚未建立商品"
                description="新增您的咖啡豆、濾掛包或沖煮器具，設定價格與風味筆記後即可於商店展示。"
                actionLabel="新增第一項商品"
                onAction={() => setProductModal({ isOpen: true, item: null })}
              />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="overflow-hidden flex flex-col justify-between">
                    <div>
                      <div className="aspect-[3/4] bg-secondary relative overflow-hidden">
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="size-full object-cover"
                          />
                        )}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          <Badge variant="subtle" className="text-xs font-chinese">
                            {product.category}
                          </Badge>
                          {!product.is_available && (
                            <Badge variant="destructive" className="text-xs font-chinese">
                              補貨中
                            </Badge>
                          )}
                        </div>
                      </div>

                      <CardHeader className="p-4">
                        <CardTitle className="text-base line-clamp-1">{product.name}</CardTitle>
                        <p className="text-sm font-bold text-accent-ink font-display mt-1 tabular-nums">
                          NT$ {product.price?.toLocaleString()}
                        </p>
                      </CardHeader>
                    </div>

                    <div className="p-4 pt-0 border-t border-border/40 flex items-center justify-between text-xs">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          updateProduct(product.id, { is_available: !product.is_available })
                        }
                        className={`h-9 text-xs font-chinese ${
                          product.is_available
                            ? "text-emerald-700 dark:text-emerald-400"
                            : "text-amber-700 dark:text-amber-400"
                        }`}
                      >
                        {product.is_available ? "販售中" : "已下架"}
                      </Button>

                      <div className="flex items-center gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-9 text-muted-foreground hover:text-foreground"
                          onClick={() => setProductModal({ isOpen: true, item: product })}
                          aria-label={`編輯商品「${product.name}」`}
                        >
                          <Edit2 className="size-4" aria-hidden="true" />
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="size-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() =>
                            openDeleteConfirm(
                              "刪除商品",
                              `確定要永久刪除商品「${product.name}」嗎？`,
                              () => deleteProduct(product.id)
                            )
                          }
                          aria-label={`刪除商品「${product.name}」`}
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 3: 快閃活動 */}
          <TabsContent value="events">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-semibold">快閃活動列表</h2>
              <Button
                type="button"
                onClick={() => setEventModal({ isOpen: true, item: null })}
                className="h-10 gap-2 font-chinese bg-accent-ink hover:bg-accent-ink/90 text-white"
              >
                <Plus className="size-4" aria-hidden="true" />
                <span>新增快閃活動</span>
              </Button>
            </div>

            {flashEvents.length === 0 ? (
              <EmptyTabState
                icon={Zap}
                title="目前尚未建立快閃活動"
                description="設定即將登場的 Pop-up Store 時間、地點與圖片，首頁將自動顯示即時倒數計時器。"
                actionLabel="建立快閃活動"
                onAction={() => setEventModal({ isOpen: true, item: null })}
              />
            ) : (
              <div className="flex flex-col gap-6">
                {flashEvents.map((event) => (
                  <Card key={event.id} className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      <div className="w-full lg:w-64 aspect-[16/10] bg-secondary rounded-lg overflow-hidden shrink-0">
                        {event.images?.[0] ? (
                          <img
                            src={event.images[0]}
                            alt={event.title}
                            className="size-full object-cover"
                          />
                        ) : (
                          <div className="size-full flex items-center justify-center text-muted-foreground text-xs">
                            尚未設定圖片
                          </div>
                        )}
                      </div>

                      <div className="flex-1 flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={event.is_active ? "accent" : "secondary"}>
                            {event.is_active ? "使用中" : "已停用"}
                          </Badge>
                          <span className="text-xs text-muted-foreground font-body tabular-nums">
                            {moment(event.event_start).format("YYYY.MM.DD HH:mm")} ~{" "}
                            {moment(event.event_end).format("YYYY.MM.DD HH:mm")}
                          </span>
                        </div>

                        <h3 className="font-heading text-xl font-semibold">{event.title}</h3>
                        <p className="text-sm text-foreground/80 font-chinese leading-relaxed">
                          {event.description}
                        </p>
                        <p className="text-xs text-muted-foreground font-chinese">
                          地點：{event.location_name}（{event.address}）
                        </p>
                      </div>

                      <div className="flex flex-wrap lg:flex-col gap-2 shrink-0">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            updateFlashEvent(event.id, { is_active: !event.is_active })
                          }
                          className="h-9 text-xs font-chinese"
                        >
                          {event.is_active ? "設為停用" : "設為啟用"}
                        </Button>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          onClick={() => setEventModal({ isOpen: true, item: event })}
                          className="h-9 text-xs font-chinese"
                        >
                          編輯
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            openDeleteConfirm(
                              "刪除快閃活動",
                              `確定要刪除快閃活動「${event.title}」嗎？`,
                              () => deleteFlashEvent(event.id)
                            )
                          }
                          className="h-9 text-xs text-destructive hover:bg-destructive/10 font-chinese"
                        >
                          刪除
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 4: 評語管理 */}
          <TabsContent value="testimonials">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-xl font-semibold">顧客評價列表</h2>
              <Button
                type="button"
                onClick={() => setTestimonialModal({ isOpen: true, item: null })}
                className="h-10 gap-2 font-chinese bg-accent-ink hover:bg-accent-ink/90 text-white"
              >
                <Plus className="size-4" aria-hidden="true" />
                <span>新增評價</span>
              </Button>
            </div>

            {testimonials.length === 0 ? (
              <EmptyTabState
                icon={MessageSquareQuote}
                title="目前尚未建立顧客評價"
                description="新增真實的咖啡愛好者心得，設為「前端顯示」後將呈現於首頁評語區塊。"
                actionLabel="新增顧客評價"
                onAction={() => setTestimonialModal({ isOpen: true, item: null })}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t) => (
                  <Card key={t.id} className="p-5 flex flex-col justify-between">
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400"
                          aria-label={`${t.rating || 5} 顆星評價`}
                        >
                          <span aria-hidden="true">
                            {"★".repeat(t.rating || 5)}
                            {"☆".repeat(Math.max(0, 5 - (t.rating || 5)))}
                          </span>
                        </div>
                        <Badge variant={t.is_visible ? "default" : "secondary"}>
                          {t.is_visible ? "前端顯示" : "已隱藏"}
                        </Badge>
                      </div>

                      <p className="font-chinese text-sm italic text-foreground/85">
                        「{t.content}」
                      </p>

                      <div className="text-xs text-muted-foreground font-chinese">
                        <span className="font-semibold text-foreground">{t.name}</span> · 購買：
                        {t.product}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border/40 flex items-center justify-end gap-1.5">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => updateTestimonial(t.id, { is_visible: !t.is_visible })}
                        className="h-9 text-xs font-chinese"
                      >
                        {t.is_visible ? "隱藏" : "顯示"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setTestimonialModal({ isOpen: true, item: t })}
                        className="h-9 text-xs font-chinese"
                      >
                        編輯
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          openDeleteConfirm(
                            "刪除評價",
                            `確定要刪除來自「${t.name}」的評價嗎？`,
                            () => deleteTestimonial(t.id)
                          )
                        }
                        className="h-9 text-xs text-destructive hover:bg-destructive/10 font-chinese"
                      >
                        刪除
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* TAB 5: 訂閱者名單 */}
          <TabsContent value="subscribers">
            <Card className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <h2 className="font-heading text-xl font-semibold">電子報訂閱者名單</h2>
                  <p className="text-xs text-muted-foreground font-chinese tabular-nums">
                    共 {subscribers.length} 位訂閱會員，支援一鍵複製全部電子郵件地址。
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span role="status" aria-live="polite" className="text-xs text-emerald-700 dark:text-emerald-400 font-chinese">
                    {copiedEmails ? "已複製所有信箱至剪貼簿" : ""}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleCopySubscribers}
                    disabled={subscribers.length === 0}
                    className="h-10 font-chinese text-xs gap-1.5"
                  >
                    {copiedEmails ? (
                      <>
                        <Check className="size-3.5 text-emerald-600" aria-hidden="true" />
                        <span>已複製</span>
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" aria-hidden="true" />
                        <span>複製所有信箱</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {subscribers.length === 0 ? (
                <div className="py-12 text-center border border-dashed border-border rounded-lg">
                  <p className="font-chinese text-sm text-muted-foreground">
                    目前尚無訂閱者，當訪客於首頁訂閱電子報時會顯示於此處。
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm font-chinese">
                    <thead className="border-b border-border text-xs text-muted-foreground uppercase font-body">
                      <tr>
                        <th scope="col" className="py-3 px-4">
                          訂閱者信箱
                        </th>
                        <th scope="col" className="py-3 px-4">
                          訂閱日期
                        </th>
                        <th scope="col" className="py-3 px-4">
                          狀態
                        </th>
                        <th scope="col" className="py-3 px-4 text-right">
                          操作
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/40">
                      {subscribers.map((sub) => (
                        <tr key={sub.id} className="hover:bg-secondary/20">
                          <td className="py-3.5 px-4 font-body font-medium">{sub.email}</td>
                          <td className="py-3.5 px-4 text-xs text-muted-foreground font-body tabular-nums">
                            {moment(sub.subscribed_at).format("YYYY-MM-DD HH:mm")}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              已訂閱
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                openDeleteConfirm(
                                  "移除訂閱者",
                                  `確定要移除訂閱信箱「${sub.email}」嗎？`,
                                  () => removeSubscriber(sub.id)
                                )
                              }
                              className="h-9 text-xs text-destructive hover:bg-destructive/10 font-chinese"
                            >
                              移除
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* TAB 6: 品牌設定 */}
          <TabsContent value="brand">
            <AdminBrandPanel />
          </TabsContent>

          {/* TAB 7: 帳號安全 (修改密碼) */}
          <TabsContent value="security">
            <AdminSecurityPanel />
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation & Entity Modals */}
      <ConfirmActionDialog
        isOpen={confirmState.isOpen}
        onClose={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmState.onConfirm}
        title={confirmState.title}
        description={confirmState.description}
        confirmLabel={confirmState.confirmLabel}
      />

      <BlogPostEditorModal
        isOpen={postModal.isOpen}
        onClose={() => setPostModal({ isOpen: false, item: null })}
        post={postModal.item}
        onSave={(data) => {
          if (postModal.item?.id) {
            updateBlogPost(postModal.item.id, data)
          } else {
            addBlogPost(data)
          }
          setPostModal({ isOpen: false, item: null })
        }}
      />

      <ProductEditorModal
        isOpen={productModal.isOpen}
        onClose={() => setProductModal({ isOpen: false, item: null })}
        product={productModal.item}
        onSave={(data) => {
          if (productModal.item?.id) {
            updateProduct(productModal.item.id, data)
          } else {
            addProduct(data)
          }
          setProductModal({ isOpen: false, item: null })
        }}
      />

      <EventEditorModal
        isOpen={eventModal.isOpen}
        onClose={() => setEventModal({ isOpen: false, item: null })}
        event={eventModal.item}
        onSave={(data) => {
          if (eventModal.item?.id) {
            updateFlashEvent(eventModal.item.id, data)
          } else {
            addFlashEvent(data)
          }
          setEventModal({ isOpen: false, item: null })
        }}
      />

      <TestimonialEditorModal
        isOpen={testimonialModal.isOpen}
        onClose={() => setTestimonialModal({ isOpen: false, item: null })}
        testimonial={testimonialModal.item}
        onSave={(data) => {
          if (testimonialModal.item?.id) {
            updateTestimonial(testimonialModal.item.id, data)
          } else {
            addTestimonial(data)
          }
          setTestimonialModal({ isOpen: false, item: null })
        }}
      />
    </motion.div>
  )
}
