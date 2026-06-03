import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

import paperIcon from '../assets/Paper.svg'

function IconWarning() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 2.75L18.2 16.5H1.8L10 2.75Z"
        stroke="#2b7fff"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M10 7.2V11.1" stroke="#2b7fff" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="14.25" r="0.9" fill="#2b7fff" />
    </svg>
  )
}

export default function Terms() {
  const { theme } = useContext(AppContext)
  const isDark = theme === 'dark'

  const pageClass = isDark ? 'bg-[#101828] text-white' : 'bg-[#e5e7eb] text-[#101828]'
  const cardClass = isDark
    ? 'bg-[#1e2939] border-transparent shadow-[0px_12px_24px_rgba(0,0,0,0.18)]'
    : 'bg-white border-white shadow-[0px_16px_24px_rgba(0,0,0,0.18)]'
  const mutedText = isDark ? 'text-[#99a1af]' : 'text-[#4a5565]'
  const headingText = isDark ? 'text-white' : 'text-[#101828]'
  const sectionBorder = isDark ? 'border-slate-800' : 'border-slate-200'
  const noticeClass = isDark ? 'bg-[#1f2e45] border-transparent text-[#dbeafe]' : 'bg-[#f8fbff] border-[#bedbff] text-[#2b7fff]'
  const smallMutedText = isDark ? 'text-[#d1d5dc]' : 'text-[#364153]'

  return (
    <div className={`${pageClass} min-h-[calc(100vh-64px)] px-4 py-8 sm:py-12 transition-colors duration-300`}>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6">
        {/* Back Button */}
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-[14px] font-medium transition-colors hover:text-blue-500 ${mutedText}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali
        </Link>

        {/* Content Card */}
        <section className={`w-full rounded-[16px] border p-6 sm:p-8 ${cardClass}`}>
          <div className="flex flex-col items-center text-center mb-8">
            <div
              className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${isDark
                  ? 'bg-[#2b2145]'
                  : 'bg-purple-100'
                }`}
            >
              <img src={paperIcon} alt="Syarat & Ketentuan" className="h-6 w-6" />
            </div>
            <h1 className={`text-[24px] sm:text-[28px] font-bold leading-tight ${headingText}`}>
              Syarat & Ketentuan
            </h1>
            <p className={`mt-2 text-[13px] sm:text-[14px] leading-[20px] ${mutedText}`}>
              Terakhir diperbarui: Juni 2026
            </p>
          </div>

          {/* Medical Disclaimer Box */}
          <div className={`rounded-[12px] border p-4 mb-8 ${noticeClass}`}>
            <div className="flex gap-3">
              <div className="mt-[2px] shrink-0">
                <IconWarning />
              </div>
              <div>
                <p className="text-[14px] font-bold leading-[20px]">
                  PENTING: DISCLAIMER MEDIS & DIAGNOSIS
                </p>
                <p className={`mt-1 text-[12px] leading-[18px] ${smallMutedText}`}>
                  DyslexiaLens adalah alat penapisan (*screening*) berbasis Kecerdasan Buatan (AI) untuk mendeteksi pola tulisan tangan yang berpotensi memiliki indikasi disleksia. <strong>Aplikasi ini bukan alat diagnosis medis resmi, klinis, atau psikologis.</strong> Hasil analisis bersifat indikatif untuk membantu konsultasi awal dan tidak boleh menggantikan evaluasi profesional oleh psikolog anak, dokter spesialis, atau tenaga medis ahli.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 text-[14px] leading-[22px] text-[var(--text-secondary)]">
            <p className={mutedText}>
              Dengan mengakses dan menggunakan platform **DyslexiaLens**, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan Penggunaan ini. Jika Anda tidak menyetujui bagian mana pun dari ketentuan ini, Anda tidak diperkenankan untuk menggunakan layanan kami.
            </p>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>1. Syarat Penggunaan Layanan</h2>
              <p className={mutedText}>
                Anda setuju untuk menggunakan platform ini hanya untuk tujuan yang sah, edukatif, dan tidak melanggar hukum. Penggunaan berikut ini dilarang keras:
              </p>
              <ul className={`list-disc pl-5 mt-2 space-y-1 ${mutedText}`}>
                <li>Mengunggah gambar yang mengandung konten berbahaya, pornografi, sara, atau melanggar hak cipta pihak lain.</li>
                <li>Mencoba merusak, memodifikasi, atau meretas infrastruktur keamanan platform.</li>
                <li>Menggunakan sistem otomatis (robot, bot) untuk mengirimkan permintaan ke server kami secara berlebihan.</li>
              </ul>
            </div>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>2. Hak Kekayaan Intelektual</h2>
              <p className={mutedText}>
                Seluruh konten di dalam DyslexiaLens, termasuk namun tidak terbatas pada logo, desain visual, teks, grafik, kode sumber, model AI, dan perangkat lunak, adalah properti intelektual milik tim pengembang dan dilindungi oleh undang-undang hak cipta yang berlaku.
              </p>
            </div>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>3. Batasan Tanggung Jawab</h2>
              <p className={mutedText}>
                Layanan ini disediakan &quot;sebagaimana adanya&quot; (*as is*) tanpa jaminan dalam bentuk apa pun. Kami tidak bertanggung jawab atas:
              </p>
              <ul className={`list-disc pl-5 mt-2 space-y-1 ${mutedText}`}>
                <li>Keputusan klinis, medis, akademis, atau keputusan pribadi apa pun yang diambil berdasarkan hasil skrining dari aplikasi ini.</li>
                <li>Keterlambatan atau gangguan layanan yang disebabkan oleh gangguan jaringan internet atau kendala teknis lainnya di luar kendali kami.</li>
              </ul>
            </div>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>4. Perubahan Ketentuan</h2>
              <p className={mutedText}>
                Kami berhak untuk mengubah atau memperbarui Syarat & Ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini. Dengan tetap menggunakan platform setelah perubahan dipublikasikan, Anda dianggap menyetujui ketentuan yang baru.
              </p>
            </div>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>5. Penyelesaian Sengketa</h2>
              <p className={mutedText}>
                Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap perselisihan yang timbul dari atau terkait dengan penggunaan platform ini akan diselesaikan secara musyawarah untuk mencapai mufakat.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
