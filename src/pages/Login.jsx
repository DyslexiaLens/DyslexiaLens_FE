import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../components/landing/landingContent'
import EmailIcon from '../assets/Email.svg'
import LockIcon from '../assets/Locksvg.svg'
import EyeIcon from '../assets/Eye.svg'
import { AppContext } from '../context/AppContext'
import RedX from '../assets/RedX.svg'
import Button from '../components/ui/Button'
import { login as loginService } from '../services/authService'

export default function Login() {
  const navigate = useNavigate()
  const { theme, login: setLoginContext } = React.useContext(AppContext)
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [errors, setErrors] = React.useState({})
  const [authError, setAuthError] = React.useState(null)
  const [showPassword, setShowPassword] = React.useState(false)
  const [remember, setRemember] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const errorRef = React.useRef(null)

  React.useEffect(() => {
    if (authError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [authError])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loading) return
    const errs = {}
    if (!email) errs.email = 'Email tidak boleh kosong'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) errs.email = 'Format email tidak valid'
    if (!password) errs.password = 'Password tidak boleh kosong'
    else if (password.length < 8) errs.password = 'Password minimal 8 karakter'
    setErrors(errs)
    if (Object.keys(errs).length === 0) {
      try {
        setLoading(true)
        setAuthError(null)

        const res = await loginService({
          email: email.trim().toLowerCase(),
          password,
        })

        setLoginContext({
          accessToken: res.data?.accessToken,
          user: res.data?.user,
          remember,
        })

        navigate('/')
      } catch (error) {
        const status = error.response?.status
        const message = error.response?.data?.message
        const errorType = error.response?.data?.errorType
        const remainingAttempts = error.response?.data?.remainingAttempts
        const remainingMinutes = error.response?.data?.remainingMinutes
        const validationMessage = Array.isArray(error.response?.data?.errors)
          ? error.response.data.errors[0]?.msg
          : null

        if (!error.response) {
          setAuthError({
            type: 'connection',
            title: 'Masalah Koneksi',
            message: 'Koneksi bermasalah. Periksa internet lalu coba lagi.',
          })
        } else if (status === 400) {
          setAuthError({
            type: 'validation',
            title: 'Input Tidak Valid',
            message: validationMessage || message || 'Periksa kembali email dan password Anda.',
          })
        } else if (status === 404 && errorType === 'email_not_found') {
          setAuthError({
            type: 'email_not_found',
            title: 'Email Tidak Terdaftar',
            message: 'Email belum terdaftar. Silakan daftar terlebih dahulu.',
          })
        } else if (status === 401 && errorType === 'wrong_password') {
          setAuthError({
            type: 'wrong_password',
            title: 'Password Salah',
            message: `Password salah. Sisa percobaan: ${remainingAttempts} kali.`,
            remainingAttempts,
          })
        } else if (status === 423 && errorType === 'account_locked') {
          setAuthError({
            type: 'locked',
            title: 'Akun Terkunci',
            message: `Akun Anda dikunci setelah 3 kali percobaan gagal. Coba lagi dalam ${remainingMinutes} menit.`,
            remainingMinutes,
          })
        } else {
          setAuthError({
            type: 'server_error',
            title: 'Kesalahan Server',
            message: message || 'Terjadi kesalahan. Silakan coba lagi.',
          })
        }
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className={`min-h-screen flex items-start justify-center py-20 px-4 transition-colors duration-300 ${theme === 'dark' ? '' : 'bg-[#E5E7EB]'}`}>
      <div className="w-full max-w-[448px] relative">
        <Link to="/" className={`flex items-center gap-2 mb-4 ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[var(--text-secondary)]'}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="-ml-1">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali
        </Link>

        <div className={`${theme === 'dark' ? 'bg-[#1e2939] text-white' : 'bg-white text-[var(--text-primary)]'} rounded-[16px] drop-shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)]`}>
          <div className="px-5 sm:px-8 pt-6 sm:pt-8">
            <div className="flex items-center justify-center gap-4">
              <div
                            className="
                              flex h-16 w-16 items-center justify-center
                              rounded-[10px]
                              bg-transparent
                            "
                          >
                            <img
                              alt=""
                              src={assets.logoMark}
                              className="h-17 w-17"
                            />
                          </div>
            </div>

            <h1 className="mt-6 text-[30px] font-semibold text-center">Selamat Datang</h1>
            <p className={`mt-2 text-[16px] text-center ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[var(--text-secondary)]'}`}>Masuk ke akun Anda</p>
          </div>

          <form onSubmit={handleSubmit} className="px-5 sm:px-8 pb-6 sm:pb-8 pt-4 sm:pt-6">
            {authError && authError.type === 'email_not_found' && (
              <div ref={errorRef} className={`mb-4 rounded-[14px] p-4 border-[0.727px] ${theme === 'dark' ? 'bg-[#82181A33] border-[#C10007]' : 'bg-[#FEF2F2] border-[#FF6467]'}`}>
                <div className="flex items-start gap-3">
                  <img src={RedX} alt="error" className="h-5 w-5 mt-1" />
                  <div>
                    <div className="font-medium" style={{ color: theme === 'dark' ? '#FF6467' : '#9F0712' }}>{authError.title}</div>
                    <div className="mt-1 text-sm" style={{ color: theme === 'dark' ? '#FFA2A2' : '#C10007' }}>{authError.message}</div>
                    <Link to="/register" className="mt-2 block" style={{ color: theme === 'dark' ? '#51A2FF' : '#155DFC', fontSize: '14px', fontWeight: 400 }}>
                      Daftar sekarang
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {authError && authError.type === 'wrong_password' && (
              <div ref={errorRef} className={`mb-4 rounded-[14px] p-4 border-[0.727px] ${theme === 'dark' ? 'bg-[#82181A33] border-[#C10007]' : 'bg-[#FEF2F2] border-[#FF6467]'}`}>
                <div className="flex items-start gap-3">
                  <img src={RedX} alt="error" className="h-5 w-5 mt-1" />
                  <div>
                    <div className="font-medium" style={{ color: theme === 'dark' ? '#FF6467' : '#9F0712' }}>{authError.title}</div>
                    <div className="mt-1 text-sm" style={{ color: theme === 'dark' ? '#FFA2A2' : '#C10007' }}>{authError.message}</div>
                  </div>
                </div>
              </div>
            )}
            {authError && authError.type === 'locked' && (
              <div ref={errorRef} className={`mb-4 rounded-[14px] p-4 border-[0.727px] ${theme === 'dark' ? 'bg-[#82181A33] border-[#C10007]' : 'bg-[#FEF2F2] border-[#FF6467]'}`}>
                <div className="flex items-start gap-3">
                  <img src={RedX} alt="locked" className="h-5 w-5 mt-1" />
                  <div>
                    <div className="font-medium" style={{ color: theme === 'dark' ? '#FF6467' : '#9F0712' }}>{authError.title}</div>
                    <div className="mt-1 text-sm" style={{ color: theme === 'dark' ? '#FFA2A2' : '#C10007' }}>{authError.message}</div>
                    <Link to="/forgot" className="mt-2 block" style={{ color: theme === 'dark' ? '#51A2FF' : '#155DFC', fontSize: '14px', fontWeight: 400 }}>
                      Reset password sekarang
                    </Link>
                  </div>
                </div>
              </div>
            )}
            {authError && authError.type === 'validation' && (
              <div className={`mb-4 rounded-[14px] p-4 border-[0.727px] ${theme === 'dark' ? 'bg-[#82181A33] border-[#C10007]' : 'bg-[#FEF2F2] border-[#FF6467]'}`}>
                <div className="flex items-start gap-3">
                  <img src={RedX} alt="error" className="h-5 w-5 mt-1" />
                  <div>
                    <div className="font-medium" style={{ color: theme === 'dark' ? '#FFA2A2' : '#9F0712' }}>{authError.title || 'Input tidak valid'}</div>
                    <div className="mt-1 text-sm" style={{ color: theme === 'dark' ? '#FF6467' : '#C10007' }}>{authError.message || 'Periksa kembali email dan password Anda.'}</div>
                  </div>
                </div>
              </div>
            )}
            {authError && authError.type === 'connection' && (
              <div className={`mb-4 rounded-[14px] p-4 border-[0.727px] ${theme === 'dark' ? 'bg-[#82181A33] border-[#C10007]' : 'bg-[#FEF2F2] border-[#FF6467]'}`}>
                <div className="flex items-start gap-3">
                  <img src={RedX} alt="error" className="h-5 w-5 mt-1" />
                  <div>
                    <div className="font-medium" style={{ color: theme === 'dark' ? '#FFA2A2' : '#9F0712' }}>{authError.title}</div>
                    <div className="mt-1 text-sm" style={{ color: theme === 'dark' ? '#FF6467' : '#C10007' }}>{authError.message}</div>
                  </div>
                </div>
              </div>
            )}
            {authError && authError.type === 'server_error' && (
              <div className={`mb-4 rounded-[14px] p-4 border-[0.727px] ${theme === 'dark' ? 'bg-[#82181A33] border-[#C10007]' : 'bg-[#FEF2F2] border-[#FF6467]'}`}>
                <div className="flex items-start gap-3">
                  <img src={RedX} alt="error" className="h-5 w-5 mt-1" />
                  <div>
                    <div className="font-medium" style={{ color: theme === 'dark' ? '#FFA2A2' : '#9F0712' }}>{authError.title}</div>
                    <div className="mt-1 text-sm" style={{ color: theme === 'dark' ? '#FF6467' : '#C10007' }}>{authError.message}</div>
                  </div>
                </div>
              </div>
            )}
            <div className="space-y-5">
              <div>
                <label className={`block text-[14px] font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-[var(--text-primary)]'}`}>Email</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={EmailIcon} alt="email" className="h-5 w-5 opacity-70" />
                  </div>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="nama@email.com"
                    disabled={loading}
                    className={`w-full h-[49.455px] rounded-[10px] pl-[44px] pr-4 py-[12px] text-[16px] placeholder:text-[rgba(16,24,40,0.5)] focus:outline-none focus:ring-2 focus:ring-[#2b7fff] focus:ring-offset-2 ${theme === 'dark' ? 'bg-[#364153] text-[rgba(255,255,255,0.9)] placeholder:text-[rgba(255,255,255,0.5)]' : 'bg-white text-[rgba(16,24,40,0.85)]'} ${errors.email ? 'border-[#e7000b] border-[0.727px]' : (theme === 'dark' ? 'border-[#4a5565]' : 'border-[0.727px] border-[#d1d5dc]')}`}
                  />
                </div>
                {errors.email && <p className="mt-2 text-[14px] text-[#e7000b]">{errors.email}</p>}
              </div>

              <div>
                <label className={`block text-[14px] font-medium mb-2 ${theme === 'dark' ? 'text-white' : 'text-[var(--text-primary)]'}`}>Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <img src={LockIcon} alt="lock" className="h-5 w-5 opacity-70" />
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    disabled={loading}
                    className={`w-full h-[49.455px] rounded-[10px] pl-[44px] pr-[48px] py-[12px] text-[16px] placeholder:text-[rgba(16,24,40,0.5)] focus:outline-none focus:ring-2 focus:ring-[#2b7fff] focus:ring-offset-2 ${theme === 'dark' ? 'bg-[#364153] text-[rgba(255,255,255,0.9)] placeholder:text-[rgba(255,255,255,0.5)]' : 'bg-white text-[rgba(16,24,40,0.85)]'} ${errors.password ? 'border-[#e7000b] border-[0.727px]' : (theme === 'dark' ? 'border-[#4a5565]' : 'border-[0.727px] border-[#d1d5dc]')}`}
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
                {errors.password && <p className="mt-2 text-[14px] text-[#e7000b]">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label htmlFor="remember" className={`flex items-center gap-3 text-[16px] ${theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[var(--text-secondary)]'}`}>
                  <input
                    id="remember"
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => !loading && setRemember(e.target.checked)}
                    aria-label="Ingat saya"
                    disabled={loading}
                    className="sr-only peer"
                  />
                  <div className={`h-[13px] w-[13px] rounded-sm inline-flex items-center justify-center border cursor-pointer peer-focus-visible:ring-2 peer-focus-visible:ring-[#2b7fff] peer-focus-visible:ring-offset-2 ${remember ? 'bg-[#2b7fff] border-[#2b7fff]' : (theme === 'dark' ? 'border-[#4a5565] bg-[#0f1720]' : 'border-[#d1d5dc] bg-white')} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    {remember && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4L4 7L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium">Ingat saya</span>
                </label>
                <Link to="/forgot" className="text-[14px] text-[#2b7fff]">Lupa password?</Link>
              </div>

              <Button
                type="submit"
                loading={loading}
                isDark={theme === 'dark'}
                className="w-full h-11"
              >
                Masuk
              </Button>
            </div>

            <div className="mt-6 text-center text-[16px] text-[var(--text-secondary)]">
              Belum punya akun? <Link to="/register" className="font-medium text-[#2b7fff]">Daftar sekarang</Link>
            </div>

            <div className={`mt-6 rounded-[14px] border-[0.727px] px-[16.727px] py-[16.727px] ${
              theme === 'dark' 
                ? 'border-[#193cb8] bg-[rgba(28,57,142,0.2)]' 
                : 'border-[#bedbff] bg-[#eff6ff]'
            }`}>
              <p className={`text-[14px] font-semibold leading-[20px] ${
                theme === 'dark' ? 'text-white' : 'text-[#101828]'
              }`}>
                Informasi Login:
              </p>
              <div className={`mt-2 space-y-1 text-[12px] leading-[16px] ${
                theme === 'dark' ? 'text-[#d1d5dc]' : 'text-[#364153]'
              }`}>
                <p>• Gunakan email dan password akun yang sudah terdaftar.</p>
                <p>• Jika login gagal, cek kembali email, password, atau koneksi internet Anda.</p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
