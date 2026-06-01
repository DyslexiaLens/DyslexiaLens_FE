import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

// UI Components
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import EmptyState from '../components/ui/EmptyState'
import { HistoryCardSkeleton } from '../components/ui/Skeleton'
import { deleteHistory as deleteHistoryRequest, getHistories } from '../services/historyService'

// Icons import for Empty States
import historyLightIcon from '../assets/HistoryLight.svg'
import historyDarkIcon from '../assets/HistoryDark.svg'

function formatHistoryDate(value) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return 'Baru saja'
  }

  return parsed.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatHistoryTime(value) {
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) {
    return '00:00 WIB'
  }

  return `${parsed.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`
}

function normalizeHistoryItem(item) {
  const isDetection = Boolean(item.predicted_text)
  const fileName = item.image_url ? item.image_url.split('/').pop() : 'upload-image'

  return {
    id: item.id,
    date: formatHistoryDate(item.created_at),
    time: formatHistoryTime(item.created_at),
    mode: isDetection ? 'detect' : 'translate',
    fileName,
    imageUrl: item.image_url,
    score: isDetection ? `${Math.round((item.confidence || 0) * 100)}%` : null,
    indication: isDetection ? (item.result_label || 'Selesai') : null,
    findingsCount: isDetection ? 1 : null,
    translatedText: item.translated_text || null,
    originalText: item.source_text || item.predicted_text || null,
    raw: item,
  }
}

function mapHistoryItems(items) {
  return Array.isArray(items) ? items.map(normalizeHistoryItem) : []
}

function mapHistoryMode(item) {
  return item.mode || (item.predicted_text ? 'detect' : 'translate')
}

function mapHistoryFileName(item) {
  return item.fileName || item.imageUrl?.split('/').pop() || 'upload-image'
}

function mapResultLabel(label) {
  if (!label) return 'Selesai'
  if (label === 'LIKELY_DYSLEXIA_PATTERN') return 'Tinggi'
  if (label === 'MILD_DYSLEXIA_PATTERN') return 'Sedang'
  return label
}

/* ── Small helper: Badge ──────────────────────────────────────────────────── */
function Badge({ children, color }) {
  const colors = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30',
    green: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/30',
    red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/30',
    amber: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30',
  }
  const dotColors = {
    blue: 'bg-blue-500 dark:bg-blue-400',
    green: 'bg-green-500 dark:bg-green-400',
    red: 'bg-red-500 dark:bg-red-400',
    amber: 'bg-amber-500 dark:bg-amber-400',
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all duration-200 shadow-sm ${colors[color]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColors[color]}`} />
      {children}
    </span>
  )
}

/* ── Toast ────────────────────────────────────────────────────────────────── */
function Toast({ show, message, type, isDark }) {
  if (!show) return null
  const isSuccess = type === 'success'
  return (
    <div
      className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-top-4 fade-in duration-300"
      role="status"
      aria-live="polite"
    >
      <div
        className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border ${
          isSuccess
            ? isDark ? 'bg-green-900/90 border-green-700 text-green-100' : 'bg-green-50 border-green-200 text-green-800'
            : isDark ? 'bg-red-900/90 border-red-700 text-red-100' : 'bg-red-50 border-red-200 text-red-800'
        }`}
      >
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSuccess ? 'bg-green-500' : 'bg-red-500'} text-white`}>
          {isSuccess ? (
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10L9 15L16 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span className="font-semibold text-sm">{message}</span>
      </div>
    </div>
  )
}

/* ── Delete / Danger Icon ─────────────────────────────────────────────────── */
const TrashIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const WarningIcon = () => (
  <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
  </svg>
)

/* ── Main Component ───────────────────────────────────────────────────────── */
export default function History() {
  const { theme } = useContext(AppContext)
  const isDark = theme === 'dark'
  const navigate = useNavigate()

  // State
  const [historyList, setHistoryList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showClearAllModal, setShowClearAllModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, activeTab])

  useEffect(() => {
    let mounted = true

    const loadHistories = async () => {
      try {
        const response = await getHistories()
        const histories = response.data?.histories || []

        if (mounted) {
          setHistoryList(mapHistoryItems(histories))
        }
      } catch {
        if (mounted) {
          setHistoryList([])
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    loadHistories()

    return () => {
      mounted = false
    }
  }, [])

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }

  const handleViewDetail = (item) => {
    const mode = mapHistoryMode(item)
    navigate('/result', {
      state: {
        mode,
        imageUrl: item.imageUrl,
        history: item.raw || item,
        analysis: item.raw || item,
      }
    })
  }

  const confirmDelete = (item) => { setSelectedItem(item); setShowDeleteModal(true) }

  const handleDelete = () => {
    if (!selectedItem) return
    deleteHistoryRequest(selectedItem.id)
      .then(() => {
        setHistoryList(historyList.filter((i) => i.id !== selectedItem.id))
        triggerToast('Riwayat analisis berhasil dihapus!')
      })
      .catch(() => {
        triggerToast('Gagal menghapus riwayat.', 'error')
      })
      .finally(() => {
        setShowDeleteModal(false)
        setSelectedItem(null)
      })
  }

  const handleClearAll = () => {
    Promise.all(historyList.map((item) => deleteHistoryRequest(item.id))).then(() => {
      setHistoryList([])
      triggerToast('Seluruh riwayat analisis berhasil dihapus!')
    }).catch(() => {
      triggerToast('Gagal menghapus seluruh riwayat.', 'error')
    }).finally(() => {
      setShowClearAllModal(false)
    })
  }

  // Filtering
  const filteredList = historyList.filter((item) => {
    const q = searchQuery.toLowerCase()
    const match =
      mapHistoryFileName(item).toLowerCase().includes(q) ||
      (item.score && item.score.includes(q)) ||
      (item.indication && item.indication.toLowerCase().includes(q))
    return activeTab === 'all' ? match : mapHistoryMode(item) === activeTab && match
  })

  // Pagination
  const totalPages = Math.ceil(filteredList.length / itemsPerPage)
  const currentItems = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // Theme helpers
  const pageBgCls = isDark ? 'bg-[#0f172a] text-white' : 'bg-[#E5E7EB] text-gray-900'
  const cardCls = `interactive-card group w-full p-6 rounded-2xl shadow-sm border hover:shadow-md ${isDark ? 'bg-[#1e2939] border-gray-700' : 'bg-white border-gray-100'}`
  const subTextCls = isDark ? 'text-gray-400' : 'text-gray-500'
  const inputCls = `w-full h-11 pl-10 pr-4 rounded-lg border text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-1 ${
    isDark
      ? 'bg-[#0f172a] border-gray-700 text-white focus:border-[#2b7fff] focus-visible:ring-offset-[#0f172a]'
      : 'bg-white border-gray-300 text-gray-900 focus:border-[#2b7fff] focus-visible:ring-offset-white'
  }`

  return (
    <div className={`min-h-[calc(100vh-64px)] p-6 md:p-10 ${pageBgCls} relative transition-colors duration-300`}>

      <Toast show={toast.show} message={toast.message} type={toast.type} isDark={isDark} />

      <div className="max-w-4xl mx-auto flex flex-col gap-6">

        {/* ── Page Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Riwayat Analisis</h1>
            <p className={`mt-1 text-sm ${subTextCls}`}>
              Kelola dan tinjau hasil analisis OCR dan deteksi disleksia sebelumnya.
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
            {historyList.length > 0 && (
              <Button
                variant="danger-outline"
                size="md"
                isDark={isDark}
                onClick={() => setShowClearAllModal(true)}
                rightIcon={<TrashIcon />}
              >
                Hapus Semua
              </Button>
            )}
            <Link
              to="/writing-tips"
              className={[
                'inline-flex h-11 px-5 items-center justify-center gap-2 rounded-xl font-semibold text-sm',
                'btn-lift bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                isDark ? 'focus-visible:ring-offset-[#0f172a]' : 'focus-visible:ring-offset-white',
              ].join(' ')}
            >
              Mulai Analisis Baru
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </Link>
          </div>
        </div>

        {/* ── Toolbar ── */}
        <div className={`flex flex-col md:flex-row gap-4 p-4 rounded-xl border shadow-sm ${isDark ? 'bg-[#1e2939] border-gray-700' : 'bg-white border-gray-100'}`}>
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.25" aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="search"
              placeholder="Cari file, skor, atau tingkat indikasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={inputCls}
              aria-label="Cari riwayat"
            />
          </div>

          {/* Tab filters */}
          <div className={`flex p-1 rounded-lg ${isDark ? 'bg-[#0f172a]' : 'bg-gray-100'}`} role="tablist" aria-label="Filter mode">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'detect', label: 'Deteksi' },
              { id: 'translate', label: 'Terjemahan' },
            ].map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-md text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] ${
                  activeTab === tab.id
                    ? isDark ? 'bg-[#2b7fff] text-white' : 'bg-white text-gray-900 shadow-sm'
                    : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── History List ── */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            // Skeleton loading state
            <>
              <HistoryCardSkeleton isDark={isDark} />
              <HistoryCardSkeleton isDark={isDark} />
              <HistoryCardSkeleton isDark={isDark} />
            </>
          ) : currentItems.length > 0 ? (
            <>
              {currentItems.map((item) => (
                <div key={item.id} className={cardCls}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

                    {/* Left: Thumbnail & Meta */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <div className="w-16 h-16 shrink-0 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                        <img
                          src={item.imageUrl}
                          alt={`Thumbnail untuk ${item.fileName}`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <Badge color={item.mode === 'detect' ? 'blue' : 'green'}>
                            {mapHistoryMode(item) === 'detect' ? 'Deteksi' : 'Terjemahan'}
                          </Badge>
                          <span className={`text-xs flex items-center gap-1 ${subTextCls}`}>
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {item.date} • {item.time}
                          </span>
                        </div>
                        <h3 className="font-semibold text-base truncate pr-2">{item.fileName}</h3>
                      </div>
                    </div>

                    {/* Middle: Indicators */}
                    <div className="flex items-center gap-3 w-full sm:w-auto shrink-0 justify-start sm:justify-center">
                      {mapHistoryMode(item) === 'detect' ? (
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg font-bold text-blue-500 font-mono">{item.score}</span>
                          <Badge color={item.indication === 'Tinggi' ? 'red' : 'amber'}>
                            {mapResultLabel(item.indication)}
                          </Badge>
                        </div>
                      ) : (
                        <Badge color="green">Selesai</Badge>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-end">
                      <Button
                        variant="secondary"
                        size="sm"
                        isDark={isDark}
                        onClick={() => handleViewDetail(item)}
                        rightIcon={
                          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                            <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        }
                      >
                        Tinjau
                      </Button>
                      <Button
                        variant="danger-outline"
                        size="sm"
                        isDark={isDark}
                        onClick={() => confirmDelete(item)}
                        aria-label={`Hapus riwayat ${item.fileName}`}
                        className="!px-2.5"
                      >
                        <TrashIcon />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={`flex items-center justify-between mt-4 p-4 rounded-xl border shadow-sm transition-all duration-200 ${isDark ? 'bg-[#1e2939] border-gray-700' : 'bg-white border-gray-100'}`}>
                  <Button
                    variant="secondary"
                    size="sm"
                    isDark={isDark}
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    leftIcon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                      </svg>
                    }
                  >
                    Sebelumnya
                  </Button>

                  <div className="hidden sm:flex items-center gap-1.5" role="navigation" aria-label="Halaman">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          aria-label={`Halaman ${pageNum}`}
                          aria-current={currentPage === pageNum ? 'page' : undefined}
                          className={`w-9 h-9 rounded-lg text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                            currentPage === pageNum
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                              : isDark
                                ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                  </div>

                  <span className="sm:hidden text-xs font-bold text-[var(--text-secondary)]">
                    Halaman {currentPage} dari {totalPages}
                  </span>

                  <Button
                    variant="secondary"
                    size="sm"
                    isDark={isDark}
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    rightIcon={
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    }
                  >
                    Berikutnya
                  </Button>
                </div>
              )}
            </>
          ) : (
            /* ── Empty State ── */
            <EmptyState
              isDark={isDark}
              icon={isDark ? historyDarkIcon : historyLightIcon}
              iconAlt=""
              title="Belum Ada Riwayat Analisis"
              description={
                searchQuery
                  ? 'Tidak ada riwayat analisis yang cocok dengan kriteria pencarian Anda. Coba kata kunci lain.'
                  : 'Hasil analisis foto tulisan tangan disleksia atau konversi terjemahan teks Anda akan otomatis tersimpan rapi di sini.'
              }
              action={
                !searchQuery && (
                  <Link
                    to="/writing-tips"
                    className={[
                      'inline-flex h-12 px-8 items-center justify-center gap-2 rounded-xl font-bold text-sm',
                      'bg-blue-600 hover:bg-blue-700 active:translate-y-px text-white shadow-lg shadow-blue-500/30',
                      'transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                      isDark ? 'focus-visible:ring-offset-[#1e2939]' : 'focus-visible:ring-offset-white',
                    ].join(' ')}
                  >
                    Mulai Analisis Sekarang
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M4.167 10h11.666M10 4.167L15.833 10 10 15.833" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )
              }
            />
          )}
        </div>
      </div>

      {/* ── Delete Single Modal ── */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        isDark={isDark}
      >
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-red-600">
          <WarningIcon />
          Hapus Riwayat Analisis?
        </h3>
        <p className={`text-sm leading-relaxed mb-6 ${subTextCls}`}>
          Apakah Anda yakin ingin menghapus file{' '}
          <strong className="font-semibold text-[var(--text-primary)]">{selectedItem?.fileName}</strong> dari riwayat?
          Tindakan ini bersifat permanen dan tidak dapat dibatalkan.
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            isDark={isDark}
            onClick={() => setShowDeleteModal(false)}
          >
            Batal
          </Button>
          <Button
            variant="danger"
            isDark={isDark}
            onClick={handleDelete}
          >
            Hapus Permanen
          </Button>
        </div>
      </Modal>

      {/* ── Clear All Modal ── */}
      <Modal
        isOpen={showClearAllModal}
        onClose={() => setShowClearAllModal(false)}
        isDark={isDark}
      >
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-red-600">
          <WarningIcon />
          Hapus Seluruh Riwayat?
        </h3>
        <p className={`text-sm leading-relaxed mb-6 ${subTextCls}`}>
          Apakah Anda yakin ingin menghapus{' '}
          <strong className="font-semibold text-[var(--text-primary)]">seluruh</strong> riwayat analisis?
          Tindakan ini bersifat permanen dan semua riwayat Anda akan terhapus selamanya.
        </p>
        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            isDark={isDark}
            onClick={() => setShowClearAllModal(false)}
          >
            Batal
          </Button>
          <Button
            variant="danger"
            isDark={isDark}
            onClick={handleClearAll}
          >
            Hapus Semua
          </Button>
        </div>
      </Modal>

    </div>
  )
}
