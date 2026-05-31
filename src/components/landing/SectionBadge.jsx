import React from 'react'
import { AppContext } from '../../context/AppContext'

export default function SectionBadge({ tone = 'blue', children }) {
  const { theme } = React.useContext(AppContext)

  const styles = {
    light: {
      blue: 'border-[#bedbff] bg-[#edf4ff] text-[#155dfc]',
      red: 'border-[#ffc9c9] bg-[#ffe2e2] text-[#e7000b]',
      purple: 'border-[#d8c2ff] bg-[#f4ebff] text-[#9810fa]',
      green: 'border-[#b9f8cf] bg-[#dcfce7] text-[#00a63e]',
      amber: 'border-[#fde68a] bg-[#fef3c7] text-[#b45309]',
    },
    dark: {
      // Keep blue badge identical to light mode (no border change in dark)
      blue: 'border-[#bedbff] bg-[#edf4ff] text-[#155dfc]',
      red: 'border-[rgba(251,44,54,0.25)] bg-[rgba(251,44,54,0.12)] text-[#ff9da4]',
      purple: 'border-[rgba(173,70,255,0.25)] bg-[rgba(173,70,255,0.14)] text-[#d8b4fe]',
      green: 'border-[rgba(0,201,80,0.25)] bg-[rgba(13,84,43,0.2)] text-[#05df72]',
      amber: 'border-[rgba(240,177,0,0.25)] bg-[rgba(240,177,0,0.15)] text-[#fbbf24]',
    },
  }

  return (
    <div className={`inline-flex items-center rounded-full border px-4 py-1 text-sm font-semibold uppercase tracking-[0.35px] ${styles[theme][tone] ?? styles[theme].blue}`}>
      {children}
    </div>
  )
}