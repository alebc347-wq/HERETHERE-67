import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { Zap, MapPin, ArrowRight, Coffee, Clock } from "lucide-react"
import moment from "moment"
import { useCoffee } from "@/context/CoffeeContext"
import { Badge } from "@/components/ui/badge"
import { AnimatedCountdownDigit } from "@/components/motion/CoffeeMotion"
import { PREMIUM_EASE, clipRevealUp } from "@/lib/motion"

function computeCountdown(event) {
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

  let targetTime
  let currentStatus

  if (now.isBetween(start, end)) {
    targetTime = end
    currentStatus = "active"
  } else if (now.isBefore(start)) {
    targetTime = start
    currentStatus = "upcoming"
  } else {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      status: "ended",
    }
  }

  const diffDuration = moment.duration(targetTime.diff(now))
  if (diffDuration.asMilliseconds() <= 0) {
    return {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      status: "ended",
    }
  }

  return {
    days: String(Math.floor(diffDuration.asDays())).padStart(2, "0"),
    hours: String(diffDuration.hours()).padStart(2, "0"),
    minutes: String(diffDuration.minutes()).padStart(2, "0"),
    seconds: String(diffDuration.seconds()).padStart(2, "0"),
    status: currentStatus,
  }
}

export const FlashEventPreview = () => {
  const { flashEvents } = useCoffee()
  const event = flashEvents.find((e) => e.is_active) || flashEvents[0]
  const [timeLeft, setTimeLeft] = useState(() => computeCountdown(event))

  useEffect(() => {
    if (!event) return
    const timer = setInterval(() => {
      setTimeLeft(computeCountdown(event))
    }, 1000)
    return () => clearInterval(timer)
  }, [event])

  if (!event) {
    return null
  }

  const startDateFormatted = moment(event.event_start).format("YYYY.MM.DD")
  const endDateFormatted = moment(event.event_end).format("MM.DD")
  const displayImage = event.images?.[0]

  return (
    <section className="py-20 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
            className="flex flex-col items-center gap-2.5"
          >
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent-ink font-semibold text-xs tracking-wider"
            >
              <Zap className="size-3.5 fill-current" aria-hidden="true" />
              <span>POP-UP STORE</span>
            </motion.div>

            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              快閃活動
            </h2>

            <p className="font-chinese text-sm md:text-base font-medium text-foreground/85 flex items-center gap-2 mt-1">
              {timeLeft.status === "active" ? (
                <span className="text-rose-700 dark:text-rose-400 font-semibold inline-flex items-center gap-1.5">
                  <motion.span
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                    className="inline-block"
                  >
                    🔴
                  </motion.span>
                  <span>活動現正進行中</span>
                </span>
              ) : (
                <span>📅 下一場活動即將登場</span>
              )}
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: PREMIUM_EASE }}
          className="rounded-2xl border border-border bg-card overflow-hidden shadow-md grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left: Event Image with Curtain Reveal */}
          <motion.div
            variants={clipRevealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="lg:col-span-5 relative min-h-[280px] lg:min-h-[420px] bg-secondary overflow-hidden group"
          >
            {displayImage ? (
              <img
                src={displayImage}
                alt={event.title}
                width={900}
                height={700}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="size-full flex items-center justify-center text-muted-foreground/60">
                <Coffee className="size-16" aria-hidden="true" />
              </div>
            )}

            <motion.div
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.35, ease: PREMIUM_EASE }}
              className="absolute top-4 left-4 sm:top-6 sm:left-6"
            >
              <Badge className="bg-background/95 text-foreground font-body border border-border/80 px-3.5 py-1.5 shadow-sm text-xs sm:text-sm font-semibold tracking-wider tabular-nums">
                {startDateFormatted} - {endDateFormatted}
              </Badge>
            </motion.div>
          </motion.div>

          {/* Right: Content & Live Flipping Countdown */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-foreground leading-snug">
                {event.title}
              </h3>

              <p className="text-foreground/80 font-chinese text-sm sm:text-base leading-relaxed">
                {event.description}
              </p>

              <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="flex items-start gap-2.5 text-sm font-chinese text-foreground/90 bg-secondary/45 p-3.5 rounded-lg border border-border/50 mt-1"
              >
                <MapPin className="size-5 text-accent-ink shrink-0 mt-0.5" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="font-semibold text-foreground">{event.location_name}</span>
                  <span className="text-xs text-muted-foreground">{event.address}</span>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-3 pt-4 border-t border-border/50">
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-muted-foreground font-body">
                <Clock className="size-3.5 text-accent-ink" aria-hidden="true" />
                <span>
                  {timeLeft.status === "active"
                    ? "活動倒數結束"
                    : timeLeft.status === "upcoming"
                    ? "距離登場倒數"
                    : "本場活動已結束"}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md">
                {[
                  { label: "DAYS 天", value: timeLeft.days },
                  { label: "HOURS 時", value: timeLeft.hours },
                  { label: "MINS 分", value: timeLeft.minutes },
                  { label: "SECS 秒", value: timeLeft.seconds },
                ].map((item, idx) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 + idx * 0.06, duration: 0.4, ease: PREMIUM_EASE }}
                    className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-lg bg-secondary/60 border border-border/60 text-center"
                  >
                    <AnimatedCountdownDigit
                      value={item.value}
                      className="font-display text-2xl sm:text-4xl font-semibold text-foreground tracking-tight tabular-nums"
                    />
                    <span className="text-[10px] sm:text-xs text-muted-foreground tracking-wider font-body mt-0.5">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-1">
              <Link
                to="/flash"
                className="group inline-flex items-center gap-2 text-sm font-chinese text-accent-ink hover:text-foreground font-semibold tracking-wider transition-colors py-1"
              >
                <span>查看完整活動資訊</span>
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1.5"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
