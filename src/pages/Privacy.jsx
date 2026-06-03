import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

import shieldIcon from '../assets/Shield.svg'

export default function Privacy() {
  const { theme } = useContext(AppContext)
  const isDark = theme === 'dark'

  const pageClass = isDark ? 'bg-[#101828] text-white' : 'bg-[#e5e7eb] text-[#101828]'
  const cardClass = isDark
    ? 'bg-[#1e2939] border-transparent shadow-[0px_12px_24px_rgba(0,0,0,0.18)]'
    : 'bg-white border-white shadow-[0px_16px_24px_rgba(0,0,0,0.18)]'
  const mutedText = isDark ? 'text-[#99a1af]' : 'text-[#4a5565]'
  const headingText = isDark ? 'text-white' : 'text-[#101828]'
  const sectionBorder = isDark ? 'border-slate-800' : 'border-slate-200'

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
                ? 'bg-[#1f2e45]'
                : 'bg-blue-200'
                }`}
            >
              <img
                src={shieldIcon}
                alt="Keamanan & Privasi"
                className={`h-6 w-6 ${!isDark ? 'brightness-0 opacity-80' : ''
                  }`}
              />
            </div>
            <h1 className={`text-[24px] sm:text-[28px] font-bold leading-tight ${headingText}`}>
              Kebijakan Privasi
            </h1>
            <p className={`mt-2 text-[13px] sm:text-[14px] leading-[20px] ${mutedText}`}>
              Terakhir diperbarui: Juni 2026
            </p>
          </div>

          <div className="space-y-6 text-[14px] leading-[22px] text-[var(--text-secondary)]">
            <p className={mutedText}>
              Selamat datang di **DyslexiaLens**. Kami berkomitmen penuh untuk melindungi privasi dan keamanan data pribadi Anda. Kebijakan Privasi ini menjelaskan jenis informasi yang kami kumpulkan, cara kami memprosesnya, serta langkah-langkah keamanan yang kami terapkan untuk melindungi hak Anda.
            </p>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>1. Informasi yang Kami Kumpulkan</h2>
              <p className={mutedText}>
                Kami hanya mengumpulkan informasi yang sangat diperlukan untuk mengoperasikan layanan kami:
              </p>
              <ul className={`list-disc pl-5 mt-2 space-y-1 ${mutedText}`}>
                <li><strong>Informasi Akun:</strong> Alamat email dan kata sandi yang Anda berikan saat melakukan registrasi guna mengelola profil dan riwayat analisis Anda.</li>
                <li><strong>Foto Tulisan Tangan:</strong> File gambar tulisan tangan yang Anda unggah secara sadar ke sistem kami untuk dianalisis oleh Kecerdasan Buatan (AI).</li>
              </ul>
            </div>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>2. Cara Kami Menggunakan Data Anda</h2>
              <p className={mutedText}>
                Data Anda digunakan secara terbatas hanya untuk:
              </p>
              <ul className={`list-disc pl-5 mt-2 space-y-1 ${mutedText}`}>
                <li>Melakukan klasifikasi visual melalui model AI untuk mendeteksi potensi disleksia.</li>
                <li>Menampilkan riwayat hasil deteksi pada akun Anda agar dapat dipantau kembali oleh Anda di kemudian hari.</li>
                <li>Meningkatkan kinerja sistem dan keamanan aplikasi.</li>
              </ul>
            </div>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>3. Penyimpanan dan Perlindungan Gambar</h2>
              <p className={mutedText}>
                Keamanan data Anda adalah prioritas kami. Untuk foto tulisan tangan yang Anda unggah:
              </p>
              <ul className={`list-disc pl-5 mt-2 space-y-1 ${mutedText}`}>
                <li>Gambar yang diunggah hanya diproses secara langsung oleh model AI untuk keperluan ekstraksi fitur dan klasifikasi.</li>
                <li>Kami <strong>tidak menyimpan file gambar Anda secara permanen</strong> di server publik. Gambar akan segera dihapus setelah pemrosesan selesai, dan hanya menyimpan riwayat hasil deteksi berupa data teks dan persentase probabilitas.</li>
              </ul>
            </div>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>4. Pembagian Informasi dengan Pihak Ketiga</h2>
              <p className={mutedText}>
                Kami <strong>tidak akan pernah menjual, menyewakan, membagikan, atau memperdagangkan</strong> data pribadi maupun hasil analisis Anda kepada pihak ketiga mana pun tanpa persetujuan eksplisit dari Anda, kecuali jika diwajibkan oleh undang-undang yang berlaku.
              </p>
            </div>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>5. Hak Anda atas Data Pribadi</h2>
              <p className={mutedText}>
                Sebagai pengguna, Anda memiliki kontrol penuh atas akun Anda. Anda berhak untuk:
              </p>
              <ul className={`list-disc pl-5 mt-2 space-y-1 ${mutedText}`}>
                <li>Mengakses riwayat analisis Anda kapan saja melalui dashboard riwayat.</li>
                <li>Memperbarui data profil Anda secara mandiri di halaman pengaturan profil.</li>
                <li>Meminta penghapusan permanen data akun Anda dari sistem kami dengan menghubungi tim dukungan kami.</li>
              </ul>
            </div>

            <div className={`border-t pt-5 ${sectionBorder}`}>
              <h2 className={`text-[16px] font-bold mb-2 ${headingText}`}>6. Hubungi Kami</h2>
              <p className={mutedText}>
                Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini atau cara kami menangani data Anda, silakan hubungi tim pengembang kami melalui email di: <a href="mailto:dyslexialens79@gmail.com" className="text-[#2b7fff] hover:underline font-semibold">dyslexialens79@gmail.com</a>.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
