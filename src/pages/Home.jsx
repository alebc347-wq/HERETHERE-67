import React from "react"
import { motion } from "framer-motion"
import { HeroSection } from "@/components/home/HeroSection"
import { StorySection } from "@/components/home/StorySection"
import { LatestPosts } from "@/components/home/LatestPosts"
import { TestimonialsSection } from "@/components/home/TestimonialsSection"
import { FlashEventPreview } from "@/components/home/FlashEventPreview"
import { NewsletterSection } from "@/components/home/NewsletterSection"
import { LineSection } from "@/components/home/LineSection"
import { pageTransition } from "@/lib/motion"

export const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
      className="flex flex-col w-full"
    >
      <HeroSection />
      <StorySection />
      <LatestPosts />
      <TestimonialsSection />
      <FlashEventPreview />
      <NewsletterSection />
      <LineSection />
    </motion.div>
  )
}
