import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Coffee, Lock } from "lucide-react"
import { useCoffee } from "@/context/CoffeeContext"
import { cn } from "@/lib/utils"
import { PREMIUM_EASE } from "@/lib/motion"

export const Navbar = () => {
  const { brandSettings } = useCoffee()
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoFailed, setLogoFailed] = useState(false)
  const [prevPath, setPrevPath] = useState(location.pathname)

  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname)
    setIsOpen(false)
  }

  const navLinks = [
    { label: "首頁", path: "/" },
    { label: "商店", path: "/shop" },
    { label: "快閃活動", path: "/flash" },
    { label: "部落格", path: "/blog" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: PREMIUM_EASE }}
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-colors duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border/50 py-2.5"
          : "bg-background/85 backdrop-blur-sm py-3.5 border-b border-border/30"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link
          to="/"
          className="flex items-center gap-3 group rounded-full p-1 transition-opacity hover:opacity-95"
        >
          <motion.div
            whileHover={{ rotate: [0, -8, 8, 0] }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="relative size-10 rounded-full overflow-hidden border-2 border-accent/70 shadow-sm shrink-0 bg-card flex items-center justify-center"
          >
            {brandSettings.logoUrl && !logoFailed ? (
              <img
                src={brandSettings.logoUrl}
                alt={brandSettings.brandName}
                width={40}
                height={40}
                onError={() => setLogoFailed(true)}
                className="size-full object-cover"
              />
            ) : (
              <Coffee className="size-5 text-accent-ink" aria-hidden="true" />
            )}
          </motion.div>
          <div className="flex flex-col">
            <span className="font-display text-xl md:text-2xl font-bold tracking-wider text-foreground group-hover:text-accent-ink transition-colors">
              HERETHERE
            </span>
            <span className="text-[10px] tracking-[0.25em] -mt-1 text-muted-foreground uppercase">
              Coffee Roasters
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="主導覽列" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              link.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(link.path)

            return (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative text-sm tracking-widest font-chinese transition-colors py-2",
                  isActive
                    ? "text-accent-ink font-semibold"
                    : "text-foreground/85 hover:text-accent-ink"
                )}
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ y: -1.5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {link.label}
                </motion.span>
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-ink rounded-full"
                    transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  />
                )}
              </Link>
            )
          })}

          <Link
            to="/admin"
            aria-current={location.pathname === "/admin" ? "page" : undefined}
            className={cn(
              "text-xs flex items-center gap-1.5 transition-colors pl-3 border-l border-border/60 py-2 font-chinese",
              location.pathname === "/admin"
                ? "text-accent-ink font-semibold"
                : "text-muted-foreground hover:text-accent-ink"
            )}
          >
            <Lock className="size-3.5" aria-hidden="true" />
            <span>管理後台</span>
          </Link>
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="size-11 flex items-center justify-center text-foreground hover:text-accent-ink hover:bg-secondary/50 rounded-md transition-colors"
            aria-label={isOpen ? "關閉導覽選單" : "開啟導覽選單"}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="size-6" aria-hidden="true" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="size-6" aria-hidden="true" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-nav-menu"
            aria-label="行動版導覽選單"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: PREMIUM_EASE }}
            className="md:hidden overflow-hidden bg-background border-b border-border shadow-lg"
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, idx) => {
                const isActive =
                  link.path === "/"
                    ? location.pathname === "/"
                    : location.pathname.startsWith(link.path)

                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * idx, duration: 0.25, ease: PREMIUM_EASE }}
                  >
                    <Link
                      to={link.path}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "min-h-[44px] text-base tracking-widest py-2.5 transition-colors font-chinese flex items-center justify-between border-b border-border/30",
                        isActive
                          ? "text-accent-ink font-semibold"
                          : "text-foreground/85 hover:text-accent-ink"
                      )}
                    >
                      <span>{link.label}</span>
                      {isActive && (
                        <span className="size-2 rounded-full bg-accent-ink" aria-hidden="true" />
                      )}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.25, ease: PREMIUM_EASE }}
              >
                <Link
                  to="/admin"
                  aria-current={location.pathname === "/admin" ? "page" : undefined}
                  className="min-h-[44px] text-sm text-muted-foreground hover:text-accent-ink flex items-center gap-2 pt-2 font-chinese"
                >
                  <Lock className="size-4 text-accent-ink" aria-hidden="true" />
                  <span>品牌管理後台</span>
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
