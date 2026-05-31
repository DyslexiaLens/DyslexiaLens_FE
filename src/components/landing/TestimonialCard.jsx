import React from 'react'
import { AppContext } from '../../context/AppContext'

export default function TestimonialCard({ quote, name, title, avatarTone, avatarLetter }) {
  const { theme } = React.useContext(AppContext)

  return (
    <article className={`interactive-card group rounded-[16px] border p-6 shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] hover:shadow-[0px_20px_28px_rgba(0,0,0,0.13)] sm:p-8 ${theme === 'dark' ? 'theme-card' : 'border-[#e5e7eb] bg-white'}`}>
      <div className="flex gap-1.5 text-[#f59e0b]">
        {Array.from({ length: 5 }).map((_, index) => (
          <svg
            key={index}
            viewBox="0 0 20 20"
            aria-hidden
            className="h-4 w-4 fill-current transition-transform duration-150 hover:scale-125 hover:-translate-y-0.5"
          >
            <path d="M10 1.5l2.57 5.21 5.76.84-4.17 4.06.98 5.73L10 14.67 4.86 17.34l.98-5.73L1.67 7.55l5.76-.84L10 1.5z" />
          </svg>
        ))}
      </div>
      <p className={`mt-8 text-sm leading-7 sm:text-base ${theme === 'dark' ? 'text-[#e5e7eb]' : 'text-[#364153]'}`}>{quote}</p>
      <div className="mt-8 flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:shadow-xl ${avatarTone}`}>
          {avatarLetter}
        </div>
        <div>
          <div className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-[#101828]'}`}>{name}</div>
          <div className={`text-sm ${theme === 'dark' ? 'text-[#99a1af]' : 'text-[#6a7282]'}`}>{title}</div>
        </div>
      </div>
    </article>
  )
}