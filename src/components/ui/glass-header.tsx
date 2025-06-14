'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface GlassHeaderProps {
  children: ReactNode
  className?: string
  isScrolled?: boolean
}

export function GlassHeader({ 
  children, 
  className = '',
  isScrolled = false
}: GlassHeaderProps) {
  const baseClasses = "fixed top-0 left-0 right-0 z-50 transition-all duration-500"
  const glassClasses = isScrolled 
    ? "backdrop-blur-2xl bg-white/80 border-b border-ocean-200/30 shadow-glass py-4" 
    : "bg-transparent py-6"

  return (
    <motion.header
      className={`${baseClasses} ${glassClasses} ${className}`}
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.header>
  )
}