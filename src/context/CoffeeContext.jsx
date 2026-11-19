import React, { createContext, useContext, useState, useEffect } from "react"
import {
  initialBrandSettings,
  initialBlogPosts,
  initialProducts,
  initialFlashEvents,
  initialTestimonials,
  initialSubscribers,
} from "@/data/mockData"
import { DEFAULT_ADMIN_PASSWORD_HASH, hashPassword } from "@/lib/security"

const STORAGE_KEYS = {
  brand: "herethere_brand_settings",
  posts: "herethere_blog_posts",
  products: "herethere_products",
  events: "herethere_flash_events",
  testimonials: "herethere_testimonials",
  subscribers: "herethere_subscribers",
  adminPwHash: "herethere_admin_pw_hash",
  adminSession: "herethere_admin_session",
}

const CoffeeContext = createContext(null)

function readJsonStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export const CoffeeProvider = ({ children }) => {
  const [brandSettings, setBrandSettings] = useState(() =>
    readJsonStorage(STORAGE_KEYS.brand, initialBrandSettings)
  )
  const [blogPosts, setBlogPosts] = useState(() =>
    readJsonStorage(STORAGE_KEYS.posts, initialBlogPosts)
  )
  const [products, setProducts] = useState(() =>
    readJsonStorage(STORAGE_KEYS.products, initialProducts)
  )
  const [flashEvents, setFlashEvents] = useState(() =>
    readJsonStorage(STORAGE_KEYS.events, initialFlashEvents)
  )
  const [testimonials, setTestimonials] = useState(() =>
    readJsonStorage(STORAGE_KEYS.testimonials, initialTestimonials)
  )
  const [subscribers, setSubscribers] = useState(() =>
    readJsonStorage(STORAGE_KEYS.subscribers, initialSubscribers)
  )

  const [adminPasswordHash, setAdminPasswordHash] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.adminPwHash) || DEFAULT_ADMIN_PASSWORD_HASH
    } catch {
      return DEFAULT_ADMIN_PASSWORD_HASH
    }
  })

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.adminSession) === "authenticated"
    } catch {
      return false
    }
  })

  const isCustomPasswordSet = adminPasswordHash !== DEFAULT_ADMIN_PASSWORD_HASH

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.brand, JSON.stringify(brandSettings))
  }, [brandSettings])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(blogPosts))
  }, [blogPosts])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products))
  }, [products])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(flashEvents))
  }, [flashEvents])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify(testimonials))
  }, [testimonials])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.subscribers, JSON.stringify(subscribers))
  }, [subscribers])

  const verifyAdminPassword = async (password) => {
    if (!password || !password.trim()) {
      return { success: false, message: "請輸入管理員密碼。" }
    }
    const candidateHash = await hashPassword(password)
    if (candidateHash !== adminPasswordHash) {
      return { success: false, message: "密碼錯誤，請再試一次。" }
    }
    try {
      sessionStorage.setItem(STORAGE_KEYS.adminSession, "authenticated")
    } catch {
      // Session storage may be restricted in private browsing modes
    }
    setIsAdminAuthenticated(true)
    return { success: true }
  }

  const changeAdminPassword = async (currentPassword, newPassword) => {
    if (!currentPassword) {
      return { success: false, field: "current", message: "請輸入目前密碼。" }
    }
    const currentHash = await hashPassword(currentPassword)
    if (currentHash !== adminPasswordHash) {
      return { success: false, field: "current", message: "目前密碼不正確。" }
    }
    if (!newPassword || newPassword.length < 4) {
      return { success: false, field: "next", message: "新密碼長度至少需 4 個字元。" }
    }
    if (newPassword === currentPassword) {
      return { success: false, field: "next", message: "新密碼不可與目前密碼相同。" }
    }
    const nextHash = await hashPassword(newPassword)
    try {
      localStorage.setItem(STORAGE_KEYS.adminPwHash, nextHash)
    } catch {
      return { success: false, field: "form", message: "瀏覽器儲存空間無法寫入新密碼。" }
    }
    setAdminPasswordHash(nextHash)
    return { success: true, message: "管理員密碼已成功更新，下次登入請使用新密碼。" }
  }

  const resetAdminPasswordToDefault = async (currentPassword) => {
    const currentHash = await hashPassword(currentPassword || "")
    if (currentHash !== adminPasswordHash) {
      return { success: false, message: "目前密碼不正確，無法重設密碼。" }
    }
    try {
      localStorage.removeItem(STORAGE_KEYS.adminPwHash)
    } catch {
      // Ignore storage restriction
    }
    setAdminPasswordHash(DEFAULT_ADMIN_PASSWORD_HASH)
    return { success: true, message: "已恢復為預設密碼。" }
  }

  const logoutAdmin = () => {
    try {
      sessionStorage.removeItem(STORAGE_KEYS.adminSession)
    } catch {
      // Ignore storage restriction
    }
    setIsAdminAuthenticated(false)
  }

  const updateBrandSettings = (newSettings) => {
    setBrandSettings((prev) => ({ ...prev, ...newSettings }))
  }

  const addBlogPost = (post) => {
    const newPost = {
      ...post,
      id: `post-${Date.now()}`,
      created_at: new Date().toISOString(),
      is_published: post.is_published ?? true,
    }
    setBlogPosts((prev) => [newPost, ...prev])
    return newPost
  }

  const updateBlogPost = (id, updatedFields) => {
    setBlogPosts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    )
  }

  const deleteBlogPost = (id) => {
    setBlogPosts((prev) => prev.filter((item) => item.id !== id))
  }

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: `prod-${Date.now()}`,
      is_available: product.is_available ?? true,
      price: Number(product.price) || 0,
      flavor_notes: Array.isArray(product.flavor_notes)
        ? product.flavor_notes
        : typeof product.flavor_notes === "string"
        ? product.flavor_notes.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    }
    setProducts((prev) => [newProduct, ...prev])
    return newProduct
  }

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const merged = { ...item, ...updatedFields }
        if (updatedFields.price !== undefined) {
          merged.price = Number(updatedFields.price) || 0
        }
        if (typeof updatedFields.flavor_notes === "string") {
          merged.flavor_notes = updatedFields.flavor_notes
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        }
        return merged
      })
    )
  }

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id))
  }

  const addFlashEvent = (event) => {
    const newEvent = {
      ...event,
      id: `event-${Date.now()}`,
      is_active: event.is_active ?? true,
      images: Array.isArray(event.images)
        ? event.images
        : typeof event.images === "string"
        ? event.images.split("\n").map((s) => s.trim()).filter(Boolean)
        : [],
    }
    setFlashEvents((prev) => [newEvent, ...prev])
    return newEvent
  }

  const updateFlashEvent = (id, updatedFields) => {
    setFlashEvents((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const merged = { ...item, ...updatedFields }
        if (typeof updatedFields.images === "string") {
          merged.images = updatedFields.images
            .split("\n")
            .map((s) => s.trim())
            .filter(Boolean)
        }
        return merged
      })
    )
  }

  const deleteFlashEvent = (id) => {
    setFlashEvents((prev) => prev.filter((item) => item.id !== id))
  }

  const addTestimonial = (testimonial) => {
    const newTestimonial = {
      ...testimonial,
      id: `test-${Date.now()}`,
      rating: Number(testimonial.rating) || 5,
      is_visible: testimonial.is_visible ?? true,
      sort_order: Number(testimonial.sort_order) || testimonials.length + 1,
    }
    setTestimonials((prev) => [...prev, newTestimonial])
    return newTestimonial
  }

  const updateTestimonial = (id, updatedFields) => {
    setTestimonials((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item
        const merged = { ...item, ...updatedFields }
        if (updatedFields.rating !== undefined) {
          merged.rating = Number(updatedFields.rating) || 5
        }
        return merged
      })
    )
  }

  const deleteTestimonial = (id) => {
    setTestimonials((prev) => prev.filter((item) => item.id !== id))
  }

  const addSubscriber = (email) => {
    const cleanEmail = email.trim().toLowerCase()
    const exists = subscribers.some(
      (s) => s.email.toLowerCase() === cleanEmail && s.subscribed
    )
    if (exists) {
      return { success: false, message: "這個信箱已經訂閱過了 ☕" }
    }

    const newSubscriber = {
      id: `sub-${Date.now()}`,
      email: cleanEmail,
      subscribed_at: new Date().toISOString(),
      subscribed: true,
    }
    setSubscribers((prev) => [newSubscriber, ...prev])
    return { success: true, message: "感謝您的訂閱！我們將為您寄送最新咖啡誌。" }
  }

  const removeSubscriber = (id) => {
    setSubscribers((prev) => prev.filter((s) => s.id !== id))
  }

  const resetToDefault = () => {
    setBrandSettings(initialBrandSettings)
    setBlogPosts(initialBlogPosts)
    setProducts(initialProducts)
    setFlashEvents(initialFlashEvents)
    setTestimonials(initialTestimonials)
    setSubscribers(initialSubscribers)
    // Preserve admin password hash when resetting storefront content
    localStorage.removeItem(STORAGE_KEYS.brand)
    localStorage.removeItem(STORAGE_KEYS.posts)
    localStorage.removeItem(STORAGE_KEYS.products)
    localStorage.removeItem(STORAGE_KEYS.events)
    localStorage.removeItem(STORAGE_KEYS.testimonials)
    localStorage.removeItem(STORAGE_KEYS.subscribers)
  }

  return (
    <CoffeeContext.Provider
      value={{
        brandSettings,
        updateBrandSettings,
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
        addSubscriber,
        removeSubscriber,
        resetToDefault,
        isAdminAuthenticated,
        isCustomPasswordSet,
        verifyAdminPassword,
        changeAdminPassword,
        resetAdminPasswordToDefault,
        logoutAdmin,
      }}
    >
      {children}
    </CoffeeContext.Provider>
  )
}

export const useCoffee = () => {
  const context = useContext(CoffeeContext)
  if (!context) {
    throw new Error("useCoffee must be used within a CoffeeProvider")
  }
  return context
}
