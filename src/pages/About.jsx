import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

import faqihImg from '../assets/profile/faqih.png'
import fattanImg from '../assets/profile/fattan.png'
import ichwanImg from '../assets/profile/ichwan.png'
import nopalImg from '../assets/profile/nopal.png'
import rasyidImg from '../assets/profile/rasyid.jpeg'
import mayakaImg from '../assets/profile/mayaka.png'

const TEAM_MEMBERS = [
  {
    name: 'Esvananda Mayaka Rizma Pohan',
    role: 'Frontend Developer',
    image: mayakaImg, // Menggunakan placeholder avatar inisial
    initials: 'EP',
    gradient: 'from-[#4f46e5] to-[#06b6d4]',
    github: 'https://github.com/Reinevielle',
    linkedin: '#',
  },
  {
    name: 'Muhamad Ar Rasyid Rizki Oktavian',
    role: 'Backend Developer',
    image: rasyidImg,
    initials: 'MO',
    gradient: 'from-[#3b82f6] to-[#8b5cf6]',
    github: 'https://github.com/rhizu05',
    linkedin: '#',
  },
  {
    name: 'Fattan Naufan Islami',
    role: 'Data Scientist',
    image: fattanImg,
    initials: 'FI',
    gradient: 'from-[#10b981] to-[#3b82f6]',
    github: 'https://github.com/Rainy1502',
    linkedin: '#',
  },
  {
    name: 'Mohammad Naufal Maulana',
    role: 'Data Scientist',
    image: nopalImg,
    initials: 'MN',
    gradient: 'from-[#f59e0b] to-[#ef4444]',
    github: 'https://github.com/w0pal',
    linkedin: '#',
  },
  {
    name: 'M. Ichwan Akbar',
    role: 'AI Engineer',
    image: ichwanImg,
    initials: 'IA',
    gradient: 'from-[#ec4899] to-[#8b5cf6]',
    github: 'https://github.com/ReikoAyano',
    linkedin: '#',
  },
  {
    name: 'Muhammad Faqih Adhyatma',
    role: 'AI Engineer',
    image: faqihImg,
    initials: 'FA',
    gradient: 'from-[#6366f1] to-[#a855f7]',
    github: 'https://github.com/adhyhh',
    linkedin: '#',
  },
]

export default function About() {
  const { theme } = useContext(AppContext)
  const isDark = theme === 'dark'

  const pageClass = isDark ? 'bg-[#101828] text-white' : 'bg-[#e5e7eb] text-[#101828]'
  const cardClass = isDark
    ? 'bg-[#1e2939] border-transparent shadow-[0px_12px_24px_rgba(0,0,0,0.18)]'
    : 'bg-white border-white shadow-[0px_16px_24px_rgba(0,0,0,0.18)]'
  const mutedText = isDark ? 'text-[#99a1af]' : 'text-[#4a5565]'
  const headingText = isDark ? 'text-white' : 'text-[#101828]'

  return (
    <div className={`${pageClass} min-h-[calc(100vh-64px)] px-4 py-8 sm:py-12 transition-colors duration-300`}>
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start gap-6">
        {/* Back Button */}
        <Link
          to="/"
          className={`inline-flex items-center gap-2 text-[14px] font-medium transition-colors hover:text-blue-500 ${mutedText}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Kembali ke Beranda
        </Link>

        {/* Heading Section */}
        <div className="w-full text-center py-6">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#2b7fff] mb-2 block">
            Kreator & Pengembang
          </span>
          <h1 className={`text-[28px] sm:text-[36px] font-extrabold leading-tight ${headingText}`}>
            Tentang Kami
          </h1>
          <p className={`mx-auto mt-3 max-w-2xl text-[14px] sm:text-[16px] leading-[24px] ${mutedText}`}>
            Kami adalah tim mahasiswa DBS Coding Camp Capstone Project yang berdedikasi untuk memberikan solusi skrining awal disleksia menggunakan teknologi Kecerdasan Buatan (AI).
          </p>
        </div>

        {/* Vision & Mission Card */}
        <section className={`w-full rounded-[16px] border p-6 sm:p-8 ${cardClass} mb-6`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-[18px] font-bold mb-3 text-[#2b7fff]">Visi Kami</h2>
              <p className={`text-[14px] leading-[22px] ${mutedText}`}>
                Menjadi platform skrining dini disleksia berbasis AI terdepan di Indonesia yang inklusif, mudah diakses, serta membantu orang tua dan pendidik memberikan penanganan yang tepat dan lebih cepat bagi anak-anak.
              </p>
            </div>
            <div>
              <h2 className="text-[18px] font-bold mb-3 text-[#2b7fff]">Misi Kami</h2>
              <ul className={`list-disc pl-5 space-y-2 text-[14px] leading-[22px] ${mutedText}`}>
                <li>Menyediakan teknologi deteksi tulisan tangan yang akurat dan mudah digunakan.</li>
                <li>Meningkatkan kesadaran masyarakat mengenai tanda-tanda awal disleksia pada anak.</li>
                <li>Menyediakan platform yang aman, privat, dan menjaga kerahasiaan data pengguna.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <div className="w-full">
          <h2 className={`text-[20px] font-bold mb-6 text-center ${headingText}`}>Anggota Tim</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className={`flex flex-col items-center text-center p-6 rounded-[16px] border transition-all duration-300 hover:translate-y-[-4px] ${cardClass}`}
              >
                {/* Photo/Avatar */}
                <div className="relative mb-4">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover border-2 border-blue-500/20 shadow-md"
                    />
                  ) : (
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-md`}
                    >
                      {member.initials}
                    </div>
                  )}
                </div>

                {/* Name & Role */}
                <h3 className={`text-[16px] font-bold leading-[22px] ${headingText}`}>
                  {member.name}
                </h3>
                <p className="text-[13px] font-medium text-[#2b7fff] mt-1 mb-4">
                  {member.role}
                </p>

                {/* Social Links */}
                <div className="mt-auto flex gap-3">
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-[8px] transition-colors ${isDark ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                    aria-label={`${member.name} GitHub`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
