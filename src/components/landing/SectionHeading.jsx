import React from 'react'
import { AppContext } from '../../context/AppContext'

export default function SectionHeading({ badge, title, subtitle, tone = 'blue' }) {
  const { theme } = React.useContext(AppContext)

  const badgeStyles = {
    light: {
      red: 'border-[#ffc9c9] bg-[#ffe2e2] text-[#e7000b]',
      purple: 'border-[#d8c2ff] bg-[#f4ebff] text-[#9810fa]',
      green: 'border-[#b9f8cf] bg-[#dcfce7] text-[#00a63e]',
      blue: 'border-[#bedbff] bg-[#edf4ff] text-[#155dfc]',
    },
    dark: {
      red: 'border-[rgba(251,44,54,0.25)] bg-[rgba(251,44,54,0.12)] text-[#ff9da4]',
      purple: 'border-[rgba(173,70,255,0.25)] bg-[rgba(173,70,255,0.14)] text-[#d8b4fe]',
      green: 'border-[rgba(0,201,80,0.25)] bg-[rgba(13,84,43,0.2)] text-[#05df72]',
      blue: 'border-[rgba(43,127,255,0.25)] bg-[rgba(43,127,255,0.12)] text-[#8cb4ff]',
    },
  }

  return (
    <div className="mx-auto max-w-4xl text-center">
      <div className="mb-6 flex justify-center">
        <span
          className={`inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold uppercase tracking-[0.35px] ${badgeStyles[theme][tone] ?? badgeStyles[theme].blue}`}
        >
          {badge}
        </span>
      </div>
      <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-[var(--text-secondary)] sm:text-xl">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}