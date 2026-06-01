import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Button from '../components/ui/Button'

// ── Local asset imports (use exported SVGs from assets/) ─────────────────────
import tipsIcon from '../assets/Tips.svg'
import uploadIcon from '../assets/Uploadsvg.svg'
import checklistLightIcon from '../assets/ChecklistUploadLight.svg'
import checklistDarkIcon from '../assets/ChecklistUploadDark.svg'
import detectOnIcon from '../assets/DetectOn.svg'
import detectOffIcon from '../assets/DetectOff.svg'
import translateOnIcon from '../assets/TranslateOn.svg'
import translateOffIcon from '../assets/TranslateOff.svg'
import errorFormatLight from '../assets/ErrorFormatLight.svg'
import errorFormatDark from '../assets/ErrorFormatDark.svg'
import fileSizeLight from '../assets/FileSizeLight.svg'
import fileSizeDark from '../assets/FileSizeDark.svg'
import networkErrLight from '../assets/NetworkErrorLight.svg'
import networkErrDark from '../assets/NetworkErrorDark.svg'
import serverErrLight from '../assets/ServerErrorLight.svg'
import serverErrDark from '../assets/ServerErrorDark.svg'
import { generatePracticeText } from '../services/aiService'

// ── Back arrow SVG (inline — no separate asset needed) ───────────────────────
function BackArrow({ isDark }) {
  const color = isDark ? '#d1d5dc' : '#364153'
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path d="M10 12L6 8l4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Chevron right SVG (inline) ───────────────────────────────────────────────
function ChevronRight({ isDark }) {
  const color = isDark ? '#99a1af' : '#4a5565'
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M7.5 15l5-5-5-5" stroke={color} strokeWidth="1.667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Error config map (exact colors from Figma nodes 11:29935, 11:30150, 11:30357, 11:30572, 11:30779, 11:30993, 11:31199, 11:31412) ──
const ERROR_CONFIG = {
  format: {
    // Light: node 11:29935 — bg #fef2f2, border #e7000b, text #e7000b
    // Dark:  node 11:30150 — bg rgba(130,24,26,0.2), border #9f0712, text #ff6467
    lightBg: '#fef2f2', lightBorder: '#e7000b', lightText: '#e7000b',
    darkBg: 'rgba(130,24,26,0.2)', darkBorder: '#9f0712', darkText: '#ff6467',
    title: 'Format File Tidak Didukung',
    message: 'Format file tidak didukung. Hanya JPG dan PNG yang diperbolehkan.',
  },
  size: {
    // Light: node 11:30357 — bg #fff7ed, border #ff6900, text #9f2d00
    // Dark:  node 11:30572 — bg rgba(126,42,12,0.2), border #9f2d00, text #ff8904
    lightBg: '#fff7ed', lightBorder: '#ff6900', lightText: '#9f2d00',
    darkBg: 'rgba(126,42,12,0.2)', darkBorder: '#9f2d00', darkText: '#ff8904',
    title: 'Ukuran File Terlalu Besar',
    message: null, // computed dynamically
  },
  network: {
    // Light: node 11:30779 — bg #faf5ff, border #ad46ff, text #6e11b0
    // Dark:  node 11:30993 — bg rgba(89,22,139,0.2), border #6e11b0, text #c27aff
    lightBg: '#faf5ff', lightBorder: '#ad46ff', lightText: '#6e11b0',
    darkBg: 'rgba(89,22,139,0.2)', darkBorder: '#6e11b0', darkText: '#c27aff',
    title: 'Koneksi Bermasalah',
    message: 'Koneksi internet bermasalah. Periksa koneksi Anda dan coba lagi.',
  },
  server: {
    // Light: node 11:31199 — bg #fefce8, border #f0b100, text #894b00
    // Dark:  node 11:31412 — bg rgba(115,62,10,0.2), border #894b00, text #fdc700
    lightBg: '#fefce8', lightBorder: '#f0b100', lightText: '#894b00',
    darkBg: 'rgba(115,62,10,0.2)', darkBorder: '#894b00', darkText: '#fdc700',
    title: 'Server Gagal Memproses',
    message: 'Server gagal memproses file. Silakan coba beberapa saat lagi.',
  },
}

// ── Validate file ────────────────────────────────────────────────────────────
function validateFile(file) {
  const name = file.name.toLowerCase()
  const ext = name.split('.').pop()
  const maxBytes = 10 * 1024 * 1024

  if (!['jpg', 'jpeg', 'png'].includes(ext)) return 'format'
  if (file.size > maxBytes) return 'size'
  return null
}



export default function Upload() {
  const { theme, isLoggedIn, authReady } = React.useContext(AppContext)
  const navigate = useNavigate()
  const isDark = theme === 'dark'

  const [mode, setMode] = React.useState('detect')
  const [file, setFile] = React.useState(null)
  const [errorType, setErrorType] = React.useState(null)
  const [isDragOver, setIsDragOver] = React.useState(false)
  const [practiceSentence, setPracticeSentence] = React.useState('')
  const [isLoadingSentence, setIsLoadingSentence] = React.useState(false)
  const fileInputRef = React.useRef(null)

  React.useEffect(() => {
    if (!authReady || !isLoggedIn) {
      return undefined
    }

    let cancelled = false

    const loadPracticeSentence = async () => {
      setIsLoadingSentence(true)

      try {
        const response = await generatePracticeText()

        if (!cancelled) {
          setPracticeSentence(response?.sentence || '')
        }
      } catch {
        if (!cancelled) {
          setPracticeSentence('')
        }
      } finally {
        if (!cancelled) {
          setIsLoadingSentence(false)
        }
      }
    }

    loadPracticeSentence()

    return () => {
      cancelled = true
    }
  }, [authReady, isLoggedIn])

  // ── File handling ──────────────────────────────────────────────────────────
  const handleFile = React.useCallback((f) => {
    if (!f) return
    const err = validateFile(f)
    if (err) {
      setFile(null)
      setErrorType(err)
    } else {
      setErrorType(null)
      setFile(f)
    }
  }, [])

  const handleFileInputChange = (e) => {
    if (e.target.files[0]) handleFile(e.target.files[0])
    e.target.value = ''
  }

  const handleDrop = (e) => {
    e.preventDefault(); setIsDragOver(false)
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
  }
  const handleDragOver = (e) => { e.preventDefault(); setIsDragOver(true) }
  const handleDragLeave = () => setIsDragOver(false)

  const handleChangeFile = () => {
    setFile(null); setErrorType(null)
    setTimeout(() => fileInputRef.current?.click(), 10)
  }



  const handleAnalyze = () => {
    if (!file) return

    const imageUrl = URL.createObjectURL(file)

    navigate('/analyzing', {
      state: {
        mode,
        file,
        imageUrl,
      },
    })
  }

  // ── Computed error values ──────────────────────────────────────────────────
  const errorCfg = errorType ? ERROR_CONFIG[errorType] : null
  const errorMsg = errorType === 'size'
    ? 'Ukuran file terlalu besar. Maksimal 10MB.'
    : errorType === 'scan'
      ? 'Kertas grid tidak terdeteksi. Ambil ulang foto dengan pencahayaan lebih baik, posisi lebih lurus, dan pastikan template resmi terlihat penuh.'
      : errorType === 'timeout'
        ? 'Server AI terlalu lama merespons. Coba unggah ulang dalam beberapa saat.'
        : errorType === 'base64'
          ? 'Data gambar gagal dikirim ke server AI. Coba unggah ulang file yang sama.'
          : errorCfg?.message

  // Per-type icon (light vs dark)
  const errorIconSrc = errorType === 'format' ? (isDark ? errorFormatDark : errorFormatLight)
    : errorType === 'size' ? (isDark ? fileSizeDark : fileSizeLight)
      : errorType === 'network' ? (isDark ? networkErrDark : networkErrLight)
        : errorType === 'server' ? (isDark ? serverErrDark : serverErrLight)
          : null

  // ── Theme-aware class helpers ──────────────────────────────────────────────
  const cardBg = isDark ? 'bg-[#1e2939]' : 'bg-white'
  const pageBgCls = isDark ? 'bg-[#0f172a]' : 'bg-[#E5E7EB]'
  const tipsCls = isDark
    ? 'bg-gradient-to-r from-[rgba(28,57,142,0.2)] to-[rgba(89,22,139,0.2)] border-[rgba(25,60,184,0.5)]'
    : 'bg-gradient-to-r from-[#eff6ff] to-[#faf5ff] border-[#bedbff]'

  const modeInactiveCls = isDark ? 'border-[#4a5565]' : 'border-[#d1d5dc]'
  const modeActiveCls = isDark ? 'bg-[rgba(28,57,142,0.2)] border-[#2b7fff]' : 'bg-[#eff6ff] border-[#2b7fff]'
  const modeInactiveIconD = isDark ? 'bg-[#364153]' : 'bg-[#e5e7eb]'

  const dropzoneBgCls = file
    ? (isDark ? 'bg-[rgba(5,223,114,0.08)]' : 'bg-[#f0fdf4]')
    : isDragOver
      ? (isDark ? 'bg-[rgba(43,127,255,0.1)]' : 'bg-[#eff6ff]')
      : (isDark ? 'bg-[rgba(54,65,83,0.5)]' : 'bg-[#f9fafb]')
  const dropzoneBorderCls = file
    ? 'border-[#05df72]'
    : isDragOver ? 'border-[#2b7fff]'
      : (isDark ? 'border-[#4a5565]' : 'border-[#d1d5dc]')

  const uploadCircleCls = isDark ? 'bg-[rgba(28,57,142,0.3)]' : 'bg-[#dbeafe]'
  const pickFileBtnCls = isDark
    ? 'bg-[rgba(38,38,38,0.3)] border-[#4a5565] text-[#d1d5dc]'
    : 'bg-white border-[#d1d5dc] text-[#364153]'
  return (
    <div className={`min-h-screen ${pageBgCls} px-4 py-10 transition-colors duration-300`}>
      <div className="mx-auto max-w-[540px]">

        {/* ── Back link ── */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-1.5 text-[var(--text-secondary)] text-[16px] hover:text-[var(--text-primary)] transition-colors"
        >
          <BackArrow isDark={isDark} />
          Kembali
        </Link>

        {/* ── Card ── */}
        <div className={`${cardBg} rounded-[16px] px-5 sm:px-10 pt-6 sm:pt-10 pb-6 sm:pb-10 shadow-[0px_20px_12.5px_rgba(0,0,0,0.1),0px_8px_5px_rgba(0,0,0,0.1)]`}>

          {/* Title */}
          <h1 className="text-[30px] font-semibold text-center text-[var(--text-primary)] leading-[36px] mb-2">
            Upload Foto Tulisan Tangan
          </h1>
          <p className="text-center text-[var(--text-secondary)] text-[16px] mb-6">
            Pilih mode analisis dan upload foto yang jelas
          </p>

          {/* ── Tips Banner ── */}
          <Link
            to="/photo-tips"
            className={`btn-lift rounded-[14px] border p-4 flex items-center gap-3 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-2 ${tipsCls}`}
          >
            <div
              className="w-10 h-10 rounded-[10px] flex-shrink-0 flex items-center justify-center shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)]"
              style={{ backgroundImage: 'linear-gradient(135deg, #2b7fff 0%, #9810fa 100%)' }}
            >
              <img src={tipsIcon} alt="" className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-[var(--text-primary)] text-[16px] leading-[24px]">Tips Foto yang Baik</p>
              <p className="text-[var(--text-secondary)] text-[14px] leading-[20px]">Lihat panduan untuk hasil analisis terbaik</p>
            </div>
            <ChevronRight isDark={isDark} />
          </Link>

          {/* ── Error Alert ── */}
          {errorCfg && (
            <div
              className="rounded-[10px] border flex items-start gap-3 mb-5 p-4 transition-all duration-200"
              style={{
                background: isDark ? errorCfg.darkBg : errorCfg.lightBg,
                borderColor: isDark ? errorCfg.darkBorder : errorCfg.lightBorder,
                borderWidth: '0.727px',
              }}
              role="alert"
            >
              <img
                src={errorIconSrc}
                alt=""
                className="w-5 h-5 flex-shrink-0 mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <p
                  className="font-semibold text-[14px] leading-[20px]"
                  style={{ color: isDark ? errorCfg.darkText : errorCfg.lightText }}
                >
                  {errorCfg.title}
                </p>
                <p
                  className="text-[14px] leading-[20px]"
                  style={{ color: isDark ? errorCfg.darkText : errorCfg.lightText }}
                >
                  {errorMsg}
                </p>
              </div>
              <button
                onClick={() => setErrorType(null)}
                className="flex-shrink-0 mt-0.5 hover:opacity-70 transition-opacity"
                aria-label="Tutup pesan error"
                style={{ color: isDark ? errorCfg.darkText : errorCfg.lightText }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          )}

          {/* ── Mode Selector ── */}
          <div className="mb-5">
            <p className="text-[14px] font-medium text-[var(--text-primary)] mb-3">Pilih Mode</p>
            <div className="grid grid-cols-2 gap-3">

              {/* Deteksi */}
              <button
                id="btn-mode-detect"
                onClick={() => setMode('detect')}
                className={`group rounded-[14px] border-[1.455px] py-[17px] px-[17px] flex flex-col items-center gap-2 text-center cursor-pointer transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-2 ${mode === 'detect' ? modeActiveCls : modeInactiveCls}`}
              >
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 ${mode === 'detect' ? 'bg-[#2b7fff]' : modeInactiveIconD}`}>
                  <img
                    src={mode === 'detect' ? detectOnIcon : detectOffIcon}
                    alt=""
                    className="w-6 h-6 transition-transform duration-200 group-active:scale-90"
                  />
                </div>
                <div>
                  <p
                    className="font-semibold text-[16px] leading-[24px]"
                    style={{ color: mode === 'detect' ? (isDark ? '#51a2ff' : '#155dfc') : (isDark ? '#d1d5dc' : '#364153') }}
                  >
                    Deteksi
                  </p>
                  <p
                    className="text-[12px] font-medium leading-[16px]"
                    style={{ color: mode === 'detect' ? (isDark ? 'rgba(81,162,255,0.7)' : 'rgba(21,93,252,0.7)') : '#6a7282' }}
                  >
                    Analisis disleksia
                  </p>
                </div>
              </button>

              {/* Translate */}
              <button
                id="btn-mode-translate"
                onClick={() => setMode('translate')}
                className={`group rounded-[14px] border-[1.455px] py-[17px] px-[17px] flex flex-col items-center gap-2 text-center cursor-pointer transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-2 ${mode === 'translate' ? modeActiveCls : modeInactiveCls}`}
              >
                <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 ${mode === 'translate' ? 'bg-[#2b7fff]' : modeInactiveIconD}`}>
                  <img
                    src={mode === 'translate' ? translateOnIcon : translateOffIcon}
                    alt=""
                    className="w-6 h-6 transition-transform duration-200 group-active:scale-90"
                  />
                </div>
                <div>
                  <p
                    className="font-semibold text-[16px] leading-[24px]"
                    style={{ color: mode === 'translate' ? (isDark ? '#51a2ff' : '#155dfc') : (isDark ? '#d1d5dc' : '#364153') }}
                  >
                    Translate
                  </p>
                  <p className="text-[12px] font-medium text-[#6a7282] leading-[16px]">
                    Terjemahkan tulisan
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* ── Dropzone ── */}
          <div
            className={`rounded-[14px] border-[1.455px] border-dashed py-8 sm:py-[49px] px-4 sm:px-[49px] flex flex-col items-center gap-4 mb-5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2b7fff] focus-visible:ring-offset-2 ${dropzoneBgCls} ${dropzoneBorderCls}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !file && fileInputRef.current?.click()}
            role="button"
            aria-label="Zona upload foto"
            tabIndex={0}
            onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && !file) fileInputRef.current?.click() }}
          >
            {file ? (
              /* File Selected */
              <>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0px_4px_3px_rgba(0,0,0,0.1),0px_2px_2px_rgba(0,0,0,0.1)] ${isDark ? 'bg-[rgba(5,223,114,0.15)]' : 'bg-[#dcfce7]'}`}>
                  <img
                    src={isDark ? checklistDarkIcon : checklistLightIcon}
                    alt="berhasil"
                    className="w-8 h-8"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[16px] leading-[24px]" style={{ color: isDark ? '#05df72' : '#00a63e' }}>
                    File berhasil!
                  </p>
                  <p className="text-[var(--text-secondary)] text-[14px] leading-[20px] mt-1 truncate max-w-[180px]">
                    {file.name}
                  </p>
                  <button
                    id="btn-change-file"
                    onClick={(e) => { e.stopPropagation(); handleChangeFile() }}
                    className="text-[#2b7fff] font-medium text-[14px] leading-[20px] mt-1 hover:underline"
                  >
                    Ganti file
                  </button>
                </div>
              </>
            ) : (
              /* Default Dropzone */
              <>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${uploadCircleCls}`}>
                  <img src={uploadIcon} alt="" className="w-8 h-8" />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-[18px] leading-[28px] text-[var(--text-primary)]">Upload Foto</p>
                  <p className="text-[var(--text-muted)] text-[14px] leading-[20px]">JPG, PNG • Max 10MB</p>
                </div>
                <button
                  id="btn-pick-file"
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click() }}
                  className={`px-5 py-2 rounded-[8px] border text-[16px] font-medium transition-opacity hover:opacity-80 ${pickFileBtnCls}`}
                >
                  Pilih File
                </button>
              </>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileInputChange}
              aria-label="Input upload file"
            />
          </div>

          {/* ── Action Buttons ── */}
          <div className="flex gap-3 mb-6">
            <Button
              variant="secondary"
              isDark={isDark}
              onClick={() => navigate('/')}
              className="flex-1 !rounded-[10px] h-[48px]"
            >
              Batal
            </Button>
            <Button
              variant="primary"
              isDark={isDark}
              loading={false}
              disabled={!file}
              onClick={handleAnalyze}
              className="flex-[1.2] !rounded-[10px] h-[48px]"
            >
              Analisis
            </Button>
          </div>

        </div>
      </div>
    </div>
  )
}
