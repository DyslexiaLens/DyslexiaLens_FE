import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Button from '../components/ui/Button'

const successContent = {
  info: {
    title: 'Profil Berhasil Diperbarui!',
    subtitle: 'Informasi profil Anda telah berhasil disimpan.',
  },
  address: {
    title: 'Alamat Berhasil Disimpan!',
    subtitle: 'Informasi alamat Anda telah berhasil diperbarui.',
  },
  password: {
    title: 'Password Berhasil Diubah!',
    subtitle: 'Password Anda telah berhasil diperbarui. Gunakan password baru untuk login berikutnya.',
  },
}

function SuccessIcon({ isDark }) {
  return (
    <div className={`flex h-16 w-16 items-center justify-center rounded-full ${isDark ? 'bg-[rgba(16,185,129,0.16)]' : 'bg-[#dcfce7]'}`}>
      <svg viewBox="0 0 32 32" className={`h-10 w-10 ${isDark ? 'text-[#00e676]' : 'text-[#16a34a]'}`} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2.25" />
        <path d="M10.5 16.75L14.25 20.5L22 12.75" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  )
}

function SuccessCard({ variant }) {
  const { theme } = React.useContext(AppContext)
  const navigate = useNavigate()
  const isDark = theme === 'dark'
  const content = successContent[variant]

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      navigate('/profile', { replace: true })
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [navigate])

  const pageClass = isDark ? 'bg-[#101828]' : 'bg-[#e5e7eb]'
  const cardClass = isDark
    ? 'bg-[#243047] border-[#243047] text-white shadow-[0px_20px_40px_rgba(0,0,0,0.24)]'
    : 'bg-white border-[#e5e7eb] text-[#101828] shadow-[0px_20px_40px_rgba(15,23,42,0.12)]'

  return (
    <div className={`min-h-full px-4 py-10 transition-colors duration-300 sm:px-6 lg:px-0 lg:py-14 ${pageClass}`}>
      <div className="mx-auto flex min-h-full max-w-[960px] items-center justify-center">
        <section className={`w-full max-w-[440px] rounded-[20px] border px-6 py-8 text-center sm:px-8 sm:py-10 ${cardClass}`}>
          <div className="flex justify-center">
            <SuccessIcon isDark={isDark} />
          </div>
          <h1 className="mt-7 text-[22px] font-bold leading-tight sm:text-[24px]">{content.title}</h1>
          <p className={`mt-3 text-sm leading-6 sm:text-[15px] ${isDark ? 'text-[#9ca3af]' : 'text-[#6b7280]'}`}>
            {content.subtitle}
          </p>
          <p className={`mt-8 text-sm leading-6 ${isDark ? 'text-[#6b7280]' : 'text-[#64748b]'}`}>
            Mengarahkan ke halaman profil dalam 3 detik...
          </p>
          <div className="mt-6 flex justify-center">
            <Button
              variant="primary"
              size="sm"
              isDark={isDark}
              onClick={() => navigate('/profile')}
              className="!rounded-[8px] !h-10 px-5 text-sm font-medium"
            >
              Kembali ke Profil
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

export function ProfileInfoSuccessPage() {
  return <SuccessCard variant="info" />
}

export function ProfileAddressSuccessPage() {
  return <SuccessCard variant="address" />
}

export function ProfilePasswordSuccessPage() {
  return <SuccessCard variant="password" />
}