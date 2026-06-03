import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets, footerLinks } from './landing/landingContent'

export default function Footer() {
  const { theme, isLoggedIn } = React.useContext(AppContext)
  const navigate = useNavigate()

  const handleProductClick = (item, e) => {
    e.preventDefault()
    if (item === 'Mulai Analisis') {
      navigate(isLoggedIn ? '/writing-tips' : '/login')
    } else if (item === 'Riwayat') {
      navigate(isLoggedIn ? '/history' : '/login')
    } else if (item === 'Bantuan') {
      navigate('/help')
    }
  }

  const handleCompanyClick = (item, e) => {
    e.preventDefault()
    navigate('/')
  }

  return (
    <footer className="theme-footer border-t transition-colors duration-300">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr]">
          <div className="max-w-sm">
            <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }} className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#2b7fff] to-[#9810fa] shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]">
                <img alt="" src={assets.logoMark} className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold text-[var(--text-primary)]">DyslexiaLens</span>
            </a>
            <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
              Deteksi dini disleksia dengan AI untuk masa depan yang lebih cerah.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.7px] text-[var(--text-primary)]">Produk</h3>
            <ul className="mt-6 space-y-3 text-sm text-[var(--text-secondary)]">
              {footerLinks.products.map((item) => (
                <li key={item}>
                  <a
                    href="#home"
                    onClick={(e) => handleProductClick(item, e)}
                    className="transition duration-200 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.7px] text-[var(--text-primary)]">Perusahaan</h3>
            <ul className="mt-6 space-y-3 text-sm text-[var(--text-secondary)]">
              {footerLinks.company.map((item) => (
                <li key={item}>
                  <a
                    href="#home"
                    onClick={(e) => handleCompanyClick(item, e)}
                    className="transition duration-200 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.7px] text-[var(--text-primary)]">Kontak</h3>
            <p className="mt-6 flex items-center gap-3 text-sm text-[var(--text-secondary)]">
              <img alt="" src={assets.footerMail} className="h-4 w-4" aria-hidden />
              dyslexialens79@gmail.com
            </p>
            <div className="mt-8 flex gap-3">
              {[
                {
                  label: 'Email',
                  href: 'mailto:dyslexialens79@gmail.com',
                  icon: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ),
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/DyslexiaLens',
                  icon: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={label === 'GitHub' ? '_blank' : undefined}
                  rel={label === 'GitHub' ? 'noopener noreferrer' : undefined}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--surface-muted)] text-[var(--text-secondary)] transition duration-200 hover:bg-white/10 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--footer-border)] pt-8 text-center">
          <p className="text-sm font-medium text-[var(--text-secondary)]">© 2026 DyslexiaLens. All rights reserved.</p>
          <p className={`mt-2 text-xs ${theme === 'dark' ? 'text-[var(--text-secondary)]' : 'text-[#6a7282]'}`}>
            Ini bukan diagnosis medis. Konsultasikan dengan profesional untuk evaluasi klinis.
          </p>
        </div>
      </div>
    </footer>
  )
}
