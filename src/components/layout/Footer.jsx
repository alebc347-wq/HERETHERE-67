import React, { useState } from "react"
import { Link } from "react-router-dom"
import { MessageCircle, Heart, Coffee } from "lucide-react"
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/icons/SocialIcons"
import { useCoffee } from "@/context/CoffeeContext"

const CURRENT_YEAR = new Date().getFullYear()

export const Footer = () => {
  const { brandSettings } = useCoffee()
  const [logoFailed, setLogoFailed] = useState(false)

  return (
    <footer className="bg-[hsl(15_30%_8%)] text-[hsl(30_20%_92%)] border-t border-[hsl(15_25%_18%)] pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-14 border-b border-[hsl(15_25%_20%)]">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full overflow-hidden border-2 border-accent/80 shadow-sm shrink-0 bg-[hsl(15_25%_14%)] flex items-center justify-center">
                {brandSettings.logoUrl && !logoFailed ? (
                  <img
                    src={brandSettings.logoUrl}
                    alt={brandSettings.brandName}
                    width={44}
                    height={44}
                    onError={() => setLogoFailed(true)}
                    className="size-full object-cover"
                  />
                ) : (
                  <Coffee className="size-5 text-accent" aria-hidden="true" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold tracking-wider text-white">
                  {brandSettings.brandName}
                </span>
                <span className="text-xs text-accent tracking-[0.2em] font-medium">
                  {brandSettings.slogan}
                </span>
              </div>
            </div>

            <p className="text-sm text-[hsl(30_15%_80%)] leading-relaxed font-chinese max-w-md pt-1">
              {brandSettings.description}
            </p>

            <p className="text-xs text-[hsl(30_15%_72%)] font-chinese pt-1">
              生豆產地直送 ｜ 自家接單現烘 ｜ 嚴選杯測品管
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h2 className="font-heading text-lg font-medium text-white tracking-wider border-l-2 border-accent pl-3">
              探索導覽
            </h2>
            <ul className="flex flex-col gap-2 text-sm text-[hsl(30_15%_80%)] pt-2 font-chinese">
              <li>
                <Link
                  to="/"
                  className="hover:text-accent transition-colors inline-flex items-center gap-1.5 py-1"
                >
                  <span className="text-accent text-xs" aria-hidden="true">✦</span> 首頁 Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="hover:text-accent transition-colors inline-flex items-center gap-1.5 py-1"
                >
                  <span className="text-accent text-xs" aria-hidden="true">✦</span> 商店 Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/flash"
                  className="hover:text-accent transition-colors inline-flex items-center gap-1.5 py-1"
                >
                  <span className="text-accent text-xs" aria-hidden="true">✦</span> 快閃活動 Pop-up Store
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-accent transition-colors inline-flex items-center gap-1.5 py-1"
                >
                  <span className="text-accent text-xs" aria-hidden="true">✦</span> 部落格 Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Socials & LINE */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <h2 className="font-heading text-lg font-medium text-white tracking-wider border-l-2 border-accent pl-3">
              聯絡我們
            </h2>

            <div className="flex items-center gap-3 pt-1">
              {brandSettings.facebookUrl && (
                <a
                  href={brandSettings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-[hsl(15_25%_16%)] hover:bg-accent text-[hsl(30_20%_92%)] hover:text-primary flex items-center justify-center transition-colors duration-200"
                  aria-label="前往 HERETHERE COFFEE Facebook 官方專頁（另開新視窗）"
                >
                  <FacebookIcon className="size-4" aria-hidden="true" />
                </a>
              )}
              {brandSettings.instagramUrl && (
                <a
                  href={brandSettings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-[hsl(15_25%_16%)] hover:bg-accent text-[hsl(30_20%_92%)] hover:text-primary flex items-center justify-center transition-colors duration-200"
                  aria-label="前往 HERETHERE COFFEE Instagram 官方專頁（另開新視窗）"
                >
                  <InstagramIcon className="size-4" aria-hidden="true" />
                </a>
              )}
              {brandSettings.youtubeUrl && (
                <a
                  href={brandSettings.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="size-10 rounded-full bg-[hsl(15_25%_16%)] hover:bg-accent text-[hsl(30_20%_92%)] hover:text-primary flex items-center justify-center transition-colors duration-200"
                  aria-label="前往 HERETHERE COFFEE YouTube 官方頻道（另開新視窗）"
                >
                  <YoutubeIcon className="size-4" aria-hidden="true" />
                </a>
              )}
            </div>

            <div className="bg-[hsl(15_25%_13%)] border border-[hsl(15_25%_22%)] rounded-lg p-3.5 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <MessageCircle className="size-3.5" aria-hidden="true" />
                <span>LINE 官方客服帳號</span>
              </div>
              <p className="leading-relaxed font-chinese text-[hsl(30_15%_80%)]">
                {brandSettings.lineInstructions}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[hsl(30_15%_72%)] gap-4 font-chinese">
          <p className="tabular-nums">© {CURRENT_YEAR} {brandSettings.brandName}. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="size-3 text-accent fill-accent" aria-hidden="true" /> for coffee lovers
            </span>
            <span className="text-[hsl(30_15%_35%)]" aria-hidden="true">|</span>
            <Link
              to="/admin"
              className="text-[hsl(30_15%_80%)] hover:text-accent transition-colors underline underline-offset-4 py-1"
            >
              管理後台
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
