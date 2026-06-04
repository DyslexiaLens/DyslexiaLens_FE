import React from 'react'
import { getHistories } from '../services/historyService'
import { getProfile } from '../services/profileService'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

function ProfileIcon({ className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 12.25C9.37665 12.25 7.25 10.1234 7.25 7.5C7.25 4.87665 9.37665 2.75 12 2.75C14.6234 2.75 16.75 4.87665 16.75 7.5C16.75 10.1234 14.6234 12.25 12 12.25Z" stroke="currentColor" strokeWidth="1.75" />
      <path d="M4.5 21C5.58222 18.3018 8.205 16.5 12 16.5C15.795 16.5 18.4178 18.3018 19.5 21" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function EditButton({ to, children = 'Edit' }) {
  return (
    <Link
      to={to}
      className="btn-lift inline-flex h-8 items-center justify-center rounded-md bg-gradient-to-r from-[#2b7fff] to-[#9810fa] px-3 text-xs font-semibold text-white shadow-[0px_10px_7.5px_rgba(43,127,255,0.25),0px_4px_3px_rgba(152,16,250,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-2"
    >
      {children}
    </Link>
  )
}

function StatIcon({ tone }) {
  if (tone === 'blue') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M8 3.5V6.5M16 3.5V6.5M4.5 9H19.5M6 5.5H18C19.3807 5.5 20.5 6.61929 20.5 8V18C20.5 19.3807 19.3807 20.5 18 20.5H6C4.61929 20.5 3.5 19.3807 3.5 18V8C3.5 6.61929 4.61929 5.5 6 5.5Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  if (tone === 'purple') {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M12 3.5C16.6944 3.5 20.5 7.30558 20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5Z" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3.9 9.5H20.1M3.9 14.5H20.1M12 3.5C14.08 5.765 15.25 8.75 15.25 12C15.25 15.25 14.08 18.235 12 20.5C9.92 18.235 8.75 15.25 8.75 12C8.75 8.75 9.92 5.765 12 3.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M12 3.5C14.6234 3.5 16.75 5.62665 16.75 8.25C16.75 10.8734 14.6234 13 12 13C9.37665 13 7.25 10.8734 7.25 8.25C7.25 5.62665 9.37665 3.5 12 3.5Z" stroke="currentColor" strokeWidth="1.75" />
      <path d="M4.5 20.5C5.58222 17.8018 8.205 16 12 16C15.795 16 18.4178 17.8018 19.5 20.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function InfoField({ label, value, spanClassName = '' }) {
  return (
    <div className={spanClassName}>
      <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-muted)]">{label}</div>
      <div className="mt-1 text-[15px] font-semibold text-[var(--text-primary)]">{value}</div>
    </div>
  )
}

function SettingRow({ icon, title, isDark, to }) {
  const rowClass = isDark
    ? 'flex w-full items-center gap-3 rounded-[10px] border border-[#374151] bg-[#1f2937] px-4 py-3 text-left text-sm font-medium text-[#f9fafb] transition-all duration-200 hover:bg-[#263244] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-1'
    : 'flex w-full items-center gap-3 rounded-[10px] border border-[#e5e7eb] bg-white px-4 py-3 text-left text-sm font-medium text-[#111827] transition-all duration-200 hover:bg-[#fafafa] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-1'

  const iconClass = isDark
    ? 'flex h-8 w-8 items-center justify-center rounded-lg bg-[#374151] text-[#d1d5db] transition-transform duration-200 group-hover:scale-110'
    : 'flex h-8 w-8 items-center justify-center rounded-lg bg-[#f3f4f6] text-[#4b5563] transition-transform duration-200 group-hover:scale-110'

  const RowTag = to ? Link : 'button'

  return (
    <RowTag
      to={to}
      type={to ? undefined : 'button'}
      className={`group ${rowClass}`}
    >
      <span className={iconClass}>
        {icon}
      </span>
      <span>{title}</span>
    </RowTag>
  )
}

export default function Profile() {
  const { theme, user } = React.useContext(AppContext)
  const isDark = theme === 'dark'

  const [profileData, setProfileData] = React.useState(null)
  const [detectionCount, setDetectionCount] = React.useState(0)
  const [translationCount, setTranslationCount] = React.useState(0)
  const [joinedSince, setJoinedSince] = React.useState('—')
  const [profileError, setProfileError] = React.useState(null)

  React.useEffect(() => {
    let cancelled = false

    if (!user) {
      setDetectionCount(0)
      setTranslationCount(0)
      setJoinedSince('—')
      setProfileData(null)
      return undefined
    }

    const loadProfile = async () => {
      try {
        const response = await getProfile()
        const profile = response.data || response
        const personalInfo = profile.personalInfo || profile
        const address = profile.address || profile

        if (cancelled) return

        setProfileData({
          personalInfo,
          address,
        })
        setProfileError(null)

        const created = profile.createdAt || profile.created_at || personalInfo.joinedAt || user.created_at || user.createdAt
        let joined = '—'
        if (created) {
          const d = new Date(created)
          if (!Number.isNaN(d.getTime())) {
            joined = d.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
          }
        }
        setJoinedSince(joined)
      } catch {
        if (cancelled) return

        const created = user.created_at || user.createdAt
        let joined = '—'
        if (created) {
          const d = new Date(created)
          if (!Number.isNaN(d.getTime())) {
            joined = d.toLocaleDateString('id-ID', { month: 'short', year: 'numeric' })
          }
        }
        setJoinedSince(joined)
        setProfileData(null)
        setProfileError('Gagal memuat data profil. Menampilkan data dari sesi.')
      }
    }

    loadProfile()

    const loadCounts = async () => {
      try {
        const res = await getHistories()

        let histories = []
        if (Array.isArray(res)) histories = res
        else if (Array.isArray(res.data)) histories = res.data
        else if (Array.isArray(res.data?.histories)) histories = res.data.histories
        else if (Array.isArray(res.histories)) histories = res.histories
        else if (Array.isArray(res.data?.data?.histories)) histories = res.data.data.histories
        else if (Array.isArray(res.data?.data)) histories = res.data.data

        histories = histories || []

        const det = histories.filter((h) => h.type === 'detection' || h.predicted_text).length
        const tr = histories.filter((h) => h.type === 'translation' || h.translated_text).length

        if (!cancelled) {
          setDetectionCount(det)
          setTranslationCount(tr)
        }
      } catch {
        if (!cancelled) {
          setDetectionCount(0)
          setTranslationCount(0)
        }
      }
    }

    loadCounts()

    return () => { cancelled = true }
  }, [user])

  const profileInfo = profileData?.personalInfo || {}
  const profileAddress = profileData?.address || {}
  const profileName = profileInfo.fullName || profileInfo.name || user?.fullName || user?.name || 'Pengguna'
  const profileEmail = profileInfo.email || user?.email || 'belum-diisi@example.com'
  const firstName = profileName.split(' ')[0] || profileName
  const lastName = profileName.split(' ').slice(1).join(' ') || 'Belum diisi'

  const fieldCardCls = isDark
    ? 'border-[rgba(74,85,101,0.45)] bg-[rgba(30,41,57,0.9)] shadow-[0px_12px_24px_rgba(0,0,0,0.18)]'
    : 'border-[rgba(229,231,235,0.7)] bg-white shadow-[0px_12px_24px_rgba(15,23,42,0.08)]'

  const statCardCls = isDark
    ? 'border-[rgba(74,85,101,0.45)] bg-[rgba(30,41,57,0.9)] shadow-[0px_10px_20px_rgba(0,0,0,0.12)]'
    : 'border-[rgba(229,231,235,0.75)] bg-white shadow-[0px_10px_20px_rgba(15,23,42,0.08)]'

  const settingsCardCls = isDark
    ? 'rounded-[16px] border border-[#374151] bg-[#1f2937] p-5 shadow-[0px_12px_24px_rgba(0,0,0,0.18)] transition-colors duration-300 sm:p-6'
    : 'rounded-[16px] border border-[#e5e7eb] bg-white p-5 shadow-[0px_12px_24px_rgba(15,23,42,0.08)] transition-colors duration-300 sm:p-6'

  return (
    <div className="bg-[var(--page-bg)] px-4 py-8 transition-colors duration-300 sm:px-6 lg:px-0 lg:py-12">
      <div className="mx-auto flex max-w-[768px] flex-col gap-5 sm:gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-[44px]">Profil Saya</h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)] sm:text-base">Kelola informasi pribadi dan pengaturan akun Anda</p>
        </div>

        {profileError && (
          <div className={`rounded-[12px] border p-4 ${isDark ? 'bg-[rgba(234,179,8,0.15)] border-[#ca8a04] text-[#fbbf24]' : 'bg-[#fefce8] border-[#eab308] text-[#854d0e]'}`}>
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-medium">{profileError}</span>
            </div>
          </div>
        )}

        <section className={`rounded-[16px] border p-4 transition-colors duration-300 sm:p-6 ${fieldCardCls}`}>
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2b7fff] to-[#9810fa] text-white shadow-[0px_18px_25px_rgba(43,127,255,0.22),0px_8px_12px_rgba(152,16,250,0.2)] sm:h-24 sm:w-24">
              <ProfileIcon className="h-10 w-10 sm:h-12 sm:w-12" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[var(--text-primary)] sm:text-[22px]">{profileName}</h2>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">Pengguna Aktif</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-[var(--text-muted)]">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M8 14s4.5-4.1 4.5-7.5A4.5 4.5 0 1 0 3.5 6.5C3.5 9.9 8 14 8 14Z" stroke="currentColor" strokeWidth="1.25" />
                  <circle cx="8" cy="6.5" r="1.4" stroke="currentColor" strokeWidth="1.25" />
                </svg>
                Indonesia
              </p>
            </div>
          </div>
        </section>

        <section className={`rounded-[16px] border p-5 transition-colors duration-300 sm:p-6 ${fieldCardCls}`}>
          <div className="mb-6 flex items-start justify-between gap-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Informasi Pribadi</h3>
            <EditButton to="/profile/edit-info">Edit</EditButton>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <InfoField label="Nama Depan" value={firstName} />
            <InfoField label="Nama Belakang" value={lastName} />
            <InfoField label="Alamat Email" value={profileEmail} spanClassName="md:col-span-2" />
          </div>
        </section>

        <section className={`rounded-[16px] border p-5 transition-colors duration-300 sm:p-6 ${fieldCardCls}`}>
          <div className="mb-6 flex items-start justify-between gap-4">
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Alamat</h3>
            <EditButton to="/profile/edit-address">Edit</EditButton>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <InfoField label="Negara" value={profileAddress.country || 'Belum diisi'} />
            <InfoField label="Kota" value={profileAddress.city || 'Belum diisi'} />
            <InfoField label="Kode Pos" value={profileAddress.postalCode || profileAddress.postal_code || 'Belum diisi'} />
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          <article className={`interactive-card group flex items-center gap-4 rounded-[14px] border p-4 transition-colors duration-300 ${statCardCls}`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#2b7fff] to-[#155dfc] text-white shadow-[0px_12px_18px_rgba(43,127,255,0.2)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:shadow-[0px_16px_24px_rgba(43,127,255,0.3)]">
              <StatIcon tone="blue" />
            </div>
            <div>
              <div className="text-sm text-[var(--text-muted)]">Total Analisis</div>
              <div className="text-[28px] font-bold leading-none text-[var(--text-primary)]">{detectionCount}</div>
            </div>
          </article>

          <article className={`interactive-card group flex items-center gap-4 rounded-[14px] border p-4 transition-colors duration-300 ${statCardCls}`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#ad46ff] to-[#9810fa] text-white shadow-[0px_12px_18px_rgba(152,16,250,0.2)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:shadow-[0px_16px_24px_rgba(152,16,250,0.3)]">
              <StatIcon tone="purple" />
            </div>
            <div>
              <div className="text-sm text-[var(--text-muted)]">Terjemahan</div>
              <div className="text-[28px] font-bold leading-none text-[var(--text-primary)]">{translationCount}</div>
            </div>
          </article>

          <article className={`interactive-card group flex items-center gap-4 rounded-[14px] border p-4 transition-colors duration-300 ${statCardCls}`}>
            <div className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-gradient-to-br from-[#00c950] to-[#00a63e] text-white shadow-[0px_12px_18px_rgba(0,201,80,0.2)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:shadow-[0px_16px_24px_rgba(0,201,80,0.3)]">
              <StatIcon tone="green" />
            </div>
            <div>
              <div className="text-sm text-[var(--text-muted)]">Bergabung Sejak</div>
              <div className="text-[20px] font-bold leading-none text-[var(--text-primary)]">{joinedSince}</div>
            </div>
          </article>
        </section>

        <section className={settingsCardCls}>
          <h3 className={isDark ? 'text-lg font-bold text-white' : 'text-lg font-bold text-[#111827]'}>Pengaturan Akun</h3>

          <div className="mt-5 space-y-3">
            <SettingRow
              isDark={isDark}
              to="/profile/edit-password"
              title="Ubah Password"
              icon={
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M5.5 8.25V6.75C5.5 3.98 7.73 1.75 10.5 1.75C13.27 1.75 15.5 3.98 15.5 6.75V8.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M4.75 8.25H16.25C17.0784 8.25 17.75 8.92157 17.75 9.75V16.25C17.75 17.0784 17.0784 17.75 16.25 17.75H4.75C3.92157 17.75 3.25 17.0784 3.25 16.25V9.75C3.25 8.92157 3.92157 8.25 4.75 8.25Z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M10.5 12V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
            />

            <SettingRow
              isDark={isDark}
              to="/profile/accessibility"
              title="Pengaturan Aksesibilitas"
              icon={
                <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <circle cx="10" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3.75 8.25H16.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M6.25 17.25L8.5 11.25H11.5L13.75 17.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M10 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
            />
          </div>
        </section>
      </div>
    </div>
  )
}