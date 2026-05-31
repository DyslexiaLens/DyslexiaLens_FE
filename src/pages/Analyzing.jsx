import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Button from '../components/ui/Button'

export default function Analyzing() {
  const { theme } = useContext(AppContext)
  const isDark = theme === 'dark'
  const location = useLocation()
  const navigate = useNavigate()

  const mode = location.state?.mode || 'detect'

  const [progress, setProgress] = useState(0)
  const [timeLeft, setTimeLeft] = useState('1:56')
  const [isCompleted, setIsCompleted] = useState(false)

  // Simulation logic
  useEffect(() => {
    const totalDuration = 8000
    const intervalTime = 80
    const totalSteps = totalDuration / intervalTime
    const stepIncrement = 100 / totalSteps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min(100, currentStep * stepIncrement)
      setProgress(newProgress)

      // Map progress to countdown timer (116 seconds down to 0)
      const remainingSeconds = Math.round(116 - (newProgress / 100) * 116)
      setTimeLeft(formatSeconds(remainingSeconds))

      if (newProgress >= 100) {
        clearInterval(timer)
        setIsCompleted(true)
      }
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  const formatSeconds = (totalSec) => {
    const mins = Math.floor(totalSec / 60)
    const secs = totalSec % 60
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`
  }

  const handleProceed = () => {
    navigate('/result', { state: { mode, fileUploaded: true, imageUrl: location.state?.imageUrl } })
  }

  // Determine current active checklist phase based on progress
  let phase = 0
  if (progress >= 100) phase = 3
  else if (progress >= 60) phase = 2
  else if (progress >= 20) phase = 1
  else phase = 0

  const checklistItems = [
    { label: mode === 'detect' ? 'Gambar berhasil diunggah' : 'Dokumen berhasil diunggah' },
    { label: mode === 'detect' ? 'Menganalisis pola tulisan' : 'Mengenali struktur teks' },
    { label: mode === 'detect' ? 'Menghasilkan jawaban AI' : 'Menerjemahkan ke bahasa tujuan' }
  ]

  // Styles based on theme
  const pageBgCls = isDark ? 'bg-[#0f172a]' : 'bg-[#E5E7EB]'
  const cardBgCls = isDark ? 'bg-[#1e2939]' : 'bg-white'
  const textTitleCls = isDark ? 'text-white' : 'text-gray-900'
  const textSubCls = isDark ? 'text-gray-400' : 'text-gray-500'
  const tipCardBg = isDark ? 'bg-[#2a3547]' : 'bg-gray-50'

  return (
    <div className={`min-h-[calc(100vh-64px)] flex items-center justify-center p-4 transition-colors duration-300 ${pageBgCls}`}>
      
      {/* ── Main Container ── */}
      <div className={`${cardBgCls} shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] w-full max-w-md rounded-[24px] p-8 md:p-10 flex flex-col items-center transition-all duration-300 relative`}>
        
        <div 
          className="relative w-16 h-16 flex items-center justify-center mb-6"
          role="progressbar"
          aria-valuenow={Math.round(progress)}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuetext={isCompleted ? 'Analisis Selesai' : `Proses: ${Math.round(progress)}%`}
        >
          {isCompleted ? (
            <div className="w-16 h-16 rounded-full bg-green-500 dark:bg-green-600 flex items-center justify-center text-white shadow-[0_4px_12px_rgba(34,197,94,0.25)] animate-in zoom-in duration-300">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <svg className="animate-spin text-blue-500 w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
        </div>

        {/* ── Big Countdown Timer ── */}
        <div className="flex flex-col items-center mb-6">
          <h1 className={`text-4xl font-bold tracking-tight font-mono transition-colors duration-300 ${textTitleCls}`}>
            {isCompleted ? 'Selesai' : timeLeft}
          </h1>
          {!isCompleted && (
            <span className={`text-sm mt-1 transition-colors duration-300 ${textSubCls}`}>
              tersisa
            </span>
          )}
        </div>

        {/* ── Titles ── */}
        <div className="text-center mb-10 w-full">
          <h2 className={`text-xl font-bold mb-2 transition-colors duration-300 ${textTitleCls}`}>
            {mode === 'detect' ? 'Menganalisis gambar' : 'Menerjemahkan teks'}
          </h2>
          <p className={`text-sm leading-relaxed transition-colors duration-300 ${textSubCls}`}>
            Sistem sedang membaca teks dan memproses jawaban Anda.
          </p>
        </div>

        {/* ── Status Checklist ── */}
        <div className="flex flex-col gap-4 w-full mb-10">
          {checklistItems.map((item, index) => {
            const isDone = phase > index
            const isCurrent = phase === index && !isCompleted
            const isPending = phase < index

            return (
              <div key={index} className="flex items-center gap-4 transition-all duration-300">
                <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center">
                  {isDone && (
                    <svg className="w-5 h-5 text-green-500 animate-in zoom-in" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  {isCurrent && (
                    <svg className="animate-spin text-blue-500 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  {isPending && (
                    <div className={`w-4 h-4 rounded-full border-[2px] transition-colors duration-300 ${isDark ? 'border-gray-600' : 'border-gray-200'}`} />
                  )}
                </div>
                <p className={`text-[15px] font-medium transition-colors duration-300 ${
                  isDone || isCurrent ? textTitleCls : textSubCls
                }`}>
                  {item.label}
                  <span className="sr-only">
                    {isDone ? ' - Selesai' : isCurrent ? ' - Sedang diproses' : ' - Belum dimulai'}
                  </span>
                </p>
              </div>
            )
          })}
        </div>

        {/* ── Action / Tips Area ── */}
        <div className="w-full">
          {isCompleted ? (
            <Button
              variant="primary"
              size="lg"
              isDark={isDark}
              onClick={handleProceed}
              className="w-full !h-[52px]"
              rightIcon={
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                  <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            >
              Lihat Hasil
            </Button>
          ) : (
            <div className={`flex items-start gap-3 p-4 rounded-xl transition-colors duration-300 ${tipCardBg}`}>
              <div className="mt-0.5 shrink-0 text-amber-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M12 2v1" />
                  <path d="M12 7a5 5 0 1 0 5 5 5 5 0 0 0-5-5z" />
                </svg>
              </div>
              <p className={`text-[13px] leading-relaxed transition-colors duration-300 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Pastikan tulisan yang di-upload jelas dan terbaca untuk hasil yang lebih akurat.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
