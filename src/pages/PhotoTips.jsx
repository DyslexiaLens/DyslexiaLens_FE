import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Button from '../components/ui/Button'

// Inline SVG Icons for Visual Elegance
function DownloadIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  )
}

// Light Mode optimized Step Icons
function PenIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  )
}

// Light Mode optimized Step Icons
function PhotoIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}

// Light Mode optimized Step Icons
function AnalyzeIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  )
}

function BackArrow({ isDark }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 12L6 8l4-4"
        stroke={isDark ? '#d1d5dc' : '#364153'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// 6 Tips Data with rich, legible colors in light mode
const TIPS = [
  {
    id: 'lighting',
    title: 'Pencahayaan Cukup',
    desc: 'Pastikan area tulisan mendapatkan pencahayaan yang terang dan merata.',
    icon: (
      <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>
    ),
  },
  {
    id: 'shadow',
    title: 'Hindari Bayangan',
    desc: 'Jangan sampai tangan, ponsel, atau benda lain menutupi area tulisan.',
    icon: (
      <svg className="w-6 h-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
  {
    id: 'flat',
    title: 'Gunakan Permukaan Datar',
    desc: 'Letakkan kertas pada meja atau permukaan yang rata agar hasil foto tidak terdistorsi.',
    icon: (
      <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
  {
    id: 'top-angle',
    title: 'Ambil Foto dari Atas',
    desc: 'Posisikan kamera sejajar dengan kertas untuk mendapatkan hasil yang lebih jelas.',
    icon: (
      <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'grayscale',
    title: 'Gunakan Mode Hitam Putih',
    desc: 'Disarankan menggunakan filter atau mode Hitam Putih (Grayscale) agar kontras tulisan lebih jelas dan mudah diproses oleh AI.',
    icon: (
      <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m0-18a9 9 0 110 18m0-18V9m0 12v-2" />
      </svg>
    ),
    highlight: true,
  },
  {
    id: 'clear-photo',
    title: 'Pastikan Foto Jelas',
    desc: 'Hindari foto yang buram, terlalu gelap, atau terlalu terang.',
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
]

export default function PhotoTips() {
  const { theme } = React.useContext(AppContext)
  const navigate = useNavigate()
  const isDark = theme === 'dark'

  const [confirmed, setConfirmed] = React.useState(false)

  const pageBg = isDark ? 'bg-[#0f172a]' : 'bg-slate-50'
  const cardBg = isDark ? 'bg-[#1e2939]' : 'bg-white'

  const textColor = isDark ? 'text-white' : 'text-slate-900'
  const textMuted = isDark ? 'text-gray-400' : 'text-slate-600'

  const borderCol = isDark ? 'border-gray-700' : 'border-slate-200'

  return (
    <div className={`min-h-screen ${pageBg} px-4 py-10 transition-colors duration-300`}>
      <div className="mx-auto max-w-[1000px]">

        {/* ── Back arrow ── */}
        <Link
          to="/"
          className={`mb-6 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 hover:text-[#2b7fff] ${textMuted}`}
        >
          <BackArrow isDark={isDark} />
          Kembali ke Beranda
        </Link>

        {/* ── Main Container Card ── */}
        <div className={`${cardBg} rounded-[20px] shadow-[0px_20px_25px_rgba(0,0,0,0.1)] p-6 sm:p-10 transition-colors duration-300`}>

          {/* ==================== 1. HERO SECTION ==================== */}
          <div className="text-center mb-12 relative">
            {/* Glowing background blob */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-3xl rounded-full pointer-events-none" />

            {/* Animated Icon illustration */}
            <div className="flex justify-center mb-6">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg transform hover:scale-105 transition-transform duration-300 animate-float`}>
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>

            <h1 className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${textColor} mb-3`}>
              Petunjuk Penulisan
            </h1>
            <p className={`text-base sm:text-lg max-w-2xl mx-auto ${textMuted}`}>
              Ikuti panduan berikut untuk mendapatkan hasil Deteksi Disleksia dan Terjemahan Tulisan Tangan yang lebih akurat.
            </p>
          </div>

          {/* ==================== 2. SECTION UNDUH TEMPLATE ==================== */}
          <div className={`border rounded-[18px] p-6 sm:p-8 mb-10 ${borderCol} ${isDark ? 'bg-slate-800/40' : 'bg-slate-50'} transition-all duration-300`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* CSS Visual grid preview */}
              <div className="relative rounded-xl border border-dashed p-4 bg-slate-50 dark:bg-slate-900 border-slate-300 dark:border-slate-700 flex flex-col justify-center items-center shadow-inner overflow-hidden h-[240px]">
                {/* 10 x 8 CSS Grid Preview Box */}
                <div className="w-[180px] h-[200px] border-2 border-slate-900 dark:border-slate-600 flex flex-wrap bg-white">
                  {Array.from({ length: 48 }).map((_, idx) => (
                    <div key={idx} className="w-[30px] h-[33.3px] border-[0.7px] border-slate-200 flex items-center justify-center text-[10px] text-slate-800 font-bold select-none">
                      {idx % 7 === 2 ? 'a' : idx % 7 === 5 ? 'd' : ''}
                    </div>
                  ))}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-50 dark:from-slate-900 via-transparent to-transparent pointer-events-none" />
                <span className="absolute bottom-2 text-xs font-bold text-blue-700 dark:text-blue-400">
                  Preview Grid Template (10 x 14 Kotak)
                </span>
              </div>

              {/* Text and Actions */}
              <div className="flex flex-col justify-center text-left">
                <span className="text-xs uppercase tracking-widest font-extrabold text-blue-700 dark:text-blue-400 mb-2">
                  Langkah Awal
                </span>
                <h3 className={`text-xl font-bold ${textColor} mb-3`}>
                  Template Kertas Grid Resmi
                </h3>
                <p className={`text-sm leading-relaxed mb-6 ${textMuted}`}>
                  Unduh dan cetak template grid sebelum memulai proses penulisan. Template ini memiliki grid proporsional yang membantu AI mengukur letak dan ukuran karakter secara tepat.
                </p>
                <a
                  href="/writing-template.pdf"
                  download="writing-template.pdf"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2 rounded-[12px] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold shadow-md shadow-blue-500/10 active:translate-y-px transition duration-200"
                >
                  <DownloadIcon className="w-5 h-5" />
                  Unduh Template
                </a>
              </div>
            </div>
          </div>

          {/* ==================== 3. SECTION LANGKAH-LANGKAH ==================== */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold ${textColor} mb-6 text-center sm:text-left`}>
              Langkah Penggunaan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

              {/* Step 1 */}
              <div className={`p-5 rounded-2xl border ${borderCol} ${isDark ? 'bg-slate-800/25' : 'bg-white'} hover:shadow-md transition-all duration-200 text-center flex flex-col items-center`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${isDark
                  ? 'bg-blue-900/30 border-blue-800/40'
                  : 'bg-sky-50 border-sky-200'
                  }`}>
                  <DownloadIcon className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-sky-600'
                    }`} />
                </div>
                <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-widest">
                  Langkah 1
                </span>
                <h4 className={`font-bold mt-2 mb-1.5 ${textColor}`}>Unduh Template</h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>
                  Unduh dan cetak template grid resmi pada kertas A4 putih polos.
                </p>
              </div>

              {/* Step 2 */}
              <div className={`p-5 rounded-2xl border ${borderCol} ${isDark ? 'bg-slate-800/25' : 'bg-slate-50'} hover:shadow-md transition-all duration-200 text-center flex flex-col items-center`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${isDark
                  ? 'bg-purple-900/30 border-purple-800/40'
                  : 'bg-violet-50 border-violet-200'
                  }`}>
                  <PenIcon className={`w-6 h-6 ${isDark ? 'text-purple-400' : 'text-violet-600'
                    }`} />
                </div>
                <span className="text-xs font-bold text-purple-700 dark:text-purple-400 uppercase tracking-widest">
                  Langkah 2
                </span>
                <h4 className={`font-bold mt-2 mb-1.5 ${textColor}`}>Tulis Teks</h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>
                  Tulis teks di dalam kotak menggunakan tulisan tangan yang jelas dan mudah dibaca.
                </p>
              </div>

              {/* Step 3 */}
              <div className={`p-5 rounded-2xl border ${borderCol} ${isDark ? 'bg-slate-800/25' : 'bg-slate-50'} hover:shadow-md transition-all duration-200 text-center flex flex-col items-center`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${isDark
                  ? 'bg-teal-900/30 border-teal-800/40'
                  : 'bg-cyan-50 border-cyan-200'
                  }`}>
                  <PhotoIcon className={`w-6 h-6 ${isDark ? 'text-teal-400' : 'text-cyan-600'
                    }`} />
                </div>
                <span className="text-xs font-bold text-teal-700 dark:text-teal-400 uppercase tracking-widest">
                  Langkah 3
                </span>
                <h4 className={`font-bold mt-2 mb-1.5 ${textColor}`}>Ambil Foto</h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>
                  Ambil foto lembar kertas template tersebut secara sejajar lurus dari atas.
                </p>
              </div>

              {/* Step 4 */}
              <div className={`p-5 rounded-2xl border ${borderCol} ${isDark ? 'bg-slate-800/25' : 'bg-slate-50'} hover:shadow-md transition-all duration-200 text-center flex flex-col items-center`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 border ${isDark
                  ? 'bg-green-900/30 border-green-800/40'
                  : 'bg-emerald-50 border-emerald-200'
                  }`}>
                  <AnalyzeIcon className={`w-6 h-6 ${isDark ? 'text-green-400' : 'text-emerald-600'
                    }`} />
                </div>
                <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-widest">
                  Langkah 4
                </span>
                <h4 className={`font-bold mt-2 mb-1.5 ${textColor}`}>Unggah & Analisis</h4>
                <p className={`text-xs leading-relaxed ${textMuted}`}>
                  Unggah hasil foto ke platform untuk memulai proses screening otomatis AI.
                </p>
              </div>

            </div>
          </div>

          {/* ==================== 4. SECTION TIPS HASIL TERBAIK ==================== */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold ${textColor} mb-6 text-center sm:text-left`}>
              Tips untuk Hasil Terbaik
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {TIPS.map((tip) => {
                const isHighlight = tip.highlight
                return (
                  <div
                    key={tip.id}
                    className={`p-5 rounded-2xl border transition-all duration-300 relative ${isHighlight
                      ? 'border-indigo-500 bg-gradient-to-br from-indigo-500/15 to-purple-500/15 shadow-[0_0_15px_rgba(99,102,241,0.15)] md:col-span-2 lg:col-span-1'
                      : `${borderCol} ${isDark ? 'bg-slate-800/30' : 'bg-slate-50'} hover:shadow-md`
                      }`}
                  >
                    {isHighlight && (
                      <span className="absolute top-3 right-3 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white animate-pulse">
                        Rekomendasi Utama
                      </span>
                    )}
                    <div className="mb-3">
                      {tip.icon}
                    </div>
                    <h4 className={`font-bold text-base mb-1.5 ${textColor}`}>
                      {tip.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${textMuted}`}>
                      {tip.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ==================== 5. SECTION CONTOH FOTO ==================== */}
          <div className="mb-12">
            <h2 className={`text-2xl font-bold ${textColor} mb-6 text-center`}>
              Perbandingan Kualitas Foto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Correct Example ✅ */}
              <div className={`rounded-2xl border p-6 flex flex-col transition-colors duration-300 bg-emerald-500/5 border-emerald-500/30`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                    Contoh yang Benar
                  </h3>
                </div>

                {/* Simulated Correct Image Preview */}
                <div className="w-full h-44 rounded-xl border border-emerald-500/20 bg-slate-50 dark:bg-slate-900/60 p-4 flex items-center justify-center mb-5 relative shadow-inner overflow-hidden">
                  <div className="w-24 h-32 border border-slate-900 dark:border-slate-600 flex flex-wrap opacity-90 bg-white">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-8 h-8 border-[0.5px] border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-900">
                        {i === 2 ? 'b' : i === 8 ? 'o' : ''}
                      </div>
                    ))}
                  </div>
                  {/* Glowing sun symbol overlay simulating bright flat light */}
                  <div className="absolute top-2 right-2 text-yellow-500">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 4.5a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
                    </svg>
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-left">
                  {['Tulisan terlihat jelas.', 'Pencahayaan cukup.', 'Seluruh kertas terlihat.', 'Tidak miring.', 'Tidak ada bayangan.'].map((point, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                    >
                      <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Incorrect Example ❌ */}
              <div className={`rounded-2xl border p-6 flex flex-col transition-colors duration-300 bg-red-500/5 border-red-500/30`}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-600">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </span>
                  <h3 className="text-lg font-bold text-red-700 dark:text-red-400">
                    Contoh yang Salah
                  </h3>
                </div>

                {/* Simulated Blurred / Milted Image Preview */}
                <div className="w-full h-44 rounded-xl border border-red-500/20 bg-slate-100 dark:bg-slate-800/40 p-4 flex items-center justify-center mb-5 relative shadow-inner overflow-hidden blur-[0.8px]">
                  {/* Shadow overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent pointer-events-none z-10" />

                  {/* Skewed blurry paper */}
                  <div className="w-24 h-32 border border-slate-400 flex flex-wrap bg-white/70 transform -rotate-12 translate-x-2 translate-y-3 opacity-60">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="w-8 h-8 border-[0.5px] border-slate-300" />
                    ))}
                  </div>
                  <span className="absolute text-[10px] font-extrabold text-red-700 border border-red-500/40 bg-red-50 dark:bg-slate-900 px-2 py-0.5 rounded uppercase z-20">
                    Miring & Gelap
                  </span>
                </div>

                <ul className="space-y-2.5 text-xs text-left">
                  {['Foto buram.', 'Kertas terpotong.', 'Banyak bayangan.', 'Sudut pengambilan miring.', 'Pencahayaan buruk.'].map((point, idx) => (
                    <li
                      key={idx}
                      className={`flex items-center gap-2 font-medium ${isDark ? 'text-slate-300' : 'text-slate-700'
                        }`}
                    >
                      <svg className="w-4 h-4 text-red-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* ==================== 6. SECTION KONFIRMASI ==================== */}
          <div className={`mt-10 border-t pt-8 ${borderCol}`}>
            {/* Checkbox */}
            <div className="flex items-center justify-center mb-6">
              <label className="inline-flex items-start gap-3 cursor-pointer group select-none max-w-lg">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => setConfirmed(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className={`text-sm leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-800'} group-hover:text-blue-600 transition-colors`}>
                  Saya telah membaca dan memahami petunjuk yang diberikan.
                </span>
              </label>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="secondary"
                isDark={isDark}
                onClick={() => navigate('/')}
                className="w-full sm:w-44 !rounded-[12px] h-12 font-bold"
              >
                Kembali
              </Button>
              <Button
                variant="primary"
                isDark={isDark}
                disabled={!confirmed}
                onClick={() => navigate('/upload')}
                className={`w-full sm:w-44 !rounded-[12px] h-12 font-bold transition-all duration-300 ${confirmed ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white' : ''
                  }`}
              >
                Lanjutkan
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
