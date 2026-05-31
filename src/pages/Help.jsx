import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Button from '../components/ui/Button'

import focusIcon from '../assets/Focus.svg'
import lightingIcon from '../assets/GoodLighting.svg'
import paperIcon from '../assets/Paper.svg'
import askBlueIcon from '../assets/AskBlue.svg'
import infoBlueIcon from '../assets/InfoBlue.svg'

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'Seberapa akurat deteksi AI?',
    answer:
      'DyslexiaLens digunakan untuk skrining awal, bukan diagnosis medis. Hasil yang ditampilkan bersifat indikatif dan sebaiknya dikonfirmasi oleh tenaga profesional.',
  },
  {
    id: 'faq-2',
    question: 'Untuk usia berapa tool ini cocok?',
    answer:
      'Alat ini cocok untuk membantu observasi awal pada anak usia sekolah yang sudah memiliki sampel tulisan tangan yang cukup jelas.',
  },
  {
    id: 'faq-3',
    question: 'Apakah data anak saya aman?',
    answer:
      'Ya. Data diproses secara aman dan digunakan hanya untuk kebutuhan analisis. Kami menjaga privasi pengguna sebagai prioritas.',
  },
  {
    id: 'faq-4',
    question: 'Apa yang harus dilakukan jika hasilnya menunjukkan probabilitas tinggi?',
    answer:
      'Gunakan hasil sebagai bahan pertimbangan awal dan konsultasikan dengan psikolog anak, terapis, atau dokter spesialis untuk evaluasi lanjutan.',
  },
]



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

function Chevron({ open, muted }) {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`transition-transform duration-200 ${open ? 'rotate-180' : ''} ${muted}`}
    >
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function TipCard({ icon, title, description, theme, iconBgLight, iconBgDark, titleColorLight, titleColorDark }) {
  const isDark = theme === 'dark'

  return (
    <div className="flex-1 rounded-[14px] p-3 text-center">
      <div className={`mx-auto mb-3 flex h-[40px] w-[40px] items-center justify-center rounded-[10px] ${isDark ? iconBgDark : iconBgLight}`}>
        <img src={icon} alt="" className="h-7 w-7" />
      </div>
      <h3 className={`text-[14px] font-semibold leading-[20px] ${isDark ? titleColorDark : titleColorLight}`}>
        {title}
      </h3>
      <p className={`mt-1 text-[12px] leading-[16px] ${isDark ? 'text-[#99a1af]' : 'text-[#4a5565]'}`}>
        {description}
      </p>
    </div>
  )
}

export default function Help() {
  const { theme } = useContext(AppContext)
  const navigate = useNavigate()
  const isDark = theme === 'dark'
  const [openFaq, setOpenFaq] = useState(null)

  const pageClass = isDark ? 'bg-[#101828] text-white' : 'bg-[#e5e7eb] text-[#101828]'
  const cardClass = isDark
    ? 'bg-[#1e2939] border-transparent shadow-[0px_12px_24px_rgba(0,0,0,0.18)]'
    : 'bg-white border-white shadow-[0px_16px_24px_rgba(0,0,0,0.18)]'
  const mutedText = isDark ? 'text-[#99a1af]' : 'text-[#4a5565]'
  const smallMutedText = isDark ? 'text-[#d1d5dc]' : 'text-[#364153]'
  const noticeClass = isDark
    ? 'bg-[#1f2e45] border-transparent'
    : 'bg-[#f8fbff] border-[#bedbff]'

  return (
    <div className={`${pageClass} min-h-[calc(100vh-64px)] px-4 py-8 sm:py-12 transition-colors duration-300`}>
      <div className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6">
        <Link to="/" className={`inline-flex items-center gap-2 text-[14px] font-medium transition-colors hover:text-blue-500 ${mutedText}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali
        </Link>

        <section className={`w-full rounded-[16px] border p-6 sm:p-8 ${cardClass}`}>
          <div className="flex flex-col items-center text-center">
            <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-full ${isDark ? 'bg-[#1f2e45]' : 'bg-[#e7f1ff]'}`}>
              <img src={infoBlueIcon} alt="Bantuan Info" className="h-6 w-6" />
            </div>
            <h1 className={`text-[24px] font-bold leading-[32px] ${isDark ? 'text-white' : 'text-[#101828]'}`}>
              Bantuan & Disclaimer Medis
            </h1>
            <p className={`mt-2 text-[14px] leading-[20px] ${mutedText}`}>Informasi penting tentang DyslexiaLens</p>
          </div>

          <div className={`mt-8 rounded-[12px] border p-4 ${noticeClass}`}>
            <div className="flex gap-2">
              <div className="mt-[2px] shrink-0">
                <IconWarning />
              </div>
              <div>
                <p className={`text-[14px] font-semibold leading-[20px] ${isDark ? 'text-[#dbeafe]' : 'text-[#2b7fff]'}`}>
                  Penting - Bukan Alat Diagnostik
                </p>
                <p className={`mt-1 text-[12px] leading-[16px] ${smallMutedText}`}>
                  DyslexiaLens adalah alat screening berbasis AI untuk mengidentifikasi pola visual yang terkait dengan disleksia dalam tulisan tangan. Ini tidak memberikan diagnosis medis. Hasil harus digunakan sebagai indikator awal dan diskusi dengan profesional pendidikan, dokter anak, atau spesialis.
                </p>
                <p className={`mt-3 text-[12px] leading-[16px] ${smallMutedText}`}>
                  Selalu konsultasikan dengan profesional untuk evaluasi klinis dan diagnosis.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className={`text-[18px] font-bold leading-[24px] ${isDark ? 'text-white' : 'text-[#101828]'}`}>Tips Hasil Terbaik</h2>
            <div className="mt-5 flex flex-col md:flex-row gap-4">
              <TipCard
                icon={lightingIcon}
                title="Pencahayaan Bagus"
                description="Pastikan ruangan terang. Cahaya alami terbaik. Hindari bayangan pada kertas"
                theme={theme}
                iconBgLight="bg-[#eaf2ff]"
                iconBgDark="bg-[#233b72]"
                titleColorLight="text-[#101828]"
                titleColorDark="text-white"
              />
              <TipCard
                icon={focusIcon}
                title="Fokus Jelas"
                description="Pegang kamera stabil di atas kertas. Pastikan teks tajam dan tidak blur"
                theme={theme}
                iconBgLight="bg-[#e8fff2]"
                iconBgDark="bg-[#214a3d]"
                titleColorLight="text-[#101828]"
                titleColorDark="text-white"
              />
              <TipCard
                icon={paperIcon}
                title="Kertas Polos"
                description="Gunakan kertas bergaris atau polos dengan kontras jelas. Hindari background gelap"
                theme={theme}
                iconBgLight="bg-[#f1ebff]"
                iconBgDark="bg-[#3f2a66]"
                titleColorLight="text-[#101828]"
                titleColorDark="text-white"
              />
            </div>
          </div>

          <div className="mt-10">
            <h2 className={`text-[18px] font-bold leading-[24px] ${isDark ? 'text-white' : 'text-[#101828]'}`}>Pertanyaan Umum</h2>

            <div className="mt-4 space-y-2">
              {FAQ_ITEMS.map((faq) => {
                const open = openFaq === faq.id
                return (
                  <div
                    key={faq.id}
                    className={`overflow-hidden rounded-[10px] border transition-colors duration-200 ${isDark ? 'border-transparent bg-[#1b2534]' : 'border-[#e5e7eb] bg-white'
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : faq.id)}
                      className={`flex w-full items-center justify-between px-3 py-3 text-left text-[12px] leading-[16px] ${isDark ? 'text-[#d1d5dc]' : 'text-[#364153]'}`}
                    >
                      <span>{faq.question}</span>
                      <Chevron open={open} muted={isDark ? 'text-[#99a1af]' : 'text-[#98a2b3]'} />
                    </button>
                    {open && (
                      <div className={`px-3 pb-3 text-[12px] leading-[16px] ${isDark ? 'text-[#d1d5dc]' : 'text-[#4a5565]'}`}>
                        {faq.answer}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                variant="primary"
                size="md"
                isDark={isDark}
                onClick={() => navigate('/upload')}
                className="!rounded-[8px]"
                rightIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                    <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                }
              >
                Mulai Analisis
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
