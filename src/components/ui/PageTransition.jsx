import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

/**
 * Wraps every page with a consistent fade-slide-in transition.
 *
 * Motion spec (Modern SaaS standard):
 *   enter  → opacity 0 → 1, y: 8px → 0   (250ms ease-out)
 *   exit   → opacity 1 → 0, y: 0  → -8px (180ms ease-in)
 *
 * The tiny Y-shift gives depth without being distracting.
 * Reduced-motion users: respects prefers-reduced-motion via Framer's
 * built-in reducedMotion prop on the AnimatePresence wrapper.
 */

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: [0, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
  },
}

export function PageTransition({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  )
}

/**
 * AnimatedRoutes — wrap around your <Routes> in App.jsx.
 *
 * Usage:
 *   <AnimatedRoutes>
 *     <Routes>…</Routes>
 *   </AnimatedRoutes>
 *
 * AnimatePresence with mode="wait" ensures the exiting page
 * finishes before the entering page begins.
 */
export function AnimatedRoutes({ children }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <React.Fragment key={location.pathname}>
        {children}
      </React.Fragment>
    </AnimatePresence>
  )
}
