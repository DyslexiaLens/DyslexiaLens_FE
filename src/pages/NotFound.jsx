import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, AlertCircle } from 'lucide-react'
import { AppContext } from '../context/AppContext'

export default function NotFound() {
  const { theme } = useContext(AppContext)
  const isDark = theme === 'dark'

  const pageClass = isDark ? 'bg-[#101828] text-white' : 'bg-[#e5e7eb] text-[#101828]'
  const mutedText = isDark ? 'text-[#99a1af]' : 'text-[#4a5565]'
  const headingText = isDark ? 'text-white' : 'text-[#101828]'

  // Animation variants for floating elements
  const floatVariant = (delay = 0) => ({
    animate: {
      y: [0, -12, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      },
    },
  })

  return (
    <div className={`${pageClass} min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-12 transition-colors duration-300 relative overflow-hidden`}>
      {/* Decorative background gradients */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 max-w-md w-full text-center flex flex-col items-center">
        {/* Animated Icon / Illustration */}
        <motion.div
          variants={floatVariant(0)}
          animate="animate"
          className="mb-8 relative"
        >
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <AlertCircle size={48} className="text-white" />
          </div>
          {/* Decorative mini circles */}
          <motion.div
            variants={floatVariant(0.5)}
            animate="animate"
            className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-indigo-400 shadow-md"
          />
          <motion.div
            variants={floatVariant(1)}
            animate="animate"
            className="absolute -bottom-2 -left-4 w-4 h-4 rounded-full bg-blue-400 shadow-md"
          />
        </motion.div>

        {/* Big 404 Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-8xl font-black tracking-widest bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent filter drop-shadow-sm select-none"
        >
          404
        </motion.h1>

        {/* Status Message */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`mt-4 text-2xl font-bold ${headingText}`}
        >
          Halaman Tidak Ditemukan
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className={`mt-3 text-[14px] leading-relaxed max-w-sm ${mutedText}`}
        >
          Ups! Kami tidak dapat menemukan halaman yang Anda cari. Silakan periksa kembali alamat URL Anda atau kembali ke halaman utama.
        </motion.p>

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 w-full"
        >
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-[12px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-md shadow-blue-500/10 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200"
          >
            <Home size={18} />
            Kembali ke Beranda
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
