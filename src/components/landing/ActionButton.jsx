import React from 'react'
import { AppContext } from '../../context/AppContext'

export default function ActionButton({
  variant = 'primary',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  children,
  type = 'button',
  iconSrc,
  iconPosition = 'left',
}) {
  const { theme } = React.useContext(AppContext)
  const isDisabled = disabled || loading

  const styles = {
    primary:
      theme === 'dark'
        ? 'bg-gradient-to-r from-[#155dfc] to-[#ad46ff] text-white shadow-[0px_10px_7.5px_rgba(43,127,255,0.25),0px_4px_3px_rgba(43,127,255,0.2)] hover:brightness-110 active:translate-y-px'
        : 'bg-gradient-to-r from-[#155dfc] to-[#9810fa] text-white shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)] hover:brightness-105 active:translate-y-px',
    secondary:
      theme === 'dark'
        ? 'border border-[rgba(255,255,255,0.18)] bg-[rgba(54,65,83,0.8)] text-white hover:bg-[rgba(74,85,101,0.8)] active:translate-y-px'
        : 'border border-[rgba(0,0,0,0.1)] bg-white text-[#0a0a0a] hover:bg-[#f9fafb] active:translate-y-px',
    cta:
      'bg-white text-[#155dfc] shadow-[0px_25px_25px_rgba(0,0,0,0.25)] hover:bg-white/95 active:translate-y-px',
    heroSecondary:
      'border-[1.455px] border-[rgba(0,0,0,0.1)] bg-white text-[#0a0a0a] shadow-none hover:bg-[#fafafa] active:translate-y-px min-w-[266px]',
    inverse:
      'border border-white/40 bg-white/20 text-white shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)] hover:bg-white/25 active:translate-y-px',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={`inline-flex items-center justify-center rounded-[14px] transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#155dfc] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-60 ${variant === 'cta' ? 'min-w-[266px] px-[24px] py-[25px] text-[18px] font-bold' : ''} ${variant === 'heroSecondary' ? 'min-w-[266px] px-[24px] py-[25px] text-[18px] font-medium leading-[28px] whitespace-nowrap' : 'h-12 px-5 text-base font-semibold'} ${styles[variant]} ${className}`}
    >
      {loading ? (
        <span className="mr-3 inline-flex h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />
      ) : iconSrc && iconPosition === 'left' ? (
        <img alt="" src={iconSrc} className="mr-3 h-4 w-4 flex-none" aria-hidden />
      ) : null}
      <span>{children}</span>
      {!loading && iconSrc && iconPosition === 'right' ? (
        <img alt="" src={iconSrc} className={`ml-3 flex-none ${variant === 'cta' ? 'h-4 w-4' : 'h-4 w-4'}`} aria-hidden />
      ) : null}
    </button>
  )
}