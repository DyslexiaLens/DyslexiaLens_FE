import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import EmailIcon from '../assets/Email.svg'
import PasswordStrength from '../components/PasswordStrength'
import { AppContext } from '../context/AppContext'
import Button from '../components/ui/Button'
import { changePassword } from '../services/authService'
import { getProfile, updateAddress, updateProfile } from '../services/profileService'

// Small helper icons and button aliases (kept local to avoid extra imports)
function UserIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 12.5c2.485 0 4.5-2.015 4.5-4.5S14.485 3.5 12 3.5 7.5 5.515 7.5 8s2.015 4.5 4.5 4.5z" stroke="currentColor" strokeWidth="1.25" />
      <path d="M4.5 20.5c1.2-3 4-4.5 7.5-4.5s6.3 1.5 7.5 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function MailIcon() {
  return (
    <img src={EmailIcon} alt="email" className="h-4 w-4" />
  )
}

function LockIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3.5" y="9" width="17" height="10" rx="2" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7.5 9V7.5A4.5 4.5 0 0112 3a4.5 4.5 0 014.5 4.5V9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function LocationIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 21s7-4.5 7-11A7 7 0 0012 3 7 7 0 005 10c0 6.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function BuildingIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="1" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 8h.01M8 12h.01M8 16h.01M12 8h.01M12 12h.01M12 16h.01M16 8h.01M16 12h.01M16 16h.01" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function HashIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M7 4v16M17 4v16M3 9h18M3 15h18" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  )
}

function isLettersAndSpaces(v) {
  return /^[A-Za-z\s]+$/.test(String(v || '').trim())
}

function PrimaryButton(props) {
  return <Button variant="primary" {...props} />
}

function SecondaryButton(props) {
  return <Button variant="secondary" {...props} />
}

function ArrowLeftIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M10.5 3.5L6 8l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CardShell({ title, subtitle, children, cardWidthClassName = 'w-full max-w-[448px]', backTo = '/profile', backLabel = 'Kembali ke Profil' }) {
  const { theme } = React.useContext(AppContext)
  const isDark = theme === 'dark'

  const pageClass = isDark ? 'bg-[#0f172a]' : 'bg-[#e5e7eb]'
  const cardClass = isDark
    ? 'border-[#243047] bg-[#243047] text-[#f8fafc] shadow-[0px_20px_40px_rgba(0,0,0,0.24)]'
    : 'border-[#e5e7eb] bg-white text-[#101828] shadow-[0px_20px_40px_rgba(15,23,42,0.12)]'

  return (
    <div className={`px-4 py-8 transition-colors duration-300 sm:px-6 lg:px-0 lg:py-10 ${pageClass}`}>
      <div className="mx-auto flex max-w-[1024px] flex-col items-center">
        <Link
          to={backTo}
          className={`mb-6 inline-flex items-center gap-2 text-sm transition duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-2 rounded-md ${isDark ? 'text-[#cbd5e1]' : 'text-[#475569]'}`}
        >
          <ArrowLeftIcon />
          <span>{backLabel}</span>
        </Link>

        <section className={`w-full ${cardWidthClassName} rounded-[16px] border p-5 transition-colors duration-300 sm:p-6 ${cardClass}`}>
          <h1 className="text-[22px] font-bold leading-tight sm:text-[24px]">{title}</h1>
          <p className={`mt-2 text-sm ${isDark ? 'text-[#a9b4c5]' : 'text-[#6b7280]'}`}>{subtitle}</p>
          <div className="mt-5 space-y-4">{children}</div>
        </section>
      </div>
    </div>
  )
}

function FieldLabel({ children, isDark }) {
  return <div className={`text-[11px] font-medium ${isDark ? 'text-[#e5e7eb]' : 'text-[#111827]'}`}>{children}</div>
}

function InputShell({ leftIcon, rightIcon, onRightIconClick, rightIconAriaLabel, type = 'text', placeholder, value, onChange, isDark, inputClassName = '', autoComplete, ...inputProps }) {
  const baseClass = isDark
    ? 'h-10 w-full rounded-[10px] border border-[#4b5563] bg-[#424c5f] pl-10 pr-10 text-sm text-[#f8fafc] outline-none transition placeholder:text-[#cbd5e1] focus:border-[#60a5fa] focus:ring-2 focus:ring-[#2b7fff] focus:ring-offset-2'
    : 'h-10 w-full rounded-[10px] border border-[#e5e7eb] bg-white pl-10 pr-10 text-sm text-[#101828] outline-none transition placeholder:text-[#9ca3af] focus:border-[#3b82f6] focus:ring-2 focus:ring-[#2b7fff] focus:ring-offset-2'

  const iconColor = isDark ? 'text-[#cbd5e1]' : 'text-[#94a3b8]'

  return (
    <div className="relative">
      <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${iconColor}`}>
        {leftIcon}
      </span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...inputProps}
        className={`${baseClass} ${inputClassName}`}
      />
      {rightIcon ? (
        onRightIconClick ? (
          <button
            type="button"
            onClick={onRightIconClick}
            aria-label={rightIconAriaLabel}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${iconColor} transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-1 rounded`}
          >
            {rightIcon}
          </button>
        ) : (
          <span className={`absolute right-3 top-1/2 -translate-y-1/2 ${iconColor}`}>{rightIcon}</span>
        )
      ) : null}
    </div>
  )
}

function SelectShell({ leftIcon, value, onChange, isDark, options = [], placeholder, disabled, inputClassName = '', ...selectProps }) {
  const baseClass = isDark
    ? 'h-10 w-full rounded-[10px] border border-[#4b5563] bg-[#424c5f] pl-10 pr-10 text-sm text-[#f8fafc] outline-none transition focus:border-[#60a5fa] focus:ring-2 focus:ring-[#2b7fff] focus:ring-offset-2 appearance-none'
    : 'h-10 w-full rounded-[10px] border border-[#e5e7eb] bg-white pl-10 pr-10 text-sm text-[#101828] outline-none transition focus:border-[#3b82f6] focus:ring-2 focus:ring-[#2b7fff] focus:ring-offset-2 appearance-none'

  const iconColor = isDark ? 'text-[#cbd5e1]' : 'text-[#94a3b8]'

  return (
    <div className="relative">
      <span className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ${iconColor}`}>
        {leftIcon}
      </span>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`${baseClass} ${inputClassName}`}
        {...selectProps}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt} value={opt} className={isDark ? 'bg-[#243047] text-white' : 'bg-white text-black'}>
            {opt}
          </option>
        ))}
      </select>
      <span className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 ${iconColor}`}>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </span>
    </div>
  )
}

function ErrorText({ children }) {
  return <p className="mt-2 text-[14px] leading-[20px] text-[#e7000b]">{children}</p>
}

export function EditInformationPage() {
  const { theme, user, login } = React.useContext(AppContext)
  const navigate = useNavigate()
  const isDark = theme === 'dark'
  const profileName = user?.fullName || user?.name || 'test'
  const profileEmail = user?.email || 'belum-tersedia'
  const [values, setValues] = React.useState({ firstName: profileName, lastName: '', email: profileEmail })
  const [errors, setErrors] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    let mounted = true

    const loadProfile = async () => {
      try {
        const response = await getProfile()
        const profile = response.data || response
        const personalInfo = profile.personalInfo || profile
        const fullName = personalInfo.fullName || personalInfo.name || ''
        const [firstName = '', ...restName] = String(fullName).trim().split(/\s+/)

        if (mounted) {
          setValues({
            firstName,
            lastName: restName.join(' '),
            email: personalInfo.email || profile.email || '',
          })
        }
      } catch {
        if (mounted) {
          setValues((current) => ({
            ...current,
            firstName: profileName,
            email: profileEmail,
          }))
        }
      }
    }

    loadProfile()

    return () => {
      mounted = false
    }
  }, [profileEmail, profileName])

  const validate = (nextValues) => {
    const nextErrors = {}
    const firstName = nextValues.firstName.trim()
    const lastName = nextValues.lastName.trim()

    if (!firstName) nextErrors.firstName = 'Nama depan tidak boleh kosong'
    else if (firstName.length < 2) nextErrors.firstName = 'Nama depan minimal 2 karakter'
    else if (!isLettersAndSpaces(firstName)) nextErrors.firstName = 'Nama depan hanya boleh huruf'

    if (lastName && lastName.length < 2) nextErrors.lastName = 'Nama belakang minimal 2 karakter'
    else if (lastName && !isLettersAndSpaces(lastName)) nextErrors.lastName = 'Nama belakang hanya boleh huruf'

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loading) return
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setLoading(true)
      try {
        const fullName = `${values.firstName.trim()} ${values.lastName.trim()}`.trim()
        const response = await updateProfile({ fullName })
        login(response.data)
        navigate('/profile/edit-info/success')
      } catch (error) {
        setErrors((current) => ({
          ...current,
          submit: error.response?.data?.message || 'Gagal memperbarui profil',
        }))
      } finally {
        setLoading(false)
      }
    }
  }

  const inputClassName = (hasError) => (hasError ? 'border-[#ff4d4f] focus:border-[#ff4d4f]' : '')

  return (
    <CardShell title="Edit Informasi Pribadi" subtitle="Perbarui informasi profil Anda">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <FieldLabel isDark={isDark}>Nama Depan</FieldLabel>
          <div className="mt-2">
            <InputShell
              leftIcon={<UserIcon />}
              value={values.firstName}
              onChange={(event) => {
                const nextValues = { ...values, firstName: event.target.value }
                setValues(nextValues)
                setErrors(validate(nextValues))
              }}
              isDark={isDark}
              placeholder={profileName}
              disabled={loading}
              inputClassName={inputClassName(errors.firstName)}
              autoComplete="given-name"
            />
          </div>
          {errors.firstName ? <ErrorText>{errors.firstName}</ErrorText> : null}
        </div>

        <div>
          <FieldLabel isDark={isDark}>Nama Belakang</FieldLabel>
          <div className="mt-2">
            <InputShell
              leftIcon={<UserIcon />}
              placeholder="Masukkan nama belakang (opsional)"
              value={values.lastName}
              onChange={(event) => {
                const nextValues = { ...values, lastName: event.target.value }
                setValues(nextValues)
                setErrors(validate(nextValues))
              }}
              isDark={isDark}
              autoComplete="family-name"
              disabled={loading}
              inputClassName={inputClassName(errors.lastName)}
            />
          </div>
          {errors.lastName ? <ErrorText>{errors.lastName}</ErrorText> : null}
        </div>

        <div>
          <FieldLabel isDark={isDark}>Alamat Email</FieldLabel>
          <div className="mt-2">
            <InputShell
              leftIcon={<MailIcon />}
              value={values.email}
              onChange={() => {}}
              isDark={isDark}
              placeholder={profileEmail}
              autoComplete="email"
              disabled
              inputClassName={inputClassName(errors.email)}
            />
          </div>
          {errors.email ? <ErrorText>{errors.email}</ErrorText> : null}
        </div>

        {errors.submit ? <ErrorText>{errors.submit}</ErrorText> : null}

        <div className="flex gap-2 pt-1">
          <SecondaryButton isDark={isDark} disabled={loading} onClick={() => navigate('/profile')}>
            Batal
          </SecondaryButton>
          <div className="flex-1">
            <PrimaryButton type="submit" loading={loading} isDark={isDark}>
              Simpan Perubahan
            </PrimaryButton>
          </div>
        </div>
      </form>
    </CardShell>
  )
}

export function EditPasswordPage() {
  const { theme } = React.useContext(AppContext)
  const navigate = useNavigate()
  const isDark = theme === 'dark'
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false)
  const [showNewPassword, setShowNewPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const [values, setValues] = React.useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [errors, setErrors] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  
  // State baru untuk alur OTP
  const [requiresOtp, setRequiresOtp] = React.useState(false)
  const [otpCode, setOtpCode] = React.useState('')

  const validate = (nextValues) => {
    const nextErrors = {}
    const currentPassword = nextValues.currentPassword.trim()
    const newPassword = nextValues.newPassword.trim()
    const confirmPassword = nextValues.confirmPassword.trim()

    if (!currentPassword) nextErrors.currentPassword = 'Password saat ini tidak boleh kosong'
    else if (currentPassword.length < 8) nextErrors.currentPassword = 'Password saat ini minimal 8 karakter'

    if (!newPassword) nextErrors.newPassword = 'Password baru tidak boleh kosong'
    else if (newPassword.length < 8) nextErrors.newPassword = 'Password baru minimal 8 karakter'

    if (!confirmPassword) nextErrors.confirmPassword = 'Konfirmasi password tidak boleh kosong'
    else if (confirmPassword !== newPassword) nextErrors.confirmPassword = 'Konfirmasi password tidak sesuai'

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loading) return

    if (!requiresOtp) {
      const nextErrors = validate(values)
      setErrors(nextErrors)

      if (Object.keys(nextErrors).length === 0) {
        setLoading(true)
        try {
          const res = await changePassword({
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
          })
          
          const responseData = res?.data || res
          if (responseData?.requiresOtp) {
            setRequiresOtp(true)
            setErrors({})
          } else {
            navigate('/profile/edit-password/success', { replace: true })
          }
        } catch (error) {
          const message = error.response?.data?.message || 'Gagal mengubah password'
          if (message.toLowerCase().includes('current password') || message.toLowerCase().includes('password saat ini')) {
            setErrors((current) => ({
              ...current,
              currentPassword: 'Password saat ini tidak sesuai',
            }))
          } else {
            setErrors((current) => ({
              ...current,
              submit: message,
            }))
          }
        } finally {
          setLoading(false)
        }
      }
    } else {
      const trimmedOtp = otpCode.trim()
      if (!trimmedOtp) {
        setErrors({ otpCode: 'Kode OTP tidak boleh kosong' })
        return
      }
      if (trimmedOtp.length !== 6) {
        setErrors({ otpCode: 'Kode OTP harus 6 digit' })
        return
      }

      setLoading(true)
      try {
        await changePassword({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
          otpCode: trimmedOtp,
        })
        navigate('/profile/edit-password/success', { replace: true })
      } catch (error) {
        setErrors((current) => ({
          ...current,
          submit: error.response?.data?.message || 'Kode OTP tidak valid atau kedaluwarsa',
        }))
      } finally {
        setLoading(false)
      }
    }
  }

  const inputClassName = (hasError) => (hasError ? 'border-[#ff4d4f] focus:border-[#ff4d4f]' : '')

  if (requiresOtp) {
    return (
      <CardShell 
        title="Verifikasi Kode OTP" 
        subtitle="Masukkan 6 digit kode OTP yang telah dikirimkan ke email Anda untuk menyelesaikan perubahan password."
        backTo="/profile"
      >
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <FieldLabel isDark={isDark}>Kode OTP</FieldLabel>
            <div className="mt-2">
              <InputShell
                leftIcon={<HashIcon />}
                type="text"
                placeholder="Masukkan 6 digit kode OTP"
                isDark={isDark}
                value={otpCode}
                onChange={(event) => {
                  const nextOtp = event.target.value.replace(/\D/g, '').slice(0, 6)
                  setOtpCode(nextOtp)
                  if (nextOtp.length === 6) {
                    setErrors({})
                  } else {
                    setErrors({ otpCode: 'Kode OTP harus 6 digit' })
                  }
                }}
                disabled={loading}
                inputClassName={inputClassName(errors.otpCode)}
              />
            </div>
            {errors.otpCode ? <ErrorText>{errors.otpCode}</ErrorText> : null}
          </div>

          <div className="flex gap-2 pt-1">
            <SecondaryButton isDark={isDark} disabled={loading} onClick={() => setRequiresOtp(false)}>
              Batal
            </SecondaryButton>
            <div className="flex-1">
              <PrimaryButton type="submit" loading={loading} isDark={isDark}>
                Verifikasi & Ubah Password
              </PrimaryButton>
            </div>
          </div>
          {errors.submit ? <ErrorText>{errors.submit}</ErrorText> : null}
        </form>
      </CardShell>
    )
  }

  return (
    <CardShell title="Ubah Password" subtitle="Masukkan password lama dan password baru Anda">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <FieldLabel isDark={isDark}>Password Saat Ini</FieldLabel>
          <div className="mt-2">
            <InputShell
              leftIcon={<LockIcon />}
              rightIcon={<EyeIcon />}
              onRightIconClick={() => setShowCurrentPassword((prev) => !prev)}
              rightIconAriaLabel={showCurrentPassword ? 'Sembunyikan password saat ini' : 'Tampilkan password saat ini'}
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Masukkan password saat ini"
              isDark={isDark}
              autoComplete="current-password"
              value={values.currentPassword}
              onChange={(event) => {
                const nextValues = { ...values, currentPassword: event.target.value }
                setValues(nextValues)
                setErrors(validate(nextValues))
              }}
              disabled={loading}
              inputClassName={inputClassName(errors.currentPassword)}
            />
          </div>
          {errors.currentPassword ? <ErrorText>{errors.currentPassword}</ErrorText> : null}
        </div>

        <div>
          <FieldLabel isDark={isDark}>Password Baru</FieldLabel>
          <div className="mt-2">
            <InputShell
              leftIcon={<LockIcon />}
              rightIcon={<EyeIcon />}
              onRightIconClick={() => setShowNewPassword((prev) => !prev)}
              rightIconAriaLabel={showNewPassword ? 'Sembunyikan password baru' : 'Tampilkan password baru'}
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Minimal 6 karakter"
              isDark={isDark}
              autoComplete="new-password"
              value={values.newPassword}
              onChange={(event) => {
                const nextValues = { ...values, newPassword: event.target.value }
                setValues(nextValues)
                setErrors(validate(nextValues))
              }}
              disabled={loading}
              inputClassName={inputClassName(errors.newPassword)}
            />
          </div>
          {errors.newPassword ? <ErrorText>{errors.newPassword}</ErrorText> : null}
          <PasswordStrength password={values.newPassword} theme={theme} />
        </div>

        <div>
          <FieldLabel isDark={isDark}>Konfirmasi Password Baru</FieldLabel>
          <div className="mt-2">
            <InputShell
              leftIcon={<LockIcon />}
              rightIcon={<EyeIcon />}
              onRightIconClick={() => setShowConfirmPassword((prev) => !prev)}
              rightIconAriaLabel={showConfirmPassword ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Ulangi password baru"
              isDark={isDark}
              autoComplete="new-password"
              value={values.confirmPassword}
              onChange={(event) => {
                const nextValues = { ...values, confirmPassword: event.target.value }
                setValues(nextValues)
                setErrors(validate(nextValues))
              }}
              disabled={loading}
              inputClassName={inputClassName(errors.confirmPassword)}
            />
          </div>
          {errors.confirmPassword ? <ErrorText>{errors.confirmPassword}</ErrorText> : null}
        </div>

        <div className="pt-1">
          <PrimaryButton type="submit" loading={loading} isDark={isDark}>Lanjutkan</PrimaryButton>
        </div>
        {errors.submit ? <ErrorText>{errors.submit}</ErrorText> : null}
      </form>
    </CardShell>
  )
}

export function EditAddressPage() {
  const { theme, login } = React.useContext(AppContext)
  const navigate = useNavigate()
  const isDark = theme === 'dark'
  const [values, setValues] = React.useState({ country: '', city: '', postalCode: '' })
  const [errors, setErrors] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  const countryCities = {
    'Indonesia': ['Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Makassar', 'Semarang', 'Yogyakarta', 'Palembang', 'Tangerang', 'Bekasi', 'Depok', 'Bogor'],
    'Malaysia': ['Kuala Lumpur', 'Penang', 'Johor Bahru', 'Malacca', 'Ipoh'],
    'Singapura': ['Singapore'],
  }

  const defaultCountries = ['Indonesia', 'Malaysia', 'Singapura']

  const countryOptions = React.useMemo(() => {
    if (values.country && !defaultCountries.includes(values.country)) {
      return [values.country, ...defaultCountries]
    }
    return defaultCountries
  }, [values.country])

  const cityOptions = React.useMemo(() => {
    const list = countryCities[values.country] || [
      'Jakarta', 'Bandung', 'Surabaya', 'Medan', 'Makassar', 'Semarang', 'Yogyakarta', 'Palembang', 'Tangerang', 'Bekasi', 'Depok', 'Bogor'
    ]
    if (values.city && !list.includes(values.city)) {
      return [values.city, ...list]
    }
    return list
  }, [values.country, values.city])

  React.useEffect(() => {
    let mounted = true

    const loadProfile = async () => {
      try {
        const response = await getProfile()
        const profile = response.data || response
        const address = profile.address || profile

        if (mounted) {
          setValues({
            country: address.country || '',
            city: address.city || '',
            postalCode: address.postalCode || address.postal_code || '',
          })
        }
      } catch {
        // Keep empty inputs when profile fetch fails.
      }
    }

    loadProfile()

    return () => {
      mounted = false
    }
  }, [])

  const validate = (nextValues) => {
    const nextErrors = {}
    const country = nextValues.country.trim()
    const city = nextValues.city.trim()
    const postalCode = nextValues.postalCode.trim()

    if (!country) nextErrors.country = 'Negara tidak boleh kosong'
    else if (country.length < 2) nextErrors.country = 'Negara minimal 2 karakter'
    else if (!isLettersAndSpaces(country)) nextErrors.country = 'Negara hanya boleh huruf'

    if (!city) nextErrors.city = 'Kota tidak boleh kosong'
    else if (city.length < 2) nextErrors.city = 'Kota minimal 2 karakter'
    else if (!isLettersAndSpaces(city)) nextErrors.city = 'Kota hanya boleh huruf'

    if (!postalCode) nextErrors.postalCode = 'Kode pos tidak boleh kosong'
    else if (/[^\d]/.test(postalCode)) nextErrors.postalCode = 'Kode pos hanya boleh berisi angka'
    else if (postalCode.length !== 5) nextErrors.postalCode = 'Kode pos harus 5 digit'

    return nextErrors
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (loading) return
    const nextErrors = validate(values)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length === 0) {
      setLoading(true)
      try {
        const response = await updateAddress(values)
        login(response.data)
        navigate('/profile/edit-address/success')
      } catch (error) {
        setErrors((current) => ({
          ...current,
          submit: error.response?.data?.message || 'Gagal memperbarui alamat',
        }))
      } finally {
        setLoading(false)
      }
    }
  }

  const inputClassName = (hasError) => (hasError ? 'border-[#ff4d4f] focus:border-[#ff4d4f]' : '')

  return (
    <CardShell title="Edit Alamat" subtitle="Perbarui informasi alamat Anda">
      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        <div>
          <FieldLabel isDark={isDark}>Negara</FieldLabel>
          <div className="mt-2">
            <SelectShell
              leftIcon={<LocationIcon />}
              placeholder="Pilih negara"
              isDark={isDark}
              value={values.country}
              onChange={(event) => {
                const nextCountry = event.target.value
                const cities = countryCities[nextCountry] || []
                const nextCity = cities[0] || ''
                const nextValues = { ...values, country: nextCountry, city: nextCity }
                setValues(nextValues)
                setErrors(validate(nextValues))
              }}
              disabled={loading}
              options={countryOptions}
              inputClassName={inputClassName(errors.country)}
            />
          </div>
          {errors.country ? <ErrorText>{errors.country}</ErrorText> : null}
        </div>

        <div>
          <FieldLabel isDark={isDark}>Kota</FieldLabel>
          <div className="mt-2">
            <SelectShell
              leftIcon={<BuildingIcon />}
              placeholder="Pilih kota"
              isDark={isDark}
              value={values.city}
              onChange={(event) => {
                const nextValues = { ...values, city: event.target.value }
                setValues(nextValues)
                setErrors(validate(nextValues))
              }}
              disabled={loading}
              options={cityOptions}
              inputClassName={inputClassName(errors.city)}
            />
          </div>
          {errors.city ? <ErrorText>{errors.city}</ErrorText> : null}
        </div>

        <div>
          <FieldLabel isDark={isDark}>Kode Pos</FieldLabel>
          <div className="mt-2">
            <InputShell
              leftIcon={<HashIcon />}
              placeholder="Masukkan kode pos"
              isDark={isDark}
              autoComplete="postal-code"
              value={values.postalCode}
              onChange={(event) => {
                const nextValues = { ...values, postalCode: event.target.value }
                setValues(nextValues)
                setErrors(validate(nextValues))
              }}
              disabled={loading}
              inputClassName={inputClassName(errors.postalCode)}
            />
          </div>
          {errors.postalCode ? <ErrorText>{errors.postalCode}</ErrorText> : null}
        </div>

        <div className="flex gap-2 pt-1">
          <SecondaryButton isDark={isDark} disabled={loading} onClick={() => navigate('/profile')}>
            Batal
          </SecondaryButton>
          <div className="flex-1">
            <PrimaryButton type="submit" loading={loading} isDark={isDark}>
              Simpan Alamat
            </PrimaryButton>
          </div>
        </div>
        {errors.submit ? <ErrorText>{errors.submit}</ErrorText> : null}
      </form>
    </CardShell>
  )
}
