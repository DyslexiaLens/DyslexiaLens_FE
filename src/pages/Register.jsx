import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../components/landing/landingContent'
import EmailIcon from '../assets/Email.svg'
import LockIcon from '../assets/Locksvg.svg'
import EyeIcon from '../assets/Eye.svg'
import RedX from '../assets/RedX.svg'
import { AppContext } from '../context/AppContext'
import PasswordStrength from '../components/PasswordStrength'
import Button from '../components/ui/Button'
import { register } from '../services/authService'

const initialFieldErrors = {
  name: '',
  email: '',
  password: '',
  confirm: '',
}

export default function Register() {
  const navigate = useNavigate()
  const { theme } = React.useContext(AppContext)
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirm, setConfirm] = React.useState('')
  const [agreed, setAgreed] = React.useState(true)
  const [showPassword, setShowPassword] = React.useState(false)
  const [errors, setErrors] = React.useState(initialFieldErrors)
  const [authError, setAuthError] = React.useState(null)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [successEmail, setSuccessEmail] = React.useState('')
  const [countdown, setCountdown] = React.useState(3)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!isSuccess) return
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          navigate('/login')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [isSuccess, navigate])

  const inputClassName = (hasError) => {
    const base = 'w-full h-[49.455px] rounded-[10px] py-[12px] text-[16px] focus:outline-none focus:ring-2 focus:ring-[#2b7fff] focus:ring-offset-2 transition-colors'
    const themeClass =
      theme === 'dark'
        ? 'bg-[#364153] text-[rgba(255,255,255,0.9)] placeholder:text-[rgba(255,255,255,0.5)]'
        : 'bg-white text-[rgba(16,24,40,0.85)] placeholder:text-[rgba(16,24,40,0.5)]'
    const borderClass = hasError
      ? 'border-[#e7000b] border-[0.727px]'
      : theme === 'dark'
        ? 'border-[#4a5565] border-[0.727px]'
        : 'border-[#d1d5dc] border-[0.727px]'

    return `${base} ${themeClass} ${borderClass}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    const nextErrors = {}
    const trimmedName = name.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName) {
      nextErrors.name = 'Nama tidak boleh kosong'
    } else if (trimmedName.length < 3) {
      nextErrors.name = 'Nama minimal 3 karakter'
    } else if (trimmedName.length > 50) {
      nextErrors.name = 'Nama maksimal 50 karakter'
    } else if (/^\d+$/.test(trimmedName)) {
      nextErrors.name = 'Nama tidak boleh hanya angka'
    } else if (!/^[a-zA-Z\s-]+$/.test(trimmedName)) {
      nextErrors.name = 'Nama hanya boleh huruf, spasi, dan tanda hubung'
    }
    if (!trimmedEmail) nextErrors.email = 'Email tidak boleh kosong'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) nextErrors.email = 'Format email tidak valid'

    if (!password) nextErrors.password = 'Password tidak boleh kosong'
    else if (password.length < 8) nextErrors.password = 'Password minimal 8 karakter'
    else if (!(/[a-z]/i.test(password) && /\d/.test(password))) {
      nextErrors.password = 'Password harus mengandung huruf dan angka'
    }

    if (!confirm) nextErrors.confirm = 'Konfirmasi password tidak boleh kosong'
    else if (password !== confirm) nextErrors.confirm = 'Password tidak cocok'

    if (!agreed) {
      setAuthError({
        title: 'Pendaftaran Gagal',
        message: 'Anda harus menyetujui syarat dan ketentuan',
      })
      setErrors(nextErrors)
      return
    }

    setErrors(nextErrors) 

    if (Object.keys(nextErrors).length === 0) { 
      try { 
        setLoading(true) 
        setAuthError(null) 

        await register({ 
          fullName: trimmedName, 
          email: trimmedEmail, 
          password, 
        }) 

        setSuccessEmail(trimmedEmail) 
        setIsSuccess(true) 
      } catch (error) { 
        const status = error.response?.status 
        const message = error.response?.data?.message 
        const validationMessage = Array.isArray(error.response?.data?.errors)
          ? error.response.data.errors[0]?.msg
          : null

        if (status === 409) { 
          setAuthError({ 
            type: 'exists', 
            title: 'Email Sudah Terdaftar', 
            message: 'Email sudah terdaftar. Silakan gunakan email lain atau login ke akun Anda.', 
          }) 
        } else if (status === 400) {
          setAuthError({
            type: 'validation',
            title: 'Input Tidak Valid',
            message: validationMessage || message || 'Periksa kembali data registrasi Anda.',
          })
        } else if (!error.response) { 
          setAuthError({ 
            type: 'connection', 
            title: 'Masalah Koneksi', 
            message: 'Koneksi bermasalah. Periksa internet lalu coba lagi.', 
          }) 
        } else { 
          setAuthError({ 
            title: 'Pendaftaran Gagal', 
            message: message || 'Terjadi kesalahan. Silakan coba lagi.',
          })
        }
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className={`min-h-screen px-4 py-8 sm:py-10 transition-colors duration-300 ${theme === 'dark' ? '' : 'bg-[#E5E7EB]'}`}>
      <div className="relative mx-auto w-full max-w-[448px]">
        <Link to="/" className={`mb-4 flex items-center gap-2 text-[16px] ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[var(--text-secondary)]'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-ml-1">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali
        </Link>

        {!isSuccess ? (
          <div className={`rounded-[16px] ${theme === 'dark' ? 'bg-[#1e2939] text-white' : 'bg-white text-[var(--text-primary)]'} drop-shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)]`}>
          <div className="px-5 sm:px-8 pt-6 sm:pt-8">
            <div className="flex justify-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#2b7fff] to-[#9810fa]">
                <img alt="logo" src={assets.logoMark} className="h-5 w-5" />
              </div>
            </div>

            <h1 className={`mt-6 text-center text-[30px] font-semibold leading-[36px] ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>Buat Akun Baru</h1>
            <p className={`mt-2 text-center text-[16px] leading-[24px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[var(--text-secondary)]'}`}>Daftar gratis sekarang</p>
          </div>

          <form onSubmit={handleSubmit} className="px-5 sm:px-8 pb-6 sm:pb-8 pt-4 sm:pt-6">
            {authError && (
              <div className={`rounded-[14px] p-4 border-[0.727px] ${
                authError.type === 'exists'
                  ? (theme === 'dark' ? 'bg-[rgba(28,57,142,0.2)] border-[#1447e6]' : 'bg-[#eff6ff] border-[#51a2ff]')
                  : authError.type === 'connection'
                  ? (theme === 'dark' ? 'bg-[rgba(115,62,10,0.2)] border-[#a65f00]' : 'bg-[#fefce8] border-[#fdc700]')
                  : (theme === 'dark' ? 'bg-[rgba(130,24,26,0.2)] border-[#c10007]' : 'bg-[#fef2f2] border-[#ff6467]')
              }`}>
                <div className="flex items-start gap-3">
                  {authError.type === 'exists' ? (
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 mt-0.5 shrink-0 ${
                        theme === 'dark' ? 'text-[#51a2ff]' : 'text-[#1447e6]'
                      }`}
                    >
                      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M10 9v4M10 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  ) : authError.type === 'connection' ? (
                    <svg 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 mt-0.5 shrink-0 ${
                        theme === 'dark' ? 'text-[#fdc700]' : 'text-[#a65f00]'
                      }`}
                    >
                      <path d="M10 3.3L2.5 15.8h15L10 3.3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 7.5v4.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      <circle cx="10" cy="13.3" r="0.8" fill="currentColor"/>
                    </svg>
                  ) : (
                    <img src={RedX} alt="error" className="h-5 w-5 mt-0.5 shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className={`font-semibold text-[14px] leading-[20px] ${
                      authError.type === 'exists'
                        ? (theme === 'dark' ? 'text-[#8ec5ff]' : 'text-[#193cb8]')
                        : authError.type === 'connection'
                        ? (theme === 'dark' ? 'text-[#ffdf20]' : 'text-[#894b00]')
                        : (theme === 'dark' ? 'text-[#ffa2a2]' : 'text-[#9f0712]')
                    }`}>
                      {authError.title}
                    </h3>
                    <p className={`mt-1 text-[14px] leading-[20px] ${
                      authError.type === 'exists'
                        ? (theme === 'dark' ? 'text-[#51a2ff]' : 'text-[#1447e6]')
                        : authError.type === 'connection'
                        ? (theme === 'dark' ? 'text-[#fdc700]' : 'text-[#a65f00]')
                        : (theme === 'dark' ? 'text-[#ff6467]' : 'text-[#c10007]')
                    }`}>
                      {authError.message}
                    </p>
                    {authError.type === 'exists' && (
                      <Link 
                        to="/login" 
                        className={`mt-2 inline-flex items-center gap-1 font-semibold text-[14px] leading-[20px] transition-opacity hover:opacity-85 ${
                          theme === 'dark' ? 'text-[#51a2ff]' : 'text-[#155dfc]'
                        }`}
                      >
                        Login ke akun Anda
                        <svg 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="mt-[1px]"
                        >
                          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div>
                <label className={`mb-2 block text-[14px] font-medium leading-[20px] ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>Nama</label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={theme === 'dark' ? 'text-[#99a1af]' : 'text-[#98a2b3]'}>
                      <path d="M16.5 17.5a6.5 6.5 0 1 0-13 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="10" cy="6.5" r="3" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Nama lengkap"
                    disabled={loading}
                    className={`pl-[44px] pr-4 ${inputClassName(Boolean(errors.name))}`}
                  />
                </div>
                {errors.name && <p className="mt-2 text-[14px] leading-[20px] text-[#e7000b]">{errors.name}</p>}
              </div>

              <div>
                <label className={`mb-2 block text-[14px] font-medium leading-[20px] ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>Email</label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={EmailIcon} alt="email" className="h-5 w-5 opacity-70" />
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="nama@email.com"
                    disabled={loading}
                    className={`pl-[44px] pr-4 ${inputClassName(Boolean(errors.email))}`}
                  />
                </div>
                {errors.email && <p className="mt-2 text-[14px] leading-[20px] text-[#e7000b]">{errors.email}</p>}
              </div>

              <div>
                <label className={`mb-2 block text-[14px] font-medium leading-[20px] ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>Password</label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={LockIcon} alt="lock" className="h-5 w-5 opacity-70" />
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Min. 6 karakter, huruf & angka"
                    disabled={loading}
                    className={`pl-[44px] pr-[48px] ${inputClassName(Boolean(errors.password))}`}
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    onClick={() => setShowPassword((current) => !current)}
                    disabled={loading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-1 rounded"
                  >
                    <img src={EyeIcon} alt="toggle password" className="h-5 w-5 opacity-70" />
                  </button>
                </div>
                <PasswordStrength password={password} theme={theme} />
                {errors.password && <p className="mt-2 text-[14px] leading-[20px] text-[#e7000b]">{errors.password}</p>}
              </div>

              <div>
                <label className={`mb-2 block text-[14px] font-medium leading-[20px] ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>Konfirmasi Password</label>
                <div className="relative">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={LockIcon} alt="lock" className="h-5 w-5 opacity-70" />
                  </div>
                  <input
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    type="password"
                    placeholder="Ulangi password"
                    disabled={loading}
                    className={`pl-[44px] pr-4 ${inputClassName(Boolean(errors.confirm))}`}
                  />
                </div>
                {errors.confirm && <p className="mt-2 text-[14px] leading-[20px] text-[#e7000b]">{errors.confirm}</p>}
              </div>

              <label className="flex items-start gap-3 pt-1">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => !loading && setAgreed(e.target.checked)}
                  disabled={loading}
                  className="sr-only peer"
                />
                <span
                  aria-hidden="true"
                  className={`mt-1 inline-flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-[2px] border peer-focus-visible:ring-2 peer-focus-visible:ring-[#2b7fff] peer-focus-visible:ring-offset-2 ${agreed ? 'border-[#2b7fff] bg-[#2b7fff]' : theme === 'dark' ? 'border-[#4a5565] bg-[#0f1720]' : 'border-[#d1d5dc] bg-white'} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {agreed && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 3.5L3.25 5.75L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </span>
                <span className={`text-[14px] font-medium leading-[20px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>
                  Saya setuju dengan syarat dan ketentuan
                </span>
              </label>

              <Button
                type="submit"
                loading={loading}
                isDark={theme === 'dark'}
                className="w-full h-11"
              >
                Daftar Sekarang
              </Button>
            </div>

            <div className={`mt-6 text-center text-[16px] leading-[24px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[var(--text-secondary)]'}`}>
              Sudah punya akun? <Link to="/login" className="font-medium text-[#2b7fff]">Masuk</Link>
            </div>

            <div className={`mt-6 rounded-[14px] border-[0.727px] px-[16.727px] py-[16.727px] ${theme === 'dark' ? 'border-[#193cb8] bg-[rgba(28,57,142,0.2)]' : 'border-[#bedbff] bg-[#eff6ff]'}`}>
              <p className={`text-[14px] font-semibold leading-[20px] ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>Informasi Pendaftaran:</p>
              <div className={`mt-2 space-y-1 text-[12px] leading-[16px] ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[#364153]'}`}>
                <p>• Gunakan email aktif dan password yang kuat.</p>
                <p>• Jika email sudah terdaftar, backend akan menolak pendaftaran.</p>
                <p>• Setelah berhasil, Anda bisa langsung login dengan akun baru.</p>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div className={`rounded-[16px] p-8 ${theme === 'dark' ? 'bg-[#1e2939] text-white' : 'bg-white text-[var(--text-primary)]'} drop-shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)]`}>
          <div className="flex flex-col items-center py-8">
            {/* Green checkmark wrapper */}
            <div 
              className={`h-16 w-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                theme === 'dark' ? 'bg-[rgba(13,84,43,0.3)] text-[#00c950]' : 'bg-[#dcfce7] text-[#0db14b]'
              }`}
            >
              <svg 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            {/* Title */}
            <h2 className={`mt-6 text-center text-[24px] font-semibold leading-[32px] ${
              theme === 'dark' ? 'text-white' : 'text-[#101828]'
            }`}>
              Akun Berhasil Dibuat!
            </h2>

            {/* Message 1: Email sent */}
            <p className={`mt-3 text-center text-[16px] leading-[24px] font-normal ${
              theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'
            }`}>
              Email verifikasi telah dikirim ke <span className="font-semibold">{successEmail}</span>
            </p>

            {/* Message 2: Check instructions */}
            <p className="mt-3 text-center text-[14px] leading-[20px] text-[#6a7282] max-w-[320px]">
              Silakan cek inbox Anda dan klik link verifikasi untuk mengaktifkan akun.
            </p>

            {/* Message 3: Redirect timer */}
            <p className="mt-8 text-center text-[14px] leading-[20px] text-[#6a7282]">
              Mengarahkan ke halaman login dalam {countdown} detik...
            </p>
          </div>
        </div>
      )}
      </div>
    </div>
  )
}
