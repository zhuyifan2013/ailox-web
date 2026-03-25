"use client"

import { motion } from "framer-motion"
import { clsx } from "clsx"

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export function GlassCard({ children, className, hover = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={hover ? { scale: 1.03, y: -6 } : undefined}
      className={clsx(
        "glass rounded-2xl p-6",
        "transition-shadow duration-300",
        hover && "hover:glow-indigo cursor-pointer",
        className
      )}
    >
      {children}
    </motion.div>
  )
}
