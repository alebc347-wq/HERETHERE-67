import React, { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence, MotionConfig } from "framer-motion"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Home } from "@/pages/Home"
import { Shop } from "@/pages/Shop"
import { Blog } from "@/pages/Blog"
import { BlogPostDetail } from "@/pages/BlogPostDetail"
import { Flash } from "@/pages/Flash"
import { Admin } from "@/pages/Admin"

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" })
  }, [pathname])
  return null
}

export function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-accent/20 selection:text-foreground">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground focus:shadow-lg font-chinese text-sm"
        >
          跳至主要內容
        </a>
        <ScrollToTop />
        <Navbar />

        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <AnimatePresence
            mode="wait"
            onExitComplete={() => window.scrollTo({ top: 0, behavior: "auto" })}
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPostDetail />} />
              <Route path="/flash" element={<Flash />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  )
}

export default App
