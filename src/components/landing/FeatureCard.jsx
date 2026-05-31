import React from 'react'
import { AppContext } from '../../context/AppContext'
import ChecklistGreen from '../../assets/checklistGreen.svg'

export default function FeatureCard({
  icon,
  iconTone = 'blue',
  title,
  description,
  bullets = [],
  bulletIconSrc = ChecklistGreen,
  iconWrapClass = 'h-14 w-14 px-0 pt-0',
  iconImgClass = 'h-7 w-7',
}) {
  const { theme } = React.useContext(AppContext)

  const toneClasses = {
    blue: 'from-[#2b7fff] to-[#155dfc] shadow-[0px_10px_7.5px_rgba(43,127,255,0.25),0px_4px_3px_rgba(43,127,255,0.2)]',
    green: 'from-[#00c950] to-[#00a63e] shadow-[0px_10px_7.5px_rgba(0,201,80,0.25),0px_4px_3px_rgba(0,201,80,0.2)]',
    purple: 'from-[#ad46ff] to-[#9810fa] shadow-[0px_10px_7.5px_rgba(173,70,255,0.25),0px_4px_3px_rgba(173,70,255,0.2)]',
    amber: 'from-[#f0b100] to-[#d08700] shadow-[0px_10px_7.5px_rgba(240,177,0,0.25),0px_4px_3px_rgba(240,177,0,0.2)]',
    red: 'from-[#fb2c36] to-[#e7000b] shadow-[0px_10px_7.5px_rgba(251,44,54,0.25),0px_4px_3px_rgba(251,44,54,0.2)]',
    orange: 'from-[#ff6900] to-[#f54900] shadow-[0px_10px_7.5px_rgba(255,105,0,0.25),0px_4px_3px_rgba(255,105,0,0.2)]',
  }

  const surfaceClass = theme === 'dark' ? 'theme-card' : 'border-white/50 bg-white/80'
  const titleClass = theme === 'dark' ? 'text-white' : 'text-[#101828]'
  const descriptionClass = theme === 'dark' ? 'text-[#cbd5e1]' : 'text-[#4a5565]'
  const bulletClass = theme === 'dark' ? 'text-[#e5e7eb]' : 'text-[#364153]'

  return (
    <article className={`interactive-card group rounded-[16px] border p-6 shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] backdrop-blur-sm hover:shadow-[0px_28px_36px_rgba(0,0,0,0.16)] focus-within:-translate-y-1 sm:p-8 ${surfaceClass}`}>
      <div
        className={`mx-auto flex items-center justify-center rounded-[14px] bg-gradient-to-br transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-[1.08] group-hover:shadow-[0px_16px_24px_rgba(0,0,0,0.18)] ${toneClasses[iconTone] ?? toneClasses.blue} ${iconWrapClass}`}
      >
        {typeof icon === 'string' ? <img alt="" src={icon} className={iconImgClass} /> : icon}
      </div>
      <h3 className={`mt-6 text-center text-lg font-bold sm:text-xl ${titleClass}`}>{title}</h3>
      <p className={`mt-4 text-center text-sm leading-6 sm:text-base ${descriptionClass}`}>{description}</p>
      {bullets.length ? (
        <ul className={`mt-6 space-y-3 text-sm ${bulletClass}`}>
          {bullets.map((bullet) => (
            <li key={bullet} className="flex items-center gap-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#dcfce700]">
                <img alt="" src={bulletIconSrc} className="h-4 w-4" aria-hidden />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}