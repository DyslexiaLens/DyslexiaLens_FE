import React, { useState, useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import { assets, navigation } from './landing/landingContent'

// Import the specific assets requested for mobile view
import SunIcon from '../assets/Sun.svg'
import MoonIcon from '../assets/Moon.svg'
import SettingLight from '../assets/SettingLight.svg'
import SettingDark from '../assets/SettingDark.svg'
import AskLight from '../assets/AskLight.svg'
import AskDark from '../assets/AskDark.svg'
import HistoryDark from '../assets/HistoryDark.svg'
import HistoryLight from '../assets/HistoryLight.svg'
import { logout as logoutRequest } from '../services/authService'

export default function Header() {
  const { theme, toggleTheme, isLoggedIn, logout, user } = useContext(AppContext)
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile drawer when Escape key is pressed
  React.useEffect(() => {
    if (!isMobileMenuOpen) return
    const handleEscKey = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false)
    }
    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [isMobileMenuOpen])

  const handleLogout = async () => {
    try {
      await logoutRequest()
    } catch {
      // Ignore backend logout failures and clear local state anyway.
    }

    logout()
    setIsMobileMenuOpen(false)
    navigate('/')
  }

  const handleLinkClick = (path) => {
    setIsMobileMenuOpen(false)
    navigate(path)
  }

  // Common close icon (X) used in Figma for open navbars
  const closeIcon = (
    <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )

  // Common hamburger icon used in Figma for closed navbars
  const hamburgerIcon = (
    <svg className="w-6 h-6 text-[var(--text-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )

  return (
    <header className="theme-header sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300" role="banner">
      {/* ----------------- DESKTOP NAV (Width >= lg) ----------------- */}
      <div className="hidden lg:flex mx-auto max-w-[1280px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:flex-nowrap lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#2b7fff] to-[#9810fa] shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]">
            <img alt="" src={assets.logoMark} className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-[var(--text-primary)]">DyslexiaLens</span>
        </Link>

        <nav aria-label="Primary" className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <Link
              to="/help"
              className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[var(--text-secondary)] transition duration-200 hover:bg-white/10 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2"
              aria-label="Bantuan"
            >
              <img alt="" src={theme === 'dark' ? AskDark : AskLight} className="h-5 w-5" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[var(--text-secondary)] transition duration-200 hover:bg-white/10 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2"
              aria-label={theme === 'dark' ? 'Ganti ke mode terang' : 'Ganti ke mode gelap'}
            >
              <img
                alt=""
                src={theme === 'dark' ? SunIcon : MoonIcon}
                className="h-5 w-5"
                aria-hidden
              />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/history"
                  className="inline-flex h-9 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:bg-black/5 dark:hover:bg-white/5 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 8C2 9.18669 2.35189 10.3467 3.01118 11.3334C3.67047 12.3201 4.60754 13.0892 5.7039 13.5433C6.80026 13.9974 8.00666 14.1162 9.17054 13.8847C10.3344 13.6532 11.4035 13.0818 12.2426 12.2426C13.0818 11.4035 13.6532 10.3344 13.8847 9.17054C14.1162 8.00666 13.9974 6.80026 13.5433 5.7039C13.0892 4.60754 12.3201 3.67047 11.3334 3.01118C10.3467 2.35189 9.18669 2 8 2C6.32263 2.00631 4.71265 2.66082 3.50667 3.82667L2 5.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 2V5.33333H5.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 4.66667V8L10.6667 9.33333" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Riwayat</span>
                </Link>

                <Link
                  to="/writing-tips"
                  className="inline-flex h-9 items-center justify-center rounded-full bg-gradient-to-r from-[#155dfc] to-[#9810fa] px-4 text-sm font-semibold text-white drop-shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)] transition duration-200 hover:brightness-105 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2"
                >
                  <span>Mulai Analisis</span>
                </Link>

                <Link
                  to="/profile"
                  className="inline-flex h-9 items-center gap-2 rounded-[10px] bg-[#f3f4f6] dark:bg-[#364153] px-3 py-2 text-sm font-semibold text-[#101828] dark:text-white transition duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-label="Buka profil"
                >
                  <svg className="w-4 h-4 shrink-0 text-[#4a5565] dark:text-[#d1d5dc]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.6667 14V12.6667C12.6667 11.9594 12.3857 11.2811 11.8856 10.781C11.3855 10.281 10.7072 10 10 10H6C5.29276 10 4.61448 10.281 4.11438 10.781C3.61428 11.2811 3.33333 11.9594 3.33333 12.6667V14" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 7.33333C9.47276 7.33333 10.6667 6.13943 10.6667 4.66667C10.6667 3.19391 9.47276 2 8 2C6.52724 2 5.33333 3.19391 5.33333 4.66667C5.33333 6.13943 6.52724 7.33333 8 7.33333Z" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{user?.fullName || user?.name || 'Pengguna'}</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex h-9 items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--text-primary)] transition duration-200 hover:bg-red-500/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  aria-label="Keluar dari akun"
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M6 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M10.6667 11.3333L14 8L10.6667 4.66667" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 8H6" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Keluar</span>
                </button>
              </>
            ) : (
              navigation.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={
                    item.highlight
                      ? 'inline-flex h-9 items-center justify-center rounded-lg bg-gradient-to-r from-[#155dfc] to-[#2b7fff] px-4 text-sm font-semibold text-white shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] transition duration-200 hover:brightness-105 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2'
                      : 'inline-flex h-9 items-center justify-center rounded-lg border border-[var(--header-border)] px-4 text-sm font-medium text-[var(--text-primary)] transition duration-200 hover:bg-white/10 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2'
                  }
                >
                  {item.label}
                </Link>
              ))
            )}
          </div>
        </nav>
      </div>

      {/* ----------------- MOBILE NAV (Width < lg) ----------------- */}
      <div className="lg:hidden flex flex-col w-full relative">
        {/* Closed / Open Top Navbar matching 2:1422, 2:1865, 6:20728, etc. */}
        <div className={`flex h-[64px] items-center justify-between px-4 w-full transition-colors duration-300 ${theme === 'dark'
          ? 'bg-[rgba(30,41,57,0.8)] border-[#364153] border-b-[0.787px]'
          : 'bg-[rgba(255,255,255,0.8)] border-[#e5e7eb] border-b-[0.787px]'
          }`}>
          {/* Logo with Figma shadow & background gradient */}
          <Link to="/" className="flex items-center gap-2.5" onClick={() => setIsMobileMenuOpen(false)}>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-[10px] shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]"
              style={{ backgroundImage: 'linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(152, 16, 250) 100%)' }}
            >
              <img alt="" src={assets.logoMark} className="h-[20px] w-[20px]" />
            </div>
            <span className={`text-[18px] font-bold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>
              DyslexiaLens
            </span>
          </Link>

          {/* Menu Hamburger / Close Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex items-center justify-center h-11 w-11 rounded-[14px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2 hover:bg-black/5 dark:hover:bg-white/5"
            aria-label={isMobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
          >
            {isMobileMenuOpen ? closeIcon : hamburgerIcon}
          </button>
        </div>

        {/* Dropdown Menu Panel (Open Menu layout matching Figma) */}
        {isMobileMenuOpen && (
          <nav
            id="mobile-menu-panel"
            aria-label="Menu mobile"
            className={`absolute top-[64px] left-0 w-full z-40 flex flex-col border-b shadow-2xl backdrop-blur-xl transition-all duration-300 ${theme === 'dark'
              ? 'bg-[rgba(16,24,40,0.95)] border-[#364153]'
              : 'bg-[rgba(255,255,255,0.96)] border-[#e5e7eb]'
            }`}>
            <div className="flex flex-col w-full p-4 gap-6">

              {/* --- GUEST USER SLIDE (isLoggedIn = false) --- */}
              {!isLoggedIn && (
                <>
                  {/* Pengaturan Section */}
                  <div className={`border-t pt-4 ${theme === 'dark' ? 'border-[#364153]' : 'border-[#e5e7eb]'}`}>
                    <p className={`px-3 text-[12px] font-bold tracking-[0.6px] uppercase ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#6a7282]'}`}>
                      Pengaturan
                    </p>

                    <div className="flex flex-col mt-2 gap-1">
                      {/* Dark Mode toggle row */}
                      <button
                        type="button"
                        onClick={toggleTheme}
                        className="flex items-center justify-between w-full p-3 rounded-[14px] text-left hover:bg-black/5 dark:hover:bg-white/5 transition duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center h-9 w-9 rounded-[10px] ${theme === 'dark' ? 'bg-[#364153]' : 'bg-[#f3f4f6]'}`}>
                            <img alt="" src={theme === 'dark' ? SunIcon : MoonIcon} className="h-4 w-4" />
                          </div>
                          <span className={`text-[16px] font-semibold ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[#364153]'}`}>
                            Dark Mode
                          </span>
                        </div>
                        {/* Custom switch design */}
                        <div className={`relative h-[24px] w-[44px] rounded-full transition-colors duration-200 p-[2px] ${theme === 'dark' ? 'bg-[#2b7fff]' : 'bg-[#d1d5dc]'}`}>
                          <div className={`h-[20px] w-[20px] bg-white rounded-full shadow-md transform transition-transform duration-200 ${theme === 'dark' ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                        </div>
                      </button>

                      {/* Aksesibilitas button */}
                      <button
                        type="button"
                        onClick={() => handleLinkClick('/profile/accessibility')}
                        className="flex items-center gap-3 w-full p-3 rounded-[14px] text-left hover:bg-black/5 dark:hover:bg-white/5 transition duration-200"
                      >
                        <div className={`flex items-center justify-center h-9 w-9 rounded-[10px] ${theme === 'dark' ? 'bg-[#364153]' : 'bg-[#f3f4f6]'}`}>
                          <img alt="" src={theme === 'dark' ? SettingDark : SettingLight} className="h-4 w-4" />
                        </div>
                        <span className={`text-[16px] font-semibold ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[#364153]'}`}>
                          Aksesibilitas
                        </span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleLinkClick('/help')}
                        className="flex items-center gap-3 w-full p-3 rounded-[14px] text-left hover:bg-black/5 dark:hover:bg-white/5 transition duration-200"
                      >
                        <div className={`flex items-center justify-center h-9 w-9 rounded-[10px] ${theme === 'dark' ? 'bg-[#364153]' : 'bg-[#f3f4f6]'}`}>
                          <img alt="" src={theme === 'dark' ? AskDark : AskLight} className="h-4 w-4" />
                        </div>
                        <span className={`text-[16px] font-semibold ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[#364153]'}`}>
                          Bantuan
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Menu Utama section for Guest (Bantuan, Masuk, Daftar) */}
                  <div className={`border-t pt-4 ${theme === 'dark' ? 'border-[#364153]' : 'border-[#e5e7eb]'}`}>
                    {/* Authentication CTA layout exactly from Figma 6:20728 / 6:20729 */}
                    <button
                      type="button"
                      onClick={() => handleLinkClick('/login')}
                      className={`w-full py-3 text-center rounded-[14px] font-medium text-[16px] mt-2 transition active:scale-95 ${theme === 'dark' ? 'text-[#d1d5dc] hover:bg-white/5' : 'text-[#364153] hover:bg-black/5'
                        }`}
                    >
                      Masuk
                    </button>

                    <button
                      type="button"
                      onClick={() => handleLinkClick('/register')}
                      className="w-full py-3 text-center rounded-[14px] font-bold text-[16px] text-white shadow-md active:scale-95 transition"
                      style={{ backgroundImage: 'linear-gradient(90deg, #155dfc 0%, #9810fa 100%)' }}
                    >
                      Daftar Sekarang
                    </button>
                  </div>
                </>
              )}

              {/* --- LOGGED-IN USER SLIDE (isLoggedIn = true) --- */}
              {isLoggedIn && (
                <>
                  {/* User profile row matching Figma 11:35542 */}
                  <button
                    type="button"
                    onClick={() => handleLinkClick('/profile')}
                    className={`flex items-center gap-3 p-3 rounded-[14px] w-full text-left transition duration-200 border-b pb-4 ${theme === 'dark' ? 'border-[#364153] hover:bg-white/5' : 'border-[#e5e7eb] hover:bg-black/5'
                      }`}
                  >
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]"
                      style={{ backgroundImage: 'linear-gradient(135deg, rgb(43, 127, 255) 0%, rgb(152, 16, 250) 100%)' }}
                    >
                      <span className="text-[16px] font-bold text-white uppercase">
                        {(user?.name || 'test').charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className={`text-[14px] font-bold ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>
                        {user?.name || 'test'}
                      </p>
                      <p className={`text-[12px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#6a7282]'}`}>
                        Lihat profil
                      </p>
                    </div>
                  </button>

                  {/* Menu Utama section for logged-in user */}
                  <div>
                    <p className={`px-3 text-[12px] font-bold tracking-[0.6px] uppercase ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#6a7282]'}`}>
                      Menu Utama
                    </p>

                    <div className="flex flex-col mt-2 gap-2">
                      {/* Premium Mulai Analisis Button from Figma */}
                      <button
                        type="button"
                        onClick={() => handleLinkClick('/writing-tips')}
                        className="flex items-center justify-between w-full p-3 rounded-[14px] text-white shadow-md active:scale-[0.98] transition"
                        style={{ backgroundImage: 'linear-gradient(90deg, #155dfc 0%, #9810fa 100%)' }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-9 w-9 rounded-[10px] bg-white/20">
                            {/* Inline Scan icon */}
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h.01M16 12h.01M8 12h.01M4 8h16M4 16h16" />
                            </svg>
                          </div>
                          <span className="text-[16px] font-bold">Mulai Analisis</span>
                        </div>
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>

                      {/* Riwayat row with History icon */}
                      <button
                        type="button"
                        onClick={() => handleLinkClick('/history')}
                        className="flex items-center gap-3 w-full p-3 rounded-[14px] text-left hover:bg-black/5 dark:hover:bg-white/5 transition duration-200"
                      >
                        <div className={`flex items-center justify-center h-9 w-9 rounded-[10px] ${theme === 'dark' ? 'bg-[#364153]' : 'bg-[#f3f4f6]'}`}>
                          <img alt="" src={theme === 'dark' ? HistoryDark : HistoryLight} className="h-4 w-4" />
                        </div>
                        <span className={`text-[16px] font-semibold ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[#364153]'}`}>
                          Riwayat
                        </span>
                      </button>

                      {/* Support/Bantuan row */}
                      <button
                        type="button"
                        onClick={() => handleLinkClick('/help')}
                        className="flex items-center gap-3 w-full p-3 rounded-[14px] text-left hover:bg-black/5 dark:hover:bg-white/5 transition duration-200"
                      >
                        <div className={`flex items-center justify-center h-9 w-9 rounded-[10px] ${theme === 'dark' ? 'bg-[#364153]' : 'bg-[#f3f4f6]'}`}>
                          <img alt="" src={theme === 'dark' ? AskDark : AskLight} className="h-4 w-4" />
                        </div>
                        <span className={`text-[16px] font-semibold ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[#364153]'}`}>
                          Bantuan
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Pengaturan section for User */}
                  <div className={`border-t pt-4 ${theme === 'dark' ? 'border-[#364153]' : 'border-[#e5e7eb]'}`}>
                    <p className={`px-3 text-[12px] font-bold tracking-[0.6px] uppercase ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#6a7282]'}`}>
                      Pengaturan
                    </p>

                    <div className="flex flex-col mt-2 gap-1">
                      {/* Dark Mode toggle row */}
                      <button
                        type="button"
                        onClick={toggleTheme}
                        className="flex items-center justify-between w-full p-3 rounded-[14px] text-left hover:bg-black/5 dark:hover:bg-white/5 transition duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center h-9 w-9 rounded-[10px] ${theme === 'dark' ? 'bg-[#364153]' : 'bg-[#f3f4f6]'}`}>
                            <img alt="" src={theme === 'dark' ? SunIcon : MoonIcon} className="h-4 w-4" />
                          </div>
                          <span className={`text-[16px] font-semibold ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[#364153]'}`}>
                            Dark Mode
                          </span>
                        </div>
                        <div className={`relative h-[24px] w-[44px] rounded-full transition-colors duration-200 p-[2px] ${theme === 'dark' ? 'bg-[#2b7fff]' : 'bg-[#d1d5dc]'}`}>
                          <div className={`h-[20px] w-[20px] bg-white rounded-full shadow-md transform transition-transform duration-200 ${theme === 'dark' ? 'translate-x-[20px]' : 'translate-x-0'}`} />
                        </div>
                      </button>

                      {/* Aksesibilitas link */}
                      <button
                        type="button"
                        onClick={() => handleLinkClick('/profile/accessibility')}
                        className="flex items-center gap-3 w-full p-3 rounded-[14px] text-left hover:bg-black/5 dark:hover:bg-white/5 transition duration-200"
                      >
                        <div className={`flex items-center justify-center h-9 w-9 rounded-[10px] ${theme === 'dark' ? 'bg-[#364153]' : 'bg-[#f3f4f6]'}`}>
                          <img alt="" src={theme === 'dark' ? SettingDark : SettingLight} className="h-4 w-4" />
                        </div>
                        <span className={`text-[16px] font-semibold ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[#364153]'}`}>
                          Aksesibilitas
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Log Out button matching Figma red style footer */}
                  <div className={`border-t pt-4 ${theme === 'dark' ? 'border-[#364153]' : 'border-[#e5e7eb]'}`}>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex items-center gap-2 py-3 px-6 justify-center rounded-[14px] transition active:scale-95 duration-200"
                    >
                      {/* Logout icon */}
                      <svg className={`w-4 h-4 ${theme === 'dark' ? 'text-[#ff6467]' : 'text-[#e7000b]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className={`text-[16px] font-bold ${theme === 'dark' ? 'text-[#ff6467]' : 'text-[#e7000b]'}`}>
                        Keluar
                      </span>
                    </button>
                  </div>
                </>
              )}

            </div>
          </nav>
        )}
      </div>
    </header>
  )
}


