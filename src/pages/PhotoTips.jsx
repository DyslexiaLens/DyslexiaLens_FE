import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Button from '../components/ui/Button'

// ── Asset imports (from exported assets/) ────────────────────────────────────
import cameraLightIcon  from '../assets/CameraLight.svg'  // Jelas & Tajam — light (also header icon)
import cameraDarkIcon   from '../assets/CameraDark.svg'   // Jelas & Tajam — dark
import lightingLightIcon from '../assets/LightingLight.svg' // Pencahayaan — light
import lightingDarkIcon  from '../assets/LightingDark.svg'  // Pencahayaan — dark
import centeredLightIcon from '../assets/CenteredLight.svg' // Posisi Tengah — light
import centeredDarkIcon  from '../assets/CenteredDark.svg'  // Posisi Tengah — dark

// ── Tip card data ─────────────────────────────────────────────────────────────
const TIPS = [
  {
    id: 'clear',
    lightIcon: cameraLightIcon,
    darkIcon:  cameraDarkIcon,
    lightBg:   '#eff6ff',
    darkBg:    'rgba(28,57,142,0.2)',
    title:     'Jelas & Tajam',
    desc:      'Pastikan teks fokus dan mudah dibaca. Hindari foto yang blur.',
  },
  {
    id: 'lighting',
    lightIcon: lightingLightIcon,
    darkIcon:  lightingDarkIcon,
    lightBg:   '#f0fdf4',
    darkBg:    'rgba(13,84,43,0.2)',
    title:     'Pencahayaan Bagus',
    desc:      'Gunakan cahaya alami jika memungkinkan. Hindari bayangan gelap.',
  },
  {
    id: 'centered',
    lightIcon: centeredLightIcon,
    darkIcon:  centeredDarkIcon,
    lightBg:   '#faf5ff',
    darkBg:    'rgba(89,22,139,0.2)',
    title:     'Posisi Tengah',
    desc:      'Isi frame dengan tulisan. Halaman penuh dari buku tulis ideal.',
  },
]

// ── Back arrow SVG (inline) ───────────────────────────────────────────────────
function BackArrow({ isDark }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M10 12L6 8l4-4"
        stroke={isDark ? '#d1d5dc' : '#364153'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function PhotoTips() {
  const { theme } = React.useContext(AppContext)
  const navigate   = useNavigate()
  const isDark     = theme === 'dark'

  const pageBgCls           = isDark ? 'bg-[#0f172a]' : 'bg-[#E5E7EB]'
  const cardBg              = isDark ? 'bg-[#1e2939]' : 'bg-white'
  // Header circle: bg + border tinted to match #2B7FFF camera icon
  const headerCircleBg      = isDark
    ? 'bg-[rgba(28,57,142,0.3)] border border-[rgba(43,127,255,0.3)]'
    : 'bg-[#dbeafe] border border-[#bfdbfe]'

  return (
    <div className={`min-h-screen ${pageBgCls} px-4 py-10 transition-colors duration-300`}>
      <div className="mx-auto max-w-[900px]">

        {/* ── Back link ── */}
        <Link
          to="/upload"
          className="mb-6 inline-flex items-center gap-1.5 text-[var(--text-secondary)] text-[16px] hover:text-[var(--text-primary)] transition-colors"
        >
          <BackArrow isDark={isDark} />
          Kembali
        </Link>

        {/* ── Card ── */}
        <div
          className={`${cardBg} rounded-[16px] shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)] px-5 sm:px-10 py-6 sm:py-10`}
        >
          {/* Header icon — camera, circle bg + border tinted blue (nodes 11:35598 / 11:35762) */}
          <div className="flex justify-center mb-6">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${headerCircleBg}`}>
              <img
                src={isDark ? cameraDarkIcon : cameraLightIcon}
                alt="Kamera"
                className="w-6 h-6"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-[30px] font-semibold text-center text-[var(--text-primary)] leading-[36px] mb-2">
            Tips Foto yang Bagus
          </h1>
          <p className="text-center text-[var(--text-secondary)] text-[16px] mb-8">
            Ikuti tips ini untuk hasil analisis yang optimal
          </p>

          {/* ── Tip Cards ── */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
            {TIPS.map((tip) => (
              <div key={tip.id} className="flex flex-col items-center text-center">
                {/* Icon box */}
                <div
                  className="w-full flex items-center justify-center rounded-[14px] py-6 mb-4"
                  style={{ background: isDark ? tip.darkBg : tip.lightBg }}
                >
                  <img
                    src={isDark ? tip.darkIcon : tip.lightIcon}
                    alt={tip.title}
                    className="w-12 h-12"
                  />
                </div>

                {/* Title */}
                <h3 className="text-[18px] font-semibold leading-[27px] text-[var(--text-primary)] mb-2">
                  {tip.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] leading-[20px] text-[var(--text-secondary)] max-w-[230px]">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>

          {/* ── CTA Button ── */}
          <Button
            id="btn-photo-tips-mengerti"
            variant="primary"
            size="lg"
            isDark={isDark}
            onClick={() => navigate('/upload')}
            className="w-full !h-12 !rounded-[14px]"
          >
            Mengerti, Lanjut →
          </Button>
        </div>
      </div>
    </div>
  )
}
