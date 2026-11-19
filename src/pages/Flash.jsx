import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Zap,
  MapPin,
  ExternalLink,
  Calendar,
  Clock,
  Sparkles,
  Gift,
  Coffee,
} from "lucide-react"
import moment from "moment"
import { useCoffee } from "@/context/CoffeeContext"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { pageTransition, PREMIUM_EASE } from "@/lib/motion"

function calculateEventCountdown(event) {
  if (!event) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      status: "upcoming",
    }
  }
  const now = moment()
  const start = moment(event.event_start)
  const end = moment(event.event_end)

  let target
  let status

  if (now.isBetween(start, end)) {
    target = end
    status = "active"
  } else if (now.isBefore(start)) {
    target = start
    status = "upcoming"
  } else {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      status: "ended",
    }
  }

  const diff = moment.duration(target.diff(now))
  if (diff.asMilliseconds() <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      status: "ended",
    }
  }

  return {
    days: String(Math.floor(diff.asDays())).padStart(2, "0"),
    hours: String(diff.hours()).padStart(2, "0"),
    minutes: String(diff.minutes()).padStart(2, "0"),
    seconds: String(diff.seconds()).padStart(2, "0"),
    status,
  }
}

export const Flash = () => {
  const { flashEvents } = useCoffee()
  const [selectedEventId, setSelectedEventId] = useState(flashEvents[0]?.id || null)

  const activeEvent = flashEvents.find((e) => e.id === selectedEventId) || flashEvents[0]
  const [timeLeft, setTimeLeft] = useState(() => calculateEventCountdown(activeEvent))

  useEffect(() => {
    if (!activeEvent) return
    const interval = setInterval(() => {
      setTimeLeft(calculateEventCountdown(activeEvent))
    }, 1000)
    return () => clearInterval(interval)
  }, [activeEvent])

  if (!activeEvent) {
    return (
      <div className="pt-36 pb-24 text-center min-h-screen">
        <p className="font-chinese text-muted-foreground">目前暫無快閃活動資訊。</p>
      </div>
    )
  }

  const startFormatted = moment(activeEvent.event_start).format("YYYY 年 MM 月 DD 日 HH:mm")
  const endFormatted = moment(activeEvent.event_end).format("YYYY 年 MM 月 DD 日 HH:mm")

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
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
            className="flex flex-col items-center gap-2"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent-ink font-semibold text-xs tracking-wider">
              <Zap className="size-3.5 fill-current" aria-hidden="true" />
              <span>POP-UP STORE EVENT</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground tracking-tight">
              快閃活動 ｜ 現場限定體驗
            </h1>

            <p className="font-chinese text-sm sm:text-base text-foreground/80 max-w-xl mt-1 leading-relaxed">
              把工坊的手沖吧台與極限量微批次豆款打包成箱，與你在城市的一隅相聚。
            </p>
          </motion.div>
        </div>

        {/* Event Selector if multiple events */}
        {flashEvents.length > 1 && (
          <div
            role="group"
            aria-label="選擇快閃活動場次"
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {flashEvents.map((e) => {
              const isSelected = activeEvent.id === e.id
              return (
                <button
                  key={e.id}
                  type="button"
                  onClick={() => {
                    setSelectedEventId(e.id)
                    setTimeLeft(calculateEventCountdown(e))
                  }}
                  aria-pressed={isSelected}
                  className={`min-h-[44px] px-4 py-2 rounded-full text-xs sm:text-sm font-chinese transition-colors duration-200 ${
                    isSelected
                      ? "bg-accent-ink text-white font-medium shadow-sm"
                      : "bg-secondary text-foreground/85 hover:bg-secondary/80"
                  }`}
                >
                  {e.title.slice(0, 22)}...
                </button>
              )
            })}
          </div>
        )}

        {/* Main Event Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Image Gallery & Highlights */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-2xl overflow-hidden border border-border shadow-md aspect-[16/10] bg-secondary relative">
              {activeEvent.images?.[0] ? (
                <img
                  src={activeEvent.images[0]}
                  alt={activeEvent.title}
                  width={1200}
                  height={750}
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full flex items-center justify-center text-muted-foreground/50">
                  <Coffee className="size-16" aria-hidden="true" />
                </div>
              )}

              <div className="absolute top-4 left-4">
                <Badge className="bg-background/95 text-foreground font-chinese px-3.5 py-1.5 shadow-sm">
                  {timeLeft.status === "active"
                    ? "🔴 現正舉辦中"
                    : timeLeft.status === "upcoming"
                    ? "📅 即將登場"
                    : "活動已圓滿落幕"}
                </Badge>
              </div>
            </div>

            {activeEvent.images && activeEvent.images.length > 1 && (
              <div className="grid grid-cols-2 gap-4">
                {activeEvent.images.slice(1, 3).map((imgUrl, idx) => (
                  <div
                    key={imgUrl}
                    className="rounded-xl overflow-hidden border border-border/80 aspect-[16/10] bg-secondary shadow-sm group"
                  >
                    <img
                      src={imgUrl}
                      alt={`${activeEvent.title} 活動剪影 ${idx + 1}`}
                      width={600}
                      height={375}
                      loading="lazy"
                      className="size-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-card border border-border/70 flex flex-col gap-2">
                <Sparkles className="size-5 text-accent-ink" aria-hidden="true" />
                <h3 className="font-heading font-semibold text-sm text-foreground">
                  競標批次手沖
                </h3>
                <p className="text-xs text-muted-foreground font-chinese">
                  現場限量供應未公開上市的稀有高海拔單品。
                </p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/70 flex flex-col gap-2">
                <Coffee className="size-5 text-accent-ink" aria-hidden="true" />
                <h3 className="font-heading font-semibold text-sm text-foreground">
                  感官盲測體驗
                </h3>
                <p className="text-xs text-muted-foreground font-chinese">
                  由專屬杯測師引導，辨識花香、果酸與發酵層次。
                </p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border/70 flex flex-col gap-2">
                <Gift className="size-5 text-accent-ink" aria-hidden="true" />
                <h3 className="font-heading font-semibold text-sm text-foreground">
                  快閃限定伴手禮
                </h3>
                <p className="text-xs text-muted-foreground font-chinese">
                  現場消費滿千即贈限定手沖試飲包與設計提袋。
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Event Details & Action Box */}
          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            <Card className="rounded-2xl border-border bg-card shadow-md p-6 sm:p-8 flex flex-col gap-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-accent-ink font-semibold font-body">
                  POP-UP DETAILS
                </span>
                <h2 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground mt-1 leading-snug">
                  {activeEvent.title}
                </h2>
              </div>

              <div className="rounded-xl bg-secondary/55 p-4 border border-border/60 flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-body">
                  <Clock className="size-3.5 text-accent-ink" aria-hidden="true" />
                  <span>
                    {timeLeft.status === "active"
                      ? "活動倒數結束"
                      : timeLeft.status === "upcoming"
                      ? "距離開展倒數"
                      : "本場活動已結束"}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { label: "天", val: timeLeft.days },
                    { label: "時", val: timeLeft.hours },
                    { label: "分", val: timeLeft.minutes },
                    { label: "秒", val: timeLeft.seconds },
                  ].map((t) => (
                    <div
                      key={t.label}
                      className="bg-background rounded-md p-2 border border-border/70 flex flex-col items-center"
                    >
                      <span className="font-display text-2xl font-bold text-accent-ink tabular-nums">
                        {t.val}
                      </span>
                      <span className="text-[11px] text-muted-foreground font-chinese">
                        {t.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-sm text-foreground/85 font-chinese leading-relaxed">
                {activeEvent.description}
              </p>

              <div className="flex flex-col gap-3 text-xs sm:text-sm font-chinese border-t border-border/50 pt-4">
                <div className="flex items-start gap-2.5">
                  <Calendar className="size-4 text-accent-ink shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex flex-col tabular-nums">
                    <span className="font-semibold text-foreground">活動日期與時段</span>
                    <span className="text-muted-foreground">開始：{startFormatted}</span>
                    <span className="text-muted-foreground">結束：{endFormatted}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-2">
                  <MapPin className="size-4 text-accent-ink shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">
                      {activeEvent.location_name}
                    </span>
                    <span className="text-muted-foreground">{activeEvent.address}</span>
                  </div>
                </div>
              </div>

              {activeEvent.map_link && (
                <div className="pt-2">
                  <a
                    href={activeEvent.map_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] h-11 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-chinese text-sm font-medium transition-colors shadow-sm"
                  >
                    <MapPin className="size-4" aria-hidden="true" />
                    <span>在 Google 地圖中開啟導航</span>
                    <ExternalLink className="size-3.5 text-accent" aria-hidden="true" />
                  </a>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
