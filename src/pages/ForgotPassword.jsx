import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import EmailIcon from '../assets/Email.svg'
import LockIcon from '../assets/Locksvg.svg'
import EyeIcon from '../assets/Eye.svg'
import RedX from '../assets/RedX.svg'
import { AppContext } from '../context/AppContext'
import PasswordStrength from '../components/PasswordStrength'
import Button from '../components/ui/Button'
import { forgotPassword, resetPassword, verifyOtp } from '../services/authService'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const { theme } = React.useContext(AppContext)

  // Step state: 1 (Email), 2 (OTP), 3 (New Password), 4 (Success Screen)
  const [step, setStep] = React.useState(1)

  // Form Field States
  const [email, setEmail] = React.useState('')
  const [otp, setOtp] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirm, setConfirm] = React.useState('')

  // UI Error / Banner States
  const [errors, setErrors] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  const [authError, setAuthError] = React.useState(null)
  const [otpError, setOtpError] = React.useState(null)
  const [resendNotice, setResendNotice] = useState('');
  const [resetError, setResetError] = React.useState(null)

  // Interactive flow states
  const [successEmail, setSuccessEmail] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [countdown, setCountdown] = React.useState(3)

  // Success Countdown Loop
  React.useEffect(() => {
    if (step !== 4) return
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
  }, [step, navigate])

  // Unified Input border and background styling class generator
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

  // Unified OTP input border and background styling class generator
  const otpInputClassName = (hasError) => {
    const base = 'w-full h-[57.455px] rounded-[10px] px-4 py-[12px] text-[24px] font-mono tracking-[2.4px] text-center focus:outline-none focus:ring-2 focus:ring-[#2b7fff] focus:ring-offset-2 transition-colors'
    const themeClass =
      theme === 'dark'
        ? 'bg-[#364153] text-[rgba(255,255,255,0.9)] placeholder:text-[rgba(255,255,255,0.3)]'
        : 'bg-white text-[rgba(16,24,40,0.85)] placeholder:text-[rgba(16,24,40,0.35)]'
    const borderClass = hasError
      ? 'border-[#e7000b] border-[0.727px]'
      : theme === 'dark'
        ? 'border-[#4a5565] border-[0.727px]'
        : 'border-[#d1d5dc] border-[0.727px]'

    return `${base} ${themeClass} ${borderClass}`
  }

  // Handle Step 1 (Request OTP) Submit
  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    setErrors({})
    setAuthError(null)

    const trimmedEmail = email.trim()

    if (!trimmedEmail) {
      setErrors({ email: 'Email tidak boleh kosong' })
      return
    }

    setLoading(true)

    try {
      await forgotPassword({ email: trimmedEmail })
      setSuccessEmail(trimmedEmail)
      setStep(2)
    } catch (error) {
      const status = error.response?.status

      setAuthError({
        type: status >= 500 ? 'server' : 'invalid',
        title: status >= 500 ? 'Server Bermasalah' : 'Permintaan Gagal',
        message: error.response?.data?.message || 'Terjadi kesalahan saat mengirim OTP.',
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle Step 2 (Verify OTP) Submit
  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    setOtpError(null)

    const trimmedOtp = otp.trim()

    if (!trimmedOtp) {
      setOtpError({
        type: 'invalid',
        title: 'Verifikasi Gagal',
        message: 'OTP tidak boleh kosong. Silakan masukkan kode OTP Anda.'
      })
      return
    }

    setLoading(true)

    try {
      await verifyOtp({
        email: successEmail,
        otpCode: trimmedOtp,
      })
      setStep(3)
    } catch (error) {
      setOtpError({
        type: 'invalid',
        title: 'OTP Salah',
        message: error.response?.data?.message || 'OTP salah atau sudah kadaluarsa.',
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle Step 3 (Reset Password) Submit
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (loading) return

    setResetError(null)
    const nextErrors = {}

    if (!password) {
      nextErrors.password = 'Password baru tidak boleh kosong'
    } else if (password.length < 6) {
      nextErrors.password = 'Password minimal 6 karakter'
    } else if (!(/[a-z]/i.test(password) && /\d/.test(password))) {
      nextErrors.password = 'Password harus mengandung huruf dan angka'
    }

    if (!confirm) {
      nextErrors.confirm = 'Konfirmasi password tidak boleh kosong'
    } else if (password !== confirm) {
      nextErrors.confirm = 'Password tidak cocok'
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    setLoading(true)

    try {
      await resetPassword({
        email: successEmail,
        otpCode: otp.trim(),
        newPassword: password,
      })
      setStep(4)
    } catch (error) {
      setResetError(error.response?.data?.message || 'Gagal mereset password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-start justify-center py-20 px-4 transition-colors duration-300 ${theme === 'dark' ? '' : 'bg-[#E5E7EB]'}`}>
      <div className="w-full max-w-[448px] relative">
        {/* Back Link */}
        {step === 1 && (
          <Link to="/login" className={`flex items-center gap-2 mb-4 transition-opacity hover:opacity-85 ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[var(--text-secondary)]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-ml-1">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali ke Login
          </Link>
        )}

        {step === 2 && (
          <button 
            type="button" 
            onClick={() => {
              setOtpError(null)
              setStep(1)
            }}
            className={`flex items-center gap-2 mb-4 transition-opacity hover:opacity-85 ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[var(--text-secondary)]'}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-ml-1">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali
          </button>
        )}

        {step === 3 && (
          <button 
            type="button" 
            onClick={() => {
              setResetError(null)
              setStep(2)
            }}
            className={`flex items-center gap-2 mb-4 transition-opacity hover:opacity-85 ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[var(--text-secondary)]'}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-ml-1">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Kembali
          </button>
        )}

        {/* ================= STEP 1: REQUEST EMAIL ================= */}
        {step === 1 && (
          <div className={`${theme === 'dark' ? 'bg-[#1e2939] text-white' : 'bg-white text-[var(--text-primary)]'} rounded-[16px] drop-shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)]`}>
            {/* Header Content */}
            <div className="px-5 sm:px-8 pt-6 sm:pt-8">
              <div className="flex items-center justify-center">
                {/* Padlock Icon Container */}
                <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-[rgba(28,57,142,0.3)] text-[#8ec5ff]' : 'bg-[#dbeafe] text-[#1447e6]'
                }`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17V14M12 14C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>

              <h1 className="mt-6 text-[30px] font-semibold text-center leading-[36px]">Lupa Password?</h1>
              <p className={`mt-2 text-[16px] text-center leading-[24px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>
                Masukkan email Anda untuk menerima kode OTP
              </p>
            </div>

            {/* Request OTP Form */}
            <form onSubmit={handleEmailSubmit} className="px-5 sm:px-8 pb-6 sm:pb-8 pt-4 sm:pt-6">
              {/* Standardized Alert Banners */}
              {authError && (
                <div className={`mb-4 rounded-[14px] p-4 border-[0.727px] ${
                  authError.type === 'connection'
                    ? (theme === 'dark' ? 'bg-[rgba(115,62,10,0.2)] border-[#a65f00]' : 'bg-[#fefce8] border-[#fdc700]')
                    : (theme === 'dark' ? 'bg-[rgba(130,24,26,0.2)] border-[#c10007]' : 'bg-[#fef2f2] border-[#ff6467]')
                }`}>
                  <div className="flex items-start gap-3">
                    {authError.type === 'connection' ? (
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
                        authError.type === 'connection'
                          ? (theme === 'dark' ? 'text-[#ffdf20]' : 'text-[#894b00]')
                          : (theme === 'dark' ? 'text-[#ffa2a2]' : 'text-[#9f0712]')
                      }`}>
                        {authError.title}
                      </h3>
                      <p className={`mt-1 text-[14px] leading-[20px] ${
                        authError.type === 'connection'
                          ? (theme === 'dark' ? 'text-[#fdc700]' : 'text-[#a65f00]')
                          : (theme === 'dark' ? 'text-[#ff6467]' : 'text-[#c10007]')
                      }`}>
                        {authError.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Input */}
              <div className="space-y-5">
                <div>
                  <label className={`block text-[14px] font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>Email</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                      <img src={EmailIcon} alt="email" className="h-5 w-5 opacity-70" />
                    </div>
                    <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    placeholder="nama@email.com"
                    disabled={loading}
                    className={`pl-[44px] pr-4 ${inputClassName(Boolean(errors.email))}`}
                  />
                </div>
                {errors.email ? (
                  <p className="mt-2 text-[14px] text-[#e7000b]">{errors.email}</p>
                ) : (
                  <p className={`mt-2 text-[12px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#6a7282]'}`}>
                    Kode OTP akan dikirim ke email ini
                  </p>
                )}
              </div>

              <Button
                type="submit"
                loading={loading}
                isDark={theme === 'dark'}
                className="w-full h-11"
              >
                Kirim OTP
              </Button>
            </div>

              {/* Back to Login Links */}
              <div className="mt-6 text-center text-[14px]">
                <span className={theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'}>Ingat password Anda? </span>
                <Link to="/login" className="font-semibold text-[#2b7fff] hover:text-[#155dfc] transition-colors">Login di sini</Link>
              </div>

              {/* Flow Guide Card */}
              <div className={`mt-[24px] rounded-[10px] border-[0.727px] px-[16.727px] py-[16.727px] ${
                theme === 'dark' 
                  ? 'border-[#4a5565] bg-[rgba(54,65,83,0.5)] text-[#d1d5dc]' 
                  : 'border-[#d1d5dc] bg-[#f3f4f6] text-[#364153]'
              }`}>
                <p className="text-[12px] font-semibold leading-[16px]">Alur reset password:</p>
                <div className={`mt-2 space-y-1 text-[12px] leading-[16px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>• Backend akan mengirim OTP ke email yang terdaftar.</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>• Masukkan OTP untuk lanjut ke langkah password baru.</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>• Password baru disimpan melalui backend setelah OTP valid.</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 2: VERIFY OTP ================= */}
        {step === 2 && (
          <div className={`${theme === 'dark' ? 'bg-[#1e2939] text-white' : 'bg-white text-[var(--text-primary)]'} rounded-[16px] drop-shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)]`}>
            {/* Header Content */}
            <div className="px-5 sm:px-8 pt-6 sm:pt-8 text-center">
              <h1 className="text-[30px] font-semibold leading-[36px]">Masukkan Kode OTP</h1>
              <p className={`mt-2 text-[16px] leading-[24px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>
                Kode OTP telah dikirim ke <span className="font-semibold text-[var(--text-primary)]" style={{ color: theme === 'dark' ? 'white' : '#101828' }}>{successEmail}</span>
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleOtpSubmit} className="px-5 sm:px-8 pb-6 sm:pb-8 pt-4 sm:pt-6">
              {/* 1. Connections Warning Yellow Box (Figma Node 8-22462 & 8-22561 stylized aligned to existing theme system) */}
              {otpError && otpError.type === 'connection' && (
                <div className={`mb-4 rounded-[14px] p-4 border-[0.727px] relative ${
                  theme === 'dark' 
                    ? 'bg-[rgba(115,62,10,0.2)] border-[#a65f00]' 
                    : 'bg-[#fefce8] border-[#fdc700]'
                }`}>
                  <div className="flex items-start gap-3">
                    {/* warning triangle vector */}
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
                    <div className="flex-1 pr-6">
                      <h3 className={`font-semibold text-[14px] leading-[20px] ${
                        theme === 'dark' ? 'text-[#ffdf20]' : 'text-[#894b00]'
                      }`}>
                        {otpError.title}
                      </h3>
                      <p className={`mt-1 text-[14px] leading-[20px] ${
                        theme === 'dark' ? 'text-[#fdc700]' : 'text-[#a65f00]'
                      }`}>
                        {otpError.message}
                      </p>
                    </div>
                    {/* Close dismiss trigger */}
                    <button 
                      type="button" 
                      onClick={() => setOtpError(null)} 
                      className="absolute right-3 top-3 opacity-60 hover:opacity-100 transition-opacity"
                      aria-label="Tutup"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={theme === 'dark' ? 'text-[#fdc700]' : 'text-[#a65f00]'}>
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* 2. Validation / Incorrect OTP Red Alert Box (Figma Node 8-22888 & 8-22805 stylized aligned to existing theme system) */}
              {otpError && otpError.type === 'invalid' && (
                <div className={`mb-4 rounded-[14px] p-4 border-[0.727px] ${
                  theme === 'dark' 
                    ? 'bg-[rgba(130,24,26,0.2)] border-[#c10007]' 
                    : 'bg-[#fef2f2] border-[#ff6467]'
                }`}>
                  <div className="flex items-start gap-3">
                    <img src={RedX} alt="error" className="h-5 w-5 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className={`font-semibold text-[14px] leading-[20px] ${
                        theme === 'dark' ? 'text-[#ffa2a2]' : 'text-[#9f0712]'
                      }`}>
                        {otpError.title}
                      </h3>
                      <p className={`mt-1 text-[14px] leading-[20px] ${
                        theme === 'dark' ? 'text-[#ff6467]' : 'text-[#c10007]'
                      }`}>
                        {otpError.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Server Failure Red Alert Box */}
              {otpError && otpError.type === 'server' && (
                <div className={`mb-4 rounded-[14px] p-4 border-[0.727px] ${
                  theme === 'dark' 
                    ? 'bg-[rgba(130,24,26,0.2)] border-[#c10007]' 
                    : 'bg-[#fef2f2] border-[#ff6467]'
                }`}>
                  <div className="flex items-start gap-3">
                    <img src={RedX} alt="error" className="h-5 w-5 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className={`font-semibold text-[14px] leading-[20px] ${
                        theme === 'dark' ? 'text-[#ffa2a2]' : 'text-[#9f0712]'
                      }`}>
                        {otpError.title}
                      </h3>
                      <p className={`mt-1 text-[14px] leading-[20px] ${
                        theme === 'dark' ? 'text-[#ff6467]' : 'text-[#c10007]'
                      }`}>
                        {otpError.message}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* OTP Form Input */}
              <div className="space-y-5">
                <div>
                  <label className={`block text-[14px] font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>Kode OTP</label>
                  <div className="relative">
                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    type="text"
                    maxLength={6}
                    placeholder="112233"
                    disabled={loading}
                    className={otpInputClassName(Boolean(otpError && otpError.type === 'invalid'))}
                  />
                </div>
                <p className={`mt-2 text-[12px] text-center ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#6a7282]'}`}>
                  Masukkan OTP yang dikirim ke email Anda
                </p>
              </div>

              <Button
                type="submit"
                loading={loading}
                isDark={theme === 'dark'}
                className="w-full h-11"
              >
                Verifikasi OTP
              </Button>
            </div>

            {/* Resend Link Code */}
            <div className="mt-6 text-center text-[14px]">
              <span className={theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'}>Tidak menerima kode? </span>
                <button 
                  type="button" 
                  disabled={loading}
                  onClick={() => {
                    setOtpError(null)
                    setLoading(true)
                    forgotPassword({ email: successEmail })
                      .then(() => {
                        setResendNotice(`OTP berhasil dikirim ulang ke ${successEmail}`)
                      })
                      .catch((error) => {
                        setOtpError({
                          type: 'server',
                          title: 'Kirim Ulang Gagal',
                          message: error.response?.data?.message || 'Gagal mengirim ulang OTP.',
                        })
                      })
                      .finally(() => {
                        setLoading(false)
                        window.setTimeout(() => setResendNotice(''), 3000)
                      })
                  }}
                  className="font-semibold text-[#2b7fff] hover:text-[#155dfc] transition-colors"
                >
                  Kirim ulang
                </button>
                {resendNotice && (
                  <p className="mt-2 text-sm text-green-600">
                    {resendNotice}
                  </p>
                )}
              </div>

              {/* Flow Guide Card */}
              <div className={`mt-[24px] rounded-[10px] border-[0.727px] px-[16.727px] py-[16.727px] ${
                theme === 'dark' 
                  ? 'border-[#4a5565] bg-[rgba(54,65,83,0.5)] text-[#d1d5dc]' 
                  : 'border-[#d1d5dc] bg-[#f3f4f6] text-[#364153]'
              }`}>
                <p className="text-[12px] font-semibold leading-[16px]">Alur reset password:</p>
                <div className={`mt-2 space-y-1 text-[12px] leading-[16px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>• OTP dikirim oleh backend setelah email dikirim.</span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>• OTP yang benar akan membuka form password baru.</span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span>• Password baru disimpan lewat endpoint reset password backend.</span>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 3: RESET PASSWORD ================= */}
        {step === 3 && (
          <div className={`${theme === 'dark' ? 'bg-[#1e2939] text-white' : 'bg-white text-[var(--text-primary)]'} rounded-[16px] drop-shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)]`}>
            {/* Header Content */}
            <div className="px-5 sm:px-8 pt-6 sm:pt-8 text-center">
              <div className="flex items-center justify-center mb-6">
                {/* Lock icon container */}
                <div className={`h-12 w-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-[rgba(28,57,142,0.3)] text-[#8ec5ff]' : 'bg-[#dbeafe] text-[#1447e6]'
                }`}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17V14M12 14C12.5523 14 13 13.5523 13 13C13 12.4477 12.5523 12 12 12C11.4477 12 11 12.4477 11 13C11 13.5523 11.4477 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                    <path d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
              <h1 className="text-[30px] font-semibold leading-[36px]">Buat Password Baru</h1>
              <p className={`mt-2 text-[16px] leading-[24px] ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>
                Silakan masukkan password baru Anda dan konfirmasikan
              </p>
            </div>

            {/* Reset Password Form */}
            <form onSubmit={handlePasswordSubmit} className="px-5 sm:px-8 pb-6 sm:pb-8 pt-4 sm:pt-6">
              {resetError && (
                <div className={`mb-4 rounded-[14px] p-4 border-[0.727px] ${
                  theme === 'dark' ? 'bg-[rgba(130,24,26,0.2)] border-[#c10007]' : 'bg-[#fef2f2] border-[#ff6467]'
                }`}>
                  <div className="flex items-start gap-3">
                    <img src={RedX} alt="error" className="h-5 w-5 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <h3 className={`font-semibold text-[14px] leading-[20px] ${
                        theme === 'dark' ? 'text-[#ffa2a2]' : 'text-[#9f0712]'
                      }`}>
                        Ubah Password Gagal
                      </h3>
                      <p className={`mt-1 text-[14px] leading-[20px] ${
                        theme === 'dark' ? 'text-[#ff6467]' : 'text-[#c10007]'
                      }`}>
                        {resetError}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-5">
                {/* 1. Password Input */}
                <div>
                  <label className={`block text-[14px] font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>Password Baru</label>
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
                      aria-label={showPassword ? 'hide password' : 'show password'}
                      onClick={() => setShowPassword((s) => !s)}
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-1 rounded"
                    >
                      <img src={EyeIcon} alt="toggle" className="h-5 w-5 opacity-70" />
                    </button>
                  </div>
                  {/* Dynamic Password Strength meter */}
                  <PasswordStrength password={password} theme={theme} />
                  {errors.password && <p className="mt-2 text-[14px] text-[#e7000b]">{errors.password}</p>}
                </div>

                {/* 2. Confirm Password Input */}
                <div>
                  <label className={`block text-[14px] font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>Konfirmasi Password Baru</label>
                  <div className="relative">
                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
                      <img src={LockIcon} alt="lock" className="h-5 w-5 opacity-70" />
                    </div>
                    <input
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      type={showConfirm ? 'text' : 'password'}
                      placeholder="Ulangi password baru"
                      disabled={loading}
                      className={`pl-[44px] pr-[48px] ${inputClassName(Boolean(errors.confirm))}`}
                    />
                    <button
                      type="button"
                      aria-label={showConfirm ? 'hide password' : 'show password'}
                      onClick={() => setShowConfirm((s) => !s)}
                      disabled={loading}
                      className="absolute right-3 top-1/2 -translate-y-1/2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-1 rounded"
                    >
                      <img src={EyeIcon} alt="toggle" className="h-5 w-5 opacity-70" />
                    </button>
                  </div>
                  {errors.confirm && <p className="mt-2 text-[14px] text-[#e7000b]">{errors.confirm}</p>}
                </div>

                <Button
                  type="submit"
                  loading={loading}
                  isDark={theme === 'dark'}
                  className="w-full h-11"
                >
                  Simpan Password
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* ================= STEP 4: PASSWORD CHANGED SUCCESS SCREEN ================= */}
        {step === 4 && (
          <div className={`rounded-[16px] p-6 sm:p-8 ${theme === 'dark' ? 'bg-[#1e2939] text-white' : 'bg-white text-[var(--text-primary)]'} drop-shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)]`}>
            {/* Green checkmark circle wrapper */}
            <div className="flex flex-col items-center py-8">
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

              {/* Success Heading */}
              <h2 className="mt-6 text-center text-[24px] font-semibold leading-[32px]">
                Password Berhasil Diubah!
              </h2>

              {/* Message */}
              <p className={`mt-3 text-center text-[16px] leading-[24px] font-normal ${
                theme === 'dark' ? 'text-[#99a1af]' : 'text-[#4a5565]'
              }`}>
                Password Anda telah berhasil diperbarui. Silakan login kembali dengan password baru Anda.
              </p>

              {/* Countdown text */}
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
