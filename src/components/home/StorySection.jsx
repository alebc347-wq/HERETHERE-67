import React from "react"
import { motion } from "framer-motion"
import { useCoffee } from "@/context/CoffeeContext"
import { PREMIUM_EASE } from "@/lib/motion"

const STORY_PARAGRAPHS = [
  "在咖啡的浩瀚地圖裡，每顆果實都在高海拔的雲霧與火山土壤中默默積蓄風味。HERETHERE 誕生於一個單純的執念：我們希望把這些遙遠山野裡的自然餽贈，毫無保留地封存在每一杯咖啡裡。",
  "我們親自走訪世界各地的獨立咖啡莊園，與致力於永續栽種的小農攜手合作。從嚴格的手工採摘熟果、精密控制的微批次後製處理，到回歸烘焙工坊後的杯測修正，每一步都是為了發掘咖啡豆最細緻的風土個性。",
  "咖啡不只是提神的日常飲品，它更是一條看不見的絲線，連接起產地的風土陽光與你此刻的寧靜片刻。無論你身處何地，只要輕嗅手沖壺騰起的香氣，旅程就已然展開。",
]

export const StorySection = () => {
  const { brandSettings } = useCoffee()

  return (
    <section id="story" className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: PREMIUM_EASE }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-accent-ink" aria-hidden="true" />
              <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-accent-ink font-semibold">
                OUR STORY
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-tight">
              每一粒咖啡豆，
              <br className="hidden sm:inline" />
              都是一段旅程
            </h2>

            <div className="flex flex-col gap-4 text-foreground/85 font-chinese text-base md:text-lg leading-relaxed pt-2 max-w-[65ch]">
              {STORY_PARAGRAPHS.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: 0.12 + index * 0.08,
                    ease: PREMIUM_EASE,
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.4, ease: PREMIUM_EASE }}
              className="text-lg md:text-xl font-chinese italic text-accent-ink font-medium pt-2 border-l-2 border-accent pl-4"
            >
              從 Here 到 There，讓咖啡陪伴每一段旅程。
            </motion.p>
          </motion.div>

          {/* Right Image Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: PREMIUM_EASE }}
            className="lg:col-span-5 relative"
          >
            <div
              className="hidden sm:block absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full border-2 border-accent/60 rounded-lg pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative z-10 overflow-hidden rounded-lg shadow-xl aspect-[4/5] bg-secondary/30 group">
              <img
                src={brandSettings.storyBgUrl}
                alt="HERETHERE 咖啡莊園種植園實景"
                width={800}
                height={1000}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none"
                aria-hidden="true"
              />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-md bg-background/95 border border-border/60 shadow-sm">
                <p className="font-heading text-xs uppercase tracking-widest text-accent-ink font-semibold">
                  Estate Direct
                </p>
                <p className="font-chinese text-xs text-foreground/85 mt-0.5">
                  尋訪全球卓越微型產區，尊重每一位土地耕耘者
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
