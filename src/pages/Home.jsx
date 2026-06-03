import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import SectionBadge from '../components/landing/SectionBadge'
import SectionHeading from '../components/landing/SectionHeading'
import FeatureCard from '../components/landing/FeatureCard'
import TestimonialCard from '../components/landing/TestimonialCard'
import ActionButton from '../components/landing/ActionButton'
import {
  assets,
  heroHighlights,
  problemCards,
  solutionCards,
  testimonials,
} from '../components/landing/landingContent'

function HeroHighlight({ children }) {
  const { theme } = React.useContext(AppContext)

  return (
    <div className="flex items-center gap-2">
      <span
        className={
          theme === 'dark'
            ? 'flex h-5 w-5 items-center justify-center rounded-full bg-[rgba(13,84,43,0.2)] text-[#05df72]'
            : 'flex h-5 w-5 items-center justify-center rounded-full bg-[#dcfce7] text-[#00a63e]'
        }
      >
        <img alt="" src={assets.heroCheck} className="h-3 w-3" aria-hidden />
      </span>
      <span>{children}</span>
    </div>
  )
}

export default function Home() {
  const { theme, isLoggedIn } = React.useContext(AppContext)
  const navigate = useNavigate()
  const [primaryLoading] = React.useState(false)
  const [secondaryLoading] = React.useState(false)

  return (
    <div id="home" className="overflow-hidden bg-[var(--page-bg)] text-[var(--text-primary)] transition-colors duration-300">
      <section className="theme-hero relative isolate overflow-hidden px-4 pb-16 pt-10 transition-colors duration-300 sm:px-6 lg:px-0 lg:pb-24 lg:pt-16">
        <div className={`absolute left-4 top-28 hidden h-80 w-80 rounded-full blur-3xl lg:block ${theme === 'dark' ? 'bg-[rgba(43,127,255,0.2)]' : 'bg-[rgba(43,127,255,0.1)]'}`} />
        <div className={`absolute right-20 top-20 hidden h-80 w-80 rounded-full blur-3xl lg:block ${theme === 'dark' ? 'bg-[rgba(173,70,255,0.2)]' : 'bg-[rgba(173,70,255,0.1)]'}`} />
        <div className={`absolute left-[52%] top-72 hidden h-64 w-64 rounded-full blur-2xl lg:block ${theme === 'dark' ? 'bg-[rgba(246,51,154,0.1)]' : 'bg-[rgba(246,51,154,0.05)]'}`} />

        <div className="relative mx-auto grid max-w-[1280px] items-center gap-12 px-0 lg:grid-cols-[1fr_1.03fr] lg:px-8 xl:px-12">
          <div className="relative max-w-2xl flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex justify-center md:justify-start w-full">
              <SectionBadge tone="blue">Powered by AI</SectionBadge>
            </div>
            <h1 className="mt-8 text-4xl font-bold leading-[0.96] tracking-tight text-[var(--text-primary)] sm:text-6xl lg:text-[72px]">
              Deteksi Dini
              <span className="block bg-gradient-to-r from-[#155dfc] via-[#9810fa] to-[#e60076] bg-clip-text text-transparent">
                Disleksia
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[var(--text-secondary)] sm:mt-8 sm:text-xl sm:leading-8 mx-auto md:mx-0">
              Analisis tulisan tangan anak Anda dengan teknologi AI untuk deteksi dini tanda-tanda disleksia. Cepat,
              akurat, dan mudah digunakan.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:mt-10 sm:flex-row">
              {isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate('/writing-tips')}
                    disabled={primaryLoading}
                    className="inline-flex h-14 min-w-[266px] whitespace-nowrap items-center justify-center rounded-[14px] bg-gradient-to-r from-[#155dfc] to-[#9810fa] px-8 text-[18px] font-medium leading-[28px] text-white drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] transition duration-200 hover:brightness-105 active:translate-y-px disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2"
                  >
                    <span>Mulai Analisis Sekarang</span>
                  </button>

                  <button
                    onClick={() => navigate('/history')}
                    className={`inline-flex h-14 min-w-[266px] items-center justify-center rounded-[14px] border-[1.455px] px-8 text-[18px] font-medium leading-[28px] transition duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-2 ${theme === 'dark'
                      ? 'border-[#4a5565] bg-[rgba(38,38,38,0.3)] text-[#d1d5dc] hover:bg-[rgba(54,65,83,0.5)]'
                      : 'border-[rgba(0,0,0,0.1)] bg-white text-[var(--text-primary)] hover:bg-[#fafafa]'
                      }`}
                  >
                    <span>Lihat Riwayat</span>
                  </button>
                </>
              ) : (
                <>
                  <ActionButton
                    variant="primary"
                    size="lg"
                    loading={primaryLoading}
                    onClick={() => navigate('/register')}
                    className="whitespace-nowrap"
                  >
                    Daftar & Mulai Analisis
                  </ActionButton>
                  <ActionButton
                    variant="secondary"
                    size="lg"
                    loading={secondaryLoading}
                    onClick={() => navigate('/login')}
                  >
                    Sudah Punya Akun?
                  </ActionButton>
                </>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--text-secondary)] sm:gap-x-8">
              {heroHighlights.map((item) => (
                <HeroHighlight key={item}>{item}</HeroHighlight>
              ))}
            </div>
          </div>

          {/* ===================== DESKTOP LIVE CARD (Width >= md) ===================== */}
          <div className="hidden md:block relative mx-auto w-full max-w-[584px]">
            <div className={`absolute inset-0 rounded-[16px] blur-3xl ${theme === 'dark' ? 'bg-gradient-to-br from-[rgba(43,127,255,0.2)] to-[rgba(173,70,255,0.2)]' : 'bg-gradient-to-br from-[rgba(43,127,255,0.2)] to-[rgba(173,70,255,0.2)]'}`} />
            <div className={`relative rounded-[16px] border px-4 pb-4 pt-5 transition-colors duration-300 sm:px-6 sm:pt-6 ${theme === 'dark'
              ? 'bg-[rgba(30,41,57,0.9)] border-[rgba(54,65,83,0.3)] shadow-[0px_25px_50px_0px_rgba(43,127,255,0.1)]'
              : 'theme-hero-card'
              }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img alt="" src={assets.analysis} className="h-5 w-5" aria-hidden />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Analisis Tulisan</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <span className="h-2 w-2 rounded-full bg-[#00c950]/50" />
                  Live
                </div>
              </div>

              <div
                className={`relative mt-4 overflow-hidden rounded-[14px] border px-6 py-8 text-center shadow-inner sm:px-8 ${theme === 'dark'
                  ? 'border-[rgba(20,71,230,0.5)] bg-[linear-gradient(166deg,_rgba(28,57,142,0.3)_0%,_rgba(89,22,139,0.3)_100%)]'
                  : 'border-[#bedbff] bg-[linear-gradient(166deg,_#eff6ff_0%,_#faf5ff_100%)]'
                  }`}
              >
                <p className="text-[30px] leading-none text-[var(--text-primary)] sm:text-4xl">kids human read</p>
                <div className="mt-2 flex items-center justify-center gap-2 text-xs text-[var(--text-secondary)]">
                  <img alt="" src={assets.analysisLive} className="h-4 w-4" aria-hidden />
                  Sedang menganalisis pola...
                </div>
                <div className="absolute inset-0 shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {[
                  { value: '95%', label: 'Akurasi', lightTone: 'text-[#155dfc]', darkTone: 'text-[#51a2ff]' },
                  { value: '2m', label: 'Waktu', lightTone: 'text-[#00a63e]', darkTone: 'text-[#05df72]' },
                  { value: 'AI', label: 'Model', lightTone: 'text-[#9810fa]', darkTone: 'text-[#c27aff]' },
                ].map((metric) => (
                  <div key={metric.label} className={`rounded-[10px] px-3 py-3 text-center transition-colors duration-300 ${theme === 'dark' ? 'bg-[rgba(54,65,83,0.7)]' : 'theme-metric'
                    }`}>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? metric.darkTone : metric.lightTone}`}>{metric.value}</div>
                    <div className="mt-1 text-xs text-[var(--text-secondary)]">{metric.label}</div>
                  </div>
                ))}
              </div>

              <div className="absolute -right-3 -top-4 rounded-[14px] bg-gradient-to-br from-[#00c950] to-[#00a63e] p-3 shadow-[0px_20px_12.5px_rgba(0,201,80,0.6),0px_8px_5px_rgba(0,201,80,0.6)] transition-transform duration-200 hover:scale-110 animate-float sm:-right-5 sm:-top-6">
                <img alt="" src={assets.analysisDot} className="h-5 w-5" aria-hidden />
              </div>
              <div className="absolute -left-2 top-[270px] rounded-[14px] bg-gradient-to-br from-[#ad46ff] to-[#9810fa] p-3 shadow-[0px_20px_12.5px_rgba(173,70,255,0.6),0px_8px_5px_rgba(173,70,255,0.6)] transition-transform duration-200 hover:scale-110 animate-float-delayed sm:-left-3 sm:top-[285px]">
                <img alt="" src={assets.analysisPulse} className="h-5 w-5" aria-hidden />
              </div>
            </div>
          </div>

          {/* ===================== MOBILE LIVE CARD (Width < md) ===================== */}
          {/* Renders exact Figma Node 2:1490 (Light Mode) and Node 2:1933 (Dark Mode) */}
          <div className="block md:hidden relative mx-auto w-full max-w-[410px] mt-8">

            {/* Ambient Shadow Gradient */}
            <div
              className="absolute inset-0 rounded-[16px] blur-[64px] opacity-75 pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(134.247deg, rgba(43, 127, 255, 0.2) 0%, rgba(173, 70, 255, 0.2) 100%)' }}
            />

            {/* Main Card Container */}
            <div
              className={`relative border border-solid
    pt-[24.747px]
    px-4 sm:px-[25px]
    pb-8
    rounded-[16px]
    flex flex-col
    gap-[15.763px] transition duration-300 ${theme === 'dark'
                  ? 'bg-[rgba(30,41,57,0.9)] border-[rgba(54,65,83,0.3)] shadow-[0px_25px_50px_0px_rgba(43,127,255,0.1)]'
                  : 'bg-white border-[rgba(229,231,235,0.5)] drop-shadow-[0px_25px_25px_rgba(0,0,0,0.25)]'
                }`}
            >
              {/* Header Row */}
              <div className="flex h-[20px] items-center justify-between pl-[0.116px] pr-[-0.28px] w-full">
                <div className="flex gap-[8.181px] items-center pl-[-0.18px] h-[20px]">
                  <div className="relative shrink-0 h-5 w-5">
                    <img alt="" className="absolute inset-0 h-full w-full block" src={assets.analysis} />
                  </div>
                  <span className={`text-[14px] font-semibold leading-[20px] ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>
                    Analisis Tulisan
                  </span>
                </div>

                {/* Blinking Live Indicator */}
                <div className="flex gap-[3.782px] items-center pl-[0.212px] h-[16px]">
                  <div className="bg-[#00c950] opacity-96 rounded-full h-2 w-2 animate-pulse-scale" />
                  <span className={`text-[12px] font-normal leading-[16px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#6a7282]'}`}>
                    Live
                  </span>
                </div>
              </div>

              {/* Display Inner Box */}
              <div
                className="relative flex flex-col h-[174px] items-start pb-[0.787px] pt-[33px] px-4 sm:px-[32.5px] border border-solid rounded-[14px] w-full"
                style={{
                  borderColor: theme === 'dark' ? 'rgba(20,71,230,0.5)' : 'rgba(190,219,255,0.5)'
                }}
              >
                {/* Background gradient inside display */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none rounded-[14px]"
                  style={{
                    backgroundImage: theme === 'dark'
                      ? "linear-gradient(148.861deg, rgba(28, 57, 142, 0.3) 0%, rgba(89, 22, 139, 0.3) 100%)"
                      : "linear-gradient(148.861deg, rgb(239, 246, 255) 0%, rgb(250, 245, 255) 100%)"
                  }}
                />

                <div className="relative z-10 flex flex-col gap-[11.99px] h-[108px] items-center w-full">
                  <p className={`text-[36px] font-normal leading-[40px] text-center w-full max-w-[223px] font-sans ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[#364153]'}`}>
                    kids human read
                  </p>
                  <div className="flex gap-[7.755px] h-[16px] items-center justify-center px-2 sm:pl-[26.744px] sm:pr-[26.507px] w-full">
                    <img alt="" className="h-4 w-4 shrink-0" src={assets.analysisLive} />
                    <span className={`text-[12px] leading-[16px] text-center ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>
                      Sedang menganalisis pola...
                    </span>
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_2px_4px_0px_rgba(0,0,0,0.05)]" />
              </div>

              {/* Metrics Row */}
              <div className="relative h-[72px] w-full flex items-center justify-between gap-3">
                {[
                  { value: '95%', label: 'Akurasi', color: theme === 'dark' ? 'text-[#51a2ff]' : 'text-[#155dfc]' },
                  { value: '2m', label: 'Waktu', color: theme === 'dark' ? 'text-[#05df72]' : 'text-[#00a63e]' },
                  { value: 'AI', label: 'Model', color: theme === 'dark' ? 'text-[#c27aff]' : 'text-[#9810fa]' }
                ].map((metric) => (
                  <div
                    key={metric.label}
                    className={`flex-1 h-[72px] rounded-[10px] relative text-center flex flex-col items-center justify-center ${theme === 'dark' ? 'bg-[rgba(54,65,83,0.7)]' : 'bg-[#f9fafb]'
                      }`}
                  >
                    <span className={`text-[24px] font-bold leading-[32px] block ${metric.color}`}>
                      {metric.value}
                    </span>
                    <span className={`text-[12px] font-normal leading-[16px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>
                      {metric.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Floating Badges */}
              <div
                className="absolute -right-3 -top-4 rounded-[14px] bg-gradient-to-br from-[#00c950] to-[#00a63e] p-3 shadow-lg transition-transform duration-200 hover:scale-110 animate-float"
                style={{ boxShadow: '0px 20px 12.5px rgba(0, 201, 80, 0.4)' }}
              >
                <img alt="" src={assets.analysisDot} className="h-5 w-5" />
              </div>
              <div
                className="absolute -left-3 -bottom-3 rounded-[14px] bg-gradient-to-br from-[#ad46ff] to-[#9810fa] p-3 shadow-lg transition-transform duration-200 hover:scale-110 animate-float-delayed"
                style={{ boxShadow: '0px 20px 12.5px rgba(173, 70, 255, 0.4)' }}
              >
                <img alt="" src={assets.analysisPulse} className="h-5 w-5" />
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-16 transition-colors duration-300 sm:px-6 lg:px-0 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-0 lg:px-8 xl:px-12">
          <SectionHeading
            badge="Masalah"
            tone="red"
            title={<>Kenapa Deteksi Dini<br className="hidden sm:block" /> Itu Penting?</>}
            subtitle="Disleksia sering terlambat terdeteksi, menyebabkan kesulitan belajar yang berkelanjutan"
          />
          <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3">
            {problemCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="theme-section-alt px-4 py-16 transition-colors duration-300 sm:px-6 lg:px-0 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-0 lg:px-8 xl:px-12">
          <SectionHeading
            badge="Solusi Kami"
            tone="purple"
            title={<>DyslexiaLens: Screening AI yang Mudah & Cepat</>}
            subtitle="Platform berbasis AI yang membantu deteksi dini tanda-tanda disleksia melalui analisis tulisan tangan"
          />
          <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3">
            {solutionCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--surface)] px-4 py-16 transition-colors duration-300 sm:px-6 lg:px-0 lg:py-24">
        <div className="mx-auto max-w-[1280px] px-0 lg:px-8 xl:px-12">
          <SectionHeading
            badge="Testimoni"
            tone="green"
            title="Dipercaya Ribuan Keluarga"
            subtitle="Cerita nyata dari orang tua dan guru yang telah terbantu"
          />
          <div className="mt-12 grid gap-6 lg:mt-14 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="theme-cta relative isolate overflow-hidden px-4 py-20 transition-colors duration-300 sm:px-6 lg:px-0 lg:py-28">
        <div className="absolute left-[12%] top-0 hidden h-96 w-96 rounded-full bg-white/10 blur-3xl lg:block" />
        <div className="absolute right-[10%] top-[12%] hidden h-96 w-96 rounded-full bg-white/10 blur-3xl lg:block" />
        <div className="absolute left-10 top-14 hidden rotate-12 rounded-[14px] border border-white/20 p-10 lg:block" />
        <div className="absolute right-6 top-[78%] hidden h-16 w-16 rounded-full border border-white/20 lg:block" />

        <div className="relative mx-auto max-w-[1024px] text-center text-white">
          <SectionBadge tone="blue">Lebih dari 10,000+ analisis dilakukan</SectionBadge>
          <h2 className="mt-8 text-3xl font-bold tracking-tight sm:text-5xl lg:text-[60px]">
            {isLoggedIn ? 'Lanjutkan Analisis Anda' : 'Siap Untuk Memulai?'}
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-white/90 sm:text-xl sm:leading-8">
            {isLoggedIn
              ? 'Unggah tulisan tangan baru untuk dianalisis oleh AI atau periksa perkembangan riwayat analisis Anda sebelumnya.'
              : 'Deteksi dini adalah kunci kesuksesan anak. Daftar gratis sekarang dan mulai analisis dalam 2 menit.'}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => navigate('/writing-tips')}
                  className="inline-flex h-14 min-w-[266px] items-center justify-center gap-3 rounded-[14px] bg-white text-[#155dfc] text-[18px] font-bold drop-shadow-[0px_25px_25px_rgba(0,0,0,0.25)] transition duration-200 hover:bg-white/95 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#155dfc]"
                >
                  <span>Upload Tulisan Sekarang</span>
                </button>

                <button
                  onClick={() => navigate('/history')}
                  className="inline-flex h-14 min-w-[266px] items-center justify-center rounded-[14px] border-[1.455px] border-[rgba(255,255,255,0.4)] bg-[rgba(255,255,255,0.2)] text-white text-[18px] font-semibold shadow-[0px_20px_25px_rgba(0,0,0,0.1),0px_8px_10px_rgba(0,0,0,0.1)] transition duration-200 hover:bg-white/25 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  <span>Lihat Riwayat Analisis</span>
                </button>
              </>
            ) : (
              <>
                <ActionButton
                  variant="cta"
                  size="lg"
                  loading={primaryLoading}
                  onClick={() => navigate('/register')}
                  className="whitespace-nowrap"
                >
                  Daftar & Mulai Sekarang
                </ActionButton>
                <ActionButton
                  variant="inverse"
                  size="lg"
                  loading={secondaryLoading}
                  onClick={() => navigate('/login')}
                >
                  Sudah Punya Akun?
                </ActionButton>
              </>
            )}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-white/90">
            {['Tidak perlu kartu kredit', '100% Gratis', 'Data aman'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <img alt="" src={assets.heroCheckWhite} className="h-4 w-4" aria-hidden />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`theme-disclaimer border-y px-4 py-6 transition-colors duration-300 sm:px-6 lg:px-0 ${theme === 'dark'
          ? 'border-[rgba(250,204,21,0.35)] bg-[rgba(250,204,21,0.14)]'
          : 'border-yellow-200 bg-yellow-50'
          }`}
      >
        <div className="mx-auto max-w-[1280px] px-0 lg:px-8 xl:px-12">
          <div className={`flex items-start justify-center gap-3 text-center ${theme === 'dark' ? 'text-[#fef08a]' : 'text-yellow-900'}`}>
            <img alt="" src={assets.disclaimerIcon} className="mt-1 h-5 w-5 flex-none" aria-hidden />
            <p className="text-sm leading-6">
              <strong>Disclaimer:</strong> DyslexiaLens adalah alat screening awal, bukan pengganti diagnosis medis
              profesional. Selalu konsultasikan dengan ahli untuk evaluasi klinis lengkap.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
