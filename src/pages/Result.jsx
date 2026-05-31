import React, { useContext, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Button from '../components/ui/Button'
import NetworkErrorLight from '../assets/NetworkErrorLight.svg'
import NetworkErrorDark from '../assets/NetworkErrorDark.svg'
import ServerErrorLight from '../assets/ServerErrorLight.svg'
import ServerErrorDark from '../assets/ServerErrorDark.svg'
import ErrorFormatLight from '../assets/ErrorFormatLight.svg'
import ErrorFormatDark from '../assets/ErrorFormatDark.svg'

function formatDate(value) {
  if (!value) {
    return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return parsed.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

function resolveImageUrl(imageUrl) {
  if (!imageUrl) {
    return ''
  }

  if (imageUrl.startsWith('http') || imageUrl.startsWith('blob:') || imageUrl.startsWith('data:')) {
    return imageUrl
  }

  const baseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/$/, '')
  return `${baseUrl}/${imageUrl.replace(/^\//, '')}`
}

export default function Result() {
  const { theme } = useContext(AppContext)
  const isDark = theme === 'dark'
  const location = useLocation()
  const navigate = useNavigate()

  const mode = location.state?.mode || 'detect'
  const analysis = location.state?.analysis || null
  const historyItem = location.state?.history || null
  const errorType = location.state?.errorType || null
  const imageUrl = location.state?.imageUrl || historyItem?.image_url || ''
  const resolvedImageUrl = resolveImageUrl(imageUrl)
  const isDetection = mode === 'detect'

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const analysisDate = useMemo(() => formatDate(historyItem?.created_at), [historyItem?.created_at])
  const confidence = Math.round(((analysis?.confidence ?? historyItem?.confidence ?? 0) * 100))
  const predictedText = analysis?.predictedText || historyItem?.predicted_text || ''
  const sourceText = analysis?.sourceText || historyItem?.source_text || predictedText
  const translatedText = analysis?.translatedText || historyItem?.translated_text || ''
  const resultLabel = analysis?.resultLabel || historyItem?.result_label || (isDetection ? 'Selesai' : 'Selesai')
  const notes = analysis?.notes || 'Hasil berhasil diterima dari backend dan tersimpan ke riwayat.'

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    window.setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' })
    }, 3000)
  }

  const handleExport = () => {
    showToast('Ekspor PDF akan dihubungkan ke backend pada tahap berikutnya.', 'success')
  }

  const handleOpenHistory = () => {
    navigate('/history')
  }

  const handleBackToUpload = () => {
    navigate('/upload')
  }

  const pageBgCls = isDark ? 'bg-[#0f172a] text-white' : 'bg-[#E5E7EB] text-gray-900'
  const cardCls = `w-full rounded-2xl p-6 shadow-sm ${isDark ? 'bg-[#1e2939]' : 'bg-white'}`
  const subTextCls = isDark ? 'text-gray-400' : 'text-gray-500'

  if (errorType) {
    const icon = errorType === 'network'
      ? (isDark ? NetworkErrorDark : NetworkErrorLight)
      : errorType === 'server'
        ? (isDark ? ServerErrorDark : ServerErrorLight)
        : (isDark ? ErrorFormatDark : ErrorFormatLight)

    const title = errorType === 'network'
      ? 'Koneksi Internet Bermasalah'
      : errorType === 'server'
        ? 'Server Sedang Bermasalah'
        : 'Hasil Gagal Dimuat'

    const desc = errorType === 'network'
      ? 'Periksa koneksi Anda lalu coba upload ulang.'
      : errorType === 'server'
        ? 'Backend tidak merespons dengan benar. Coba lagi beberapa saat.'
        : 'Terjadi kesalahan saat memproses gambar.'

    return (
      <div className={`min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 ${pageBgCls}`}>
        <img src={icon} alt="" className="mb-6 h-40 w-40 object-contain" />
        <h1 className="mb-3 text-center text-2xl font-bold">{title}</h1>
        <p className={`mb-8 max-w-sm text-center ${subTextCls}`}>{desc}</p>
        <div className="flex w-full max-w-xs flex-col gap-3">
          <Button variant="primary" size="lg" isDark={isDark} onClick={handleBackToUpload} className="w-full">
            Upload Ulang
          </Button>
          <Button variant="secondary" size="lg" isDark={isDark} onClick={() => navigate(-1)} className="w-full">
            Kembali
          </Button>
        </div>
      </div>
    )
  }

  if (!analysis && !historyItem) {
    return (
      <div className={`min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 ${pageBgCls}`}>
        <h1 className="mb-3 text-2xl font-bold">Belum ada hasil analisis</h1>
        <p className={`mb-8 max-w-md text-center ${subTextCls}`}>
          Upload gambar terlebih dahulu agar backend bisa memproses dan menyimpan hasilnya ke riwayat.
        </p>
        <Button variant="primary" size="lg" isDark={isDark} onClick={handleBackToUpload}>
          Ke Upload
        </Button>
      </div>
    )
  }

  return (
    <div className={`min-h-[calc(100vh-64px)] p-6 md:p-10 ${pageBgCls} relative`}>
      {toast.show && (
        <div className="fixed left-1/2 top-24 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`flex items-center gap-3 rounded-xl border px-6 py-4 shadow-lg ${toast.type === 'success'
            ? (isDark ? 'border-green-700 bg-green-900/90 text-green-100' : 'border-green-200 bg-green-50 text-green-800')
            : (isDark ? 'border-red-700 bg-red-900/90 text-red-100' : 'border-red-200 bg-red-50 text-red-800')
          }`}>
            <span className={`flex h-6 w-6 items-center justify-center rounded-full text-white ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
              {toast.type === 'success' ? (
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M4 10L9 15L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              )}
            </span>
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
        </div>
      )}

      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-1 text-2xl font-bold">{isDetection ? 'Hasil Analisis' : 'Hasil Terjemahan'}</h1>
            <p className={subTextCls}>{analysisDate}</p>
            <p className={`mt-1 text-sm ${subTextCls}`}>{historyItem?.image_url ? historyItem.image_url.split('/').pop() : 'upload-image'}</p>
          </div>
          <Button
            variant="secondary"
            size="md"
            isDark={isDark}
            onClick={handleExport}
            leftIcon={(
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            )}
          >
            Export PDF
          </Button>
        </div>

        <section className={`${cardCls} overflow-hidden`}>
          <h2 className="mb-4 text-lg font-bold">Gambar yang Dianalisis</h2>
          <div className="flex min-h-[240px] items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
            <img src={resolvedImageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop'} alt="Gambar dianalisis" className="max-h-[320px] w-full object-contain" />
          </div>
        </section>

        {isDetection ? (
          <>
            <section className={`${cardCls} flex flex-col gap-6 md:flex-row md:items-center`}>
              <div className="relative flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-8 border-blue-500">
                <span className="bg-inherit px-2 text-2xl font-bold text-blue-500">{confidence}%</span>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-bold">{resultLabel}</h2>
                <p className={subTextCls}>{notes}</p>
              </div>
            </section>

            <section className={cardCls}>
              <h2 className="mb-4 text-lg font-bold">Teks OCR</h2>
              <div className="flex flex-wrap gap-2">
                {(predictedText || 'Belum ada teks OCR dari backend').split(/\s+/).filter(Boolean).slice(0, 12).map((word) => (
                  <span key={word} className={`rounded-lg border px-3 py-1.5 font-mono text-sm ${isDark ? 'border-gray-700 bg-gray-800 text-blue-300' : 'border-gray-200 bg-gray-100 text-blue-700'}`}>
                    {word}
                  </span>
                ))}
              </div>
            </section>

            <section className={cardCls}>
              <h2 className="mb-3 text-lg font-bold">Catatan</h2>
              <p className={subTextCls}>{notes}</p>
            </section>
          </>
        ) : (
          <>
            <section className={cardCls}>
              <h2 className="mb-4 text-lg font-bold">Ringkasan Terjemahan</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className={`mb-2 text-sm font-semibold ${subTextCls}`}>Tulisan Asli</p>
                  <div className={`rounded-xl border p-4 font-mono ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    {sourceText || 'Belum ada teks asli dari backend'}
                  </div>
                </div>
                <div>
                  <p className={`mb-2 text-sm font-semibold ${subTextCls}`}>Teks Hasil</p>
                  <div className={`rounded-xl border p-4 font-mono ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    {translatedText || 'Belum ada hasil terjemahan dari backend'}
                  </div>
                </div>
              </div>
            </section>

            <section className={cardCls}>
              <h2 className="mb-3 text-lg font-bold">Catatan</h2>
              <p className={subTextCls}>{notes}</p>
            </section>
          </>
        )}

        <div className="mb-10 flex justify-end">
          <Button variant="primary" size="lg" isDark={isDark} onClick={handleOpenHistory}>
            Lihat Riwayat
          </Button>
        </div>
      </div>
    </div>
  )
}
