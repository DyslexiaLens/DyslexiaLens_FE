import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Button from '../components/ui/Button'
import EyeVisualIcon from '../assets/EyeVisual.svg'
import MoveAnimationIcon from '../assets/MoveAnimation.svg'

function BackIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10.5 3.5L6 8l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function SidebarIcon({ type }) {
  if (type === 'accessibility') {
    return (
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="10" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3.75 8.25H16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M6.25 17.25L8.5 11.25H11.5L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10 10.25C7.92893 10.25 6.25 8.57107 6.25 6.5C6.25 4.42893 7.92893 2.75 10 2.75C12.0711 2.75 13.75 4.42893 13.75 6.5C13.75 8.57107 12.0711 10.25 10 10.25Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4.5 17C5.33282 14.634 7.41215 13.25 10 13.25C12.5878 13.25 14.6672 14.634 15.5 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function SectionIcon({ type }) {
  if (type === 'motion') {
    return (
      <img src={MoveAnimationIcon} alt="" aria-hidden className="h-5 w-5 shrink-0" />
    )
  }

  return (
    <img src={EyeVisualIcon} alt="" aria-hidden className="h-5 w-5 shrink-0" />
  )
}

function Switch({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative inline-flex h-5 w-8 items-center rounded-full border border-transparent transition duration-200 focus-visible:outline-none ${checked ? 'bg-[#2b7fff]' : 'bg-[#cbced4]'}`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white shadow-[0px_1px_2px_rgba(15,23,42,0.2)] transition-transform duration-200 ${checked ? 'translate-x-3.5' : 'translate-x-0.5'}`}
      />
    </button>
  )
}

function SidebarLink({ active = false, children, to, isDark }) {
  const baseClass = 'flex h-10 items-center gap-3 rounded-[10px] px-4 text-sm font-medium transition duration-200'
  const activeClass = active
    ? isDark
      ? 'bg-[#203b7a] text-[#51a2ff]'
      : 'bg-[#dbeafe] text-[#1447e6]'
    : isDark
      ? 'text-[#d1d5db] hover:bg-white/5'
      : 'text-[#364153] hover:bg-black/5'

  return (
    <Link to={to} className={`${baseClass} ${activeClass}`}>
      {children}
    </Link>
  )
}

function ToggleRow({ title, description, checked, onChange, children, theme }) {
  const isDark = theme === 'dark'
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="max-w-[680px]">
        <div className={`text-[16px] font-medium leading-6 ${isDark ? 'text-white' : 'text-[#101828]'}`}>{title}</div>
        <div className={`mt-1 text-[14px] leading-5 ${isDark ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>{description}</div>
        {children ? <div className="mt-1 text-[12px] leading-4 text-[#2b7fff]">{children}</div> : null}
      </div>
      <Switch checked={checked} onChange={onChange} label={title} />
    </div>
  )
}

export default function AccessibilityPage() {
  const { theme, logout, accessibility, updateAccessibility, resetAccessibility, isLoggedIn } = React.useContext(AppContext)
  const navigate = useNavigate()
  const isDark = theme === 'dark'
  const [savedState, setSavedState] = React.useState(true)

  React.useEffect(() => {
    setSavedState(true)
  }, [accessibility])

  const textScale = Math.max(80, Math.min(120, accessibility.textSize || 100))
  const sliderPercent = ((textScale - 80) / 40) * 100
  const sliderBackground = `linear-gradient(to right, #111827 0%, #111827 ${sliderPercent}%, ${isDark ? '#374151' : '#e5e7eb'} ${sliderPercent}%, ${isDark ? '#374151' : '#e5e7eb'} 100%)`

  const pageClass = isDark ? 'bg-[#101828]' : 'bg-[#e5e7eb]'
  const cardClass = isDark
    ? 'bg-[#243047] border-[#364153] text-white shadow-[0px_20px_40px_rgba(0,0,0,0.24)]'
    : 'bg-white border-[#e5e7eb] text-[#101828] shadow-[0px_20px_40px_rgba(15,23,42,0.12)]'

  const handleSave = () => {
    setSavedState(true)
  }

  const handleReset = () => {
    resetAccessibility()
    setSavedState(false)
    window.setTimeout(() => setSavedState(true), 0)
  }

  const toggleAccessibility = (key) => {
    updateAccessibility({ [key]: !accessibility[key] })
    setSavedState(false)
  }

  return (
    <div className={`px-4 py-8 transition-colors duration-300 sm:px-6 lg:px-0 lg:py-12 ${pageClass}`}>
      <div className="mx-auto flex max-w-[896px] flex-col gap-5 sm:gap-6">
        <Link to={isLoggedIn ? "/profile" : "/"} className={`inline-flex items-center gap-2 text-sm ${isDark ? 'text-[#cbd5e1]' : 'text-[#364153]'}`}>
          <BackIcon />
          <span>Kembali</span>
        </Link>

        <section className={`overflow-hidden rounded-[16px] border transition-colors duration-300 ${cardClass}`}>
          <div className={`border-b px-6 py-6 sm:px-8 ${isDark ? 'border-[#364153]' : 'border-[#e5e7eb]/70'}`}>
            <h1 className={`text-[24px] font-semibold leading-8 ${isDark ? 'text-white' : 'text-[#101828]'}`}>Pengaturan</h1>
            <p className={`mt-2 text-[16px] leading-6 ${isDark ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>Kelola preferensi Anda</p>
          </div>

          <div className={`border-b ${isDark ? 'border-[#364153]' : 'border-[#e5e7eb]'} ${isDark ? 'bg-[#1f2937]' : 'bg-[#f9fafb]'}`}>
            <div className="px-6 py-6 sm:px-8">
              <div className="space-y-1">
                {isLoggedIn && (
                  <SidebarLink to="/profile" isDark={isDark}>
                    <SidebarIcon type="profile" />
                    <span>Profil</span>
                  </SidebarLink>
                )}
                <SidebarLink to="/profile/accessibility" active isDark={isDark}>
                  <SidebarIcon type="accessibility" />
                  <span>Aksesibilitas</span>
                </SidebarLink>
              </div>
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8">
            <div>
              <h2 className={`text-[20px] font-semibold leading-7 ${isDark ? 'text-white' : 'text-[#101828]'}`}>Preferensi Aksesibilitas</h2>
              <p className={`mt-2 text-[16px] leading-6 ${isDark ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>Sesuaikan DyslexiaLens agar lebih mudah dibaca dan digunakan</p>
            </div>

            <div className="mt-8 space-y-8">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-[18px] font-semibold leading-7">
                  <span className={isDark ? 'text-[#51a2ff]' : 'text-[#2b7fff]'}>
                    <SectionIcon type="visual" />
                  </span>
                  <span className={isDark ? 'text-white' : 'text-[#101828]'}>Penyesuaian Visual</span>
                </div>

                <div className="space-y-5">
                  <ToggleRow
                    theme={theme}
                    title="Mode Kontras Tinggi"
                    description="Tingkatkan kontras teks dan background untuk keterbacaan lebih baik"
                    checked={accessibility.highContrast}
                    onChange={() => toggleAccessibility('highContrast')}
                  />

                  <ToggleRow
                    theme={theme}
                    title="Font Ramah Disleksia"
                    description="Aktifkan font dengan bobot dan spasi yang dirancang khusus untuk kemudahan membaca"
                    checked={accessibility.dyslexiaFont}
                    onChange={() => toggleAccessibility('dyslexiaFont')}
                  >
                    Preview: The quick brown fox jumps over the lazy dog
                  </ToggleRow>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <div className={`text-[16px] font-medium leading-6 ${isDark ? 'text-white' : 'text-[#101828]'}`}>Ukuran Teks</div>
                      <div className="text-[14px] font-medium text-[#2b7fff]">{textScale}%</div>
                    </div>
                    <p className={`text-[14px] leading-5 ${isDark ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>Sesuaikan ukuran teks global di seluruh aplikasi</p>
                    <div className="flex items-center gap-3">
                      <span className={`text-[16px] font-medium ${isDark ? 'text-[#cbd5e1]' : 'text-[#364153]'}`}>A</span>
                      <input
                        type="range"
                        min="80"
                        max="120"
                        step="5"
                        value={textScale}
                        onChange={(event) => {
                          updateAccessibility({ textSize: Number(event.target.value) })
                          setSavedState(false)
                        }}
                        className="accessibility-range h-2 w-full appearance-none rounded-full"
                        style={{ background: sliderBackground }}
                        aria-label="Ukuran teks"
                      />
                      <span className={`text-[16px] font-medium ${isDark ? 'text-[#cbd5e1]' : 'text-[#364153]'}`}>A</span>
                    </div>
                  </div>
                </div>
              </section>

              <div className={`h-px ${isDark ? 'bg-[#364153]' : 'bg-[#e5e7eb]'}`} />

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-[18px] font-semibold leading-7">
                  <span className={isDark ? 'text-[#22c55e]' : 'text-[#00a63e]'}>
                    <SectionIcon type="motion" />
                  </span>
                  <span className={isDark ? 'text-white' : 'text-[#101828]'}>Gerakan & Animasi</span>
                </div>

                <ToggleRow
                  theme={theme}
                  title="Kurangi Gerakan"
                  description="Nonaktifkan animasi non-esensial, transisi, dan visual otomatis"
                  checked={accessibility.reduceMotion}
                  onChange={() => toggleAccessibility('reduceMotion')}
                />
              </section>
            </div>

            <div className={`mt-10 border-t pt-6 ${isDark ? 'border-[#364153]' : 'border-[#e5e7eb]'}`}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  variant="secondary"
                  size="sm"
                  isDark={isDark}
                  onClick={handleReset}
                  className="!rounded-[8px] !h-10"
                >
                  Reset ke Default
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  isDark={isDark}
                  onClick={handleSave}
                  className="!rounded-[8px] !h-10 sm:flex-1"
                >
                  {savedState ? 'Preferensi Tersimpan' : 'Simpan Preferensi'}
                </Button>
              </div>
            </div>

            {isLoggedIn && (
              <button
                type="button"
                onClick={() => {
                  logout()
                  navigate('/')
                }}
                className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#FF6467] transition duration-200 hover:opacity-80"
              >
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10.6667 11.3333L14 8L10.6667 4.66667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 8H6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Keluar</span>
              </button>
            )}

            <div
              className={`mt-6 rounded-[10px] border px-4 py-3 text-sm leading-6 ${isDark ? 'border-[#894b00] bg-[rgba(115,62,10,0.2)] text-[#d1d5dc]' : 'border-[#fcd34d] bg-[#fefce8] text-[#364153]'}`}
            >
              <strong>Disclaimer:</strong> Ini bukan diagnosis medis. DyslexiaLens adalah alat screening AI untuk mengidentifikasi pola visual dalam tulisan tangan. Selalu konsultasikan dengan profesional untuk evaluasi klinis.
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
