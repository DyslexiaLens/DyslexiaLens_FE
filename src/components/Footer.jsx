import React from 'react'
import { AppContext } from '../context/AppContext'
import { assets, footerLinks } from './landing/landingContent'

export default function Footer() {
  const { theme } = React.useContext(AppContext)

  return (
    <footer className="theme-footer border-t transition-colors duration-300">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.9fr]">
          <div className="max-w-sm">
            <a href="#home" className="flex items-center gap-3">
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
              support@dyslexialens.com
            </p>
            <div className="mt-8 flex gap-3">
              {[
                { label: 'Twitter', src: theme === 'dark' ? assets.footerSocial1Dark : assets.footerSocial1 },
                { label: 'GitHub', src: theme === 'dark' ? assets.footerSocial2Dark : assets.footerSocial2 },
              ].map(({ label, src }) => (
                <a
                  key={label}
                  href="#home"
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[var(--surface-muted)] text-[var(--text-secondary)] transition duration-200 hover:bg-white/10 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  aria-label={label}
                >
                  <img alt="" src={src} className="h-4 w-4" aria-hidden />
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
