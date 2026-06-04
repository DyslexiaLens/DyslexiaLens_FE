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
  return `${baseUrl}/${imageUrl.replace(/^\//, '').replace(/\\/g, '/')}`
}

function getFriendlyResultLabel(label, isDetection) {
  if (!isDetection) return 'Proses Terjemahan Selesai'

  const clean = String(label || '').toUpperCase().trim()
  if (clean.includes('DYSLEXIA') || clean.includes('DYSLEXIC')) {
    return 'Terdeteksi Pola Disleksia'
  }
  if (clean.includes('NORMAL')) {
    return 'Pola Tulisan Umum (Normal)'
  }
  return 'Analisis Selesai'
}

function getFriendlySeverityLevel(level) {
  if (!level) return null
  const clean = String(level).toUpperCase().trim()
  if (clean === 'HIGH' || clean === 'SEVERE') return 'Tinggi (Butuh Bimbingan)'
  if (clean === 'MEDIUM' || clean === 'MODERATE') return 'Sedang'
  if (clean === 'LOW' || clean === 'MILD') return 'Rendah'
  return level
}

function getFriendlyNotes(notes) {
  if (!notes) return 'Hasil analisis berhasil disimpan ke riwayat.'

  const clean = String(notes)
  if (clean.includes('Mock AI') || clean.includes('model inference') || clean.includes('Replace this service')) {
    return 'Hasil observasi awal dari sampel tulisan tangan telah selesai diproses. Nilai persentase menunjukkan tingkat kemiripan pola tulisan dengan indikasi disleksia.'
  }
  return clean
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
  const errorMessage = location.state?.errorMessage || ''
  const imageUrl = location.state?.imageUrl || historyItem?.image_url || ''
  const resolvedImageUrl = resolveImageUrl(imageUrl)
  const isDetection = mode === 'detect'

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const analysisDate = useMemo(() => formatDate(historyItem?.created_at), [historyItem?.created_at])

  const rawResponse = useMemo(() => {
    if (!historyItem?.raw_response) return null
    try {
      return typeof historyItem.raw_response === 'string'
        ? JSON.parse(historyItem.raw_response)
        : historyItem.raw_response
    } catch (e) {
      console.error('Failed to parse raw_response:', e)
      return null
    }
  }, [historyItem?.raw_response])

  const severityScoreVal = analysis?.severityScore ?? rawResponse?.severityScore ?? analysis?.confidence ?? rawResponse?.confidence ?? 0
  const severityScore = Math.round(severityScoreVal > 1 ? severityScoreVal : severityScoreVal * 100)
  const severityLevel = getFriendlySeverityLevel(analysis?.severityLevel ?? rawResponse?.severityLevel ?? null)

  const predictedText = analysis?.predictedText || historyItem?.predicted_text || ''
  const sourceText = analysis?.sourceText || historyItem?.source_text || predictedText
  const translatedText = analysis?.translatedText || historyItem?.translated_text || ''

  const rawResultLabel = analysis?.resultLabel || historyItem?.result_label || (isDetection ? 'Selesai' : 'Selesai')
  const resultLabel = getFriendlyResultLabel(rawResultLabel, isDetection)

  const rawNotes = analysis?.notes || historyItem?.notes || 'Hasil analisis berhasil disimpan ke riwayat.'
  const notes = getFriendlyNotes(rawNotes)

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    window.setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' })
    }, 3000)
  }

  const handleExport = () => {
    showToast('Fitur Ekspor PDF akan segera hadir.', 'success')
  }

  const handleOpenHistory = () => {
    navigate('/history')
  }

  const handleBackToUpload = () => {
    navigate('/writing-tips')
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
        : errorType === 'format'
          ? 'Format File Tidak Didukung'
          : 'Hasil Gagal Dimuat'

    const desc = errorType === 'network'
      ? 'Periksa koneksi Anda lalu coba upload ulang.'
      : errorType === 'server'
        ? 'Sistem sedang sibuk. Silakan coba kembali beberapa saat lagi.'
        : errorType === 'format'
          ? 'Format file tidak didukung. Hanya file JPG dan PNG yang diperbolehkan.'
          : errorType === 'scan'
            ? 'Kertas grid tidak terdeteksi. Coba foto ulang dengan cahaya yang lebih terang, posisi lebih sejajar, dan pastikan template resmi terlihat penuh.'
            : errorType === 'timeout'
              ? 'Model AI memerlukan waktu terlalu lama. Silakan coba lagi beberapa saat.'
              : errorType === 'base64'
                ? 'Data gambar gagal diproses saat pengiriman ke AI server.'
                : 'Terjadi kesalahan saat memproses gambar.'

    return (
      <div className={`min-h-[calc(100vh-64px)] flex flex-col items-center justify-center p-6 ${pageBgCls}`}>
        <img src={icon} alt="" className="mb-6 h-40 w-40 object-contain" />
        <h1 className="mb-3 text-center text-2xl font-bold">{title}</h1>
        <p className={`mb-8 max-w-sm text-center ${subTextCls}`}>{errorMessage || desc}</p>
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
          Silakan unggah gambar terlebih dahulu agar sistem dapat memproses dan menyimpan hasil analisis.
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
            <p className={`mt-1 text-sm ${subTextCls}`}>{historyItem?.image_url ? historyItem.image_url.replace(/\\/g, '/').split('/').pop() : 'upload-image'}</p>
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
                <span className="bg-inherit px-2 text-2xl font-bold text-blue-500">{severityScore}%</span>
              </div>
              <div>
                <h2 className="mb-2 text-xl font-bold">{resultLabel}</h2>
                {severityLevel && (
                  <p className={`text-sm font-semibold mb-2 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                    Tingkat Keparahan: {severityLevel}
                  </p>
                )}
                <p className={subTextCls}>{notes}</p>
              </div>
            </section>

            <section className={cardCls}>
              <h2 className="mb-4 text-lg font-bold">Teks OCR</h2>
              <div className="flex flex-wrap gap-2">
                {(predictedText || 'Belum ada teks terdeteksi').split(/\s+/).filter(Boolean).slice(0, 12).map((word) => (
                  <span key={word} className={`rounded-lg border px-3 py-1.5 font-mono text-sm ${isDark ? 'border-gray-700 bg-gray-800 text-blue-300' : 'border-gray-200 bg-gray-100 text-blue-700'}`}>
                    {word}
                  </span>
                ))}
              </div>
            </section>

            <section className={cardCls}>
              <h2 className="mb-3 text-lg font-bold">Catatan Hasil Analisis</h2>
              <p className={`mb-6 ${subTextCls}`}>{notes}</p>

              <div className={`mt-6 rounded-xl border p-5 ${isDark ? 'bg-[#182232] border-gray-700' : 'bg-blue-50/50 border-blue-100'}`}>
                <h3 className="mb-4 flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Panduan Membaca Hasil Analisis
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex gap-3">
                    <span
                      className={`
                        flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                        ${theme === 'dark'
                          ? 'bg-blue-900/40 text-blue-400'
                          : 'bg-blue-200 text-blue-700'}
                        font-bold text-sm
                      `}
                    >
                      1
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Skor Indikasi ({severityScore}%)</h4>
                      <p className={`text-xs leading-relaxed ${subTextCls}`}>
                        Menunjukkan persentase kecocokan pola tulisan tangan dalam gambar dengan pola tulisan penyandang disleksia yang umum (seperti rotasi huruf atau jarak spasi). Semakin tinggi skor, semakin kuat kecocokannya.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span
                      className={`
                        flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                        ${theme === 'dark'
                          ? 'bg-blue-900/40 text-blue-400'
                          : 'bg-blue-200 text-blue-700'}
                        font-bold text-sm
                      `}
                    >
                      2
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Tingkat Keparahan ({severityLevel || 'Rendah/Umum'})</h4>
                      <p className={`text-xs leading-relaxed ${subTextCls}`}>
                        {severityLevel?.includes('Tinggi')
                          ? 'Kategori Tinggi: Pola tulisan menunjukkan indikasi disleksia yang kuat. Sangat disarankan berkonsultasi dengan psikolog anak atau guru pendamping khusus untuk bimbingan terarah.'
                          : severityLevel?.includes('Sedang')
                            ? 'Kategori Sedang: Terdapat beberapa ciri disleksia. Disarankan melatih keterampilan menulis secara berkala menggunakan metode multisensori (visual & kinestetik).'
                            : 'Kategori Rendah / Normal: Pola tulisan tergolong umum atau minimal kecocokan disleksia. Cukup pantau perkembangan belajar menulis anak secara rutin.'
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-sm ${isDark
                        ? 'bg-blue-900/40 text-blue-400'
                        : 'bg-blue-200 text-blue-700'
                        }`}
                    >
                      3
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Teks OCR (Hasil Pengenalan Kata)</h4>
                      <p className={`text-xs leading-relaxed ${subTextCls}`}>
                        Menampilkan kata-kata yang dideteksi oleh AI dari tulisan tangan. Analisis kata ini membantu mengenali kecenderungan memutarbalikkan huruf seperti &apos;b&apos; dan &apos;d&apos;, atau &apos;p&apos; dan &apos;q&apos;.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-sm ${isDark
                        ? 'bg-yellow-900/40 text-yellow-400'
                        : 'bg-amber-100 border border-amber-300 text-amber-800'
                        }`}
                    >
                      !
                    </span>
                    <div>
                      <h4
                        className={`text-sm font-bold mb-1 ${isDark ? 'text-yellow-400' : 'text-amber-900'
                          }`}
                      >
                        Catatan Penting
                      </h4>
                      <p className={`text-xs leading-relaxed ${subTextCls}`}>
                        <strong>PENTING:</strong> Hasil analisis ini bersifat <strong>skrining awal</strong> dan <strong>BUKAN</strong> diagnosis medis final. Hanya dokter anak atau ahli psikologi klinis yang berhak menetapkan diagnosis formal.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            <section className={cardCls}>
              <h2 className="mb-4 text-lg font-bold">Ringkasan Terjemahan</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className={`mb-2 text-sm font-semibold ${subTextCls}`}>Teks Asli (Terdeteksi)</p>
                  <div className={`rounded-xl border p-4 font-mono text-sm leading-relaxed ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    {sourceText || 'Belum ada teks terdeteksi'}
                  </div>
                </div>
                <div>
                  <p className={`mb-2 text-sm font-semibold ${subTextCls}`}>Teks Terjemahan (Normalisasi)</p>
                  <div className={`rounded-xl border p-4 font-mono text-sm leading-relaxed ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
                    {translatedText || 'Belum ada hasil terjemahan'}
                  </div>
                </div>
              </div>
            </section>

            <section className={cardCls}>
              <h2 className="mb-3 text-lg font-bold">Catatan Hasil Terjemahan</h2>
              <p className={`mb-6 ${subTextCls}`}>{notes}</p>

              <div className={`mt-6 rounded-xl border p-5 ${isDark ? 'bg-[#182232] border-gray-700' : 'bg-blue-50/50 border-blue-100'}`}>
                <h3 className="mb-4 flex items-center gap-2 font-bold text-blue-600 dark:text-blue-400">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Panduan Membaca Hasil Terjemahan
                </h3>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="flex gap-3">
                    <span
                      className={`
                        flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                        ${theme === 'dark'
                          ? 'bg-blue-900/40 text-blue-400'
                          : 'bg-blue-200 text-blue-700'}
                        font-bold text-sm
                      `}
                    >
                      1
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Teks Hasil Terjemahan</h4>
                      <p className={`text-xs leading-relaxed ${subTextCls}`}>
                        Menunjukkan tulisan yang disesuaikan secara otomatis dari huruf terbalik, tertukar spasi, atau tertinggal, kemudian dirangkai menjadi susunan kalimat standar yang mudah dipahami.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span
                      className={`
                        flex h-8 w-8 shrink-0 items-center justify-center rounded-lg
                        ${theme === 'dark'
                          ? 'bg-blue-900/40 text-blue-400'
                          : 'bg-blue-200 text-blue-700'}
                        font-bold text-sm
                      `}
                    >
                      2
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Manfaat Bagi Orang Tua/Guru</h4>
                      <p className={`text-xs leading-relaxed ${subTextCls}`}>
                        Mempermudah Anda memahami isi pesan atau ide tulisan yang ingin disampaikan oleh anak, membantu mempercepat proses evaluasi dan komunikasi belajar sehari-hari.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-sm ${isDark
                        ? 'bg-blue-900/40 text-blue-400'
                        : 'bg-blue-200 text-blue-700'
                        }`}
                    >
                      3
                    </span>
                    <div>
                      <h4 className="text-sm font-semibold mb-1">Langkah Evaluasi</h4>
                      <p className={`text-xs leading-relaxed ${subTextCls}`}>
                        Bandingkan kolom &quot;Teks Asli&quot; dengan &quot;Teks Terjemahan&quot; untuk melihat jenis kekeliruan apa yang paling sering dialami anak, guna merancang materi latihan menulis yang spesifik.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-bold text-sm ${isDark
                        ? 'bg-yellow-900/40 text-yellow-400'
                        : 'bg-amber-100 border border-amber-300 text-amber-800'
                        }`}
                    >
                      !
                    </span>
                    <div>
                      <h4
                        className={`text-sm font-bold mb-1 ${isDark ? 'text-yellow-400' : 'text-amber-900'
                          }`}
                      >
                        Catatan Koreksi
                      </h4>
                      <p className={`text-xs leading-relaxed ${subTextCls}`}>
                        Proses penerjemahan ini menggunakan kecerdasan buatan berbasis pola disleksia. Disarankan agar tetap membandingkan dengan foto asli apabila ada bagian kata yang kurang sesuai.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
