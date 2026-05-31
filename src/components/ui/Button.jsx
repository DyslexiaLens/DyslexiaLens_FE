import React from 'react'

/**
 * Reusable Button component.
 *
 * Variants:
 *   - "primary"   → blue gradient CTA
 *   - "secondary" → ghost/border style, theme-aware
 *   - "danger"    → red destructive action
 *   - "ghost"     → transparent, subtle hover
 *
 * Sizes:
 *   - "sm"  → h-9  px-3 text-sm
 *   - "md"  → h-11 px-4 text-sm  (default)
 *   - "lg"  → h-14 px-8 text-lg
 *
 * Additional props:
 *   - loading  → shows spinner and disables button
 *   - leftIcon / rightIcon → React nodes rendered beside the label
 *   - isDark   → override dark mode (defaults to false; pass from context if needed)
 */
const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl ' +
  'transition-all duration-200 ease-out ' +
  'active:scale-[0.97] active:duration-[80ms] ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

const SIZES = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-14 px-8 text-[18px]',
}

const VARIANTS = {
  primary: (isDark) =>
    isDark
      ? 'bg-gradient-to-r from-[#155dfc] to-[#9810fa] text-white hover:brightness-110 shadow-md focus-visible:ring-[#155dfc] focus-visible:ring-offset-[#0f172a]'
      : 'bg-gradient-to-r from-[#155dfc] to-[#9810fa] text-white hover:brightness-110 shadow-md focus-visible:ring-[#155dfc] focus-visible:ring-offset-white',

  secondary: (isDark) =>
    isDark
      ? 'border border-[#4a5565] bg-[rgba(38,38,38,0.3)] text-[#d1d5dc] hover:bg-[rgba(54,65,83,0.5)] focus-visible:ring-[#4a5565] focus-visible:ring-offset-[#0f172a]'
      : 'border border-[rgba(0,0,0,0.1)] bg-white text-[var(--text-primary)] hover:bg-[#fafafa] focus-visible:ring-gray-400 focus-visible:ring-offset-white',

  danger: (isDark) =>
    isDark
      ? 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-900/30 focus-visible:ring-red-600 focus-visible:ring-offset-[#0f172a]'
      : 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-500/20 focus-visible:ring-red-600 focus-visible:ring-offset-white',

  'danger-outline': (isDark) =>
    isDark
      ? 'border border-red-900/50 bg-red-950/20 text-red-400 hover:bg-red-900/30 focus-visible:ring-red-600 focus-visible:ring-offset-[#0f172a]'
      : 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 focus-visible:ring-red-500 focus-visible:ring-offset-white',

  ghost: (isDark) =>
    isDark
      ? 'text-[var(--text-primary)] hover:bg-white/5 focus-visible:ring-gray-500 focus-visible:ring-offset-[#0f172a]'
      : 'text-[var(--text-primary)] hover:bg-black/5 focus-visible:ring-gray-400 focus-visible:ring-offset-white',
}

const Spinner = () => (
  <span
    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
    aria-hidden="true"
  />
)

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  isDark = false,
  loading = false,
  leftIcon,
  rightIcon,
  className = '',
  type = 'button',
  ...props
}) {
  const variantFn = VARIANTS[variant] ?? VARIANTS.primary
  const variantCls = typeof variantFn === 'function' ? variantFn(isDark) : variantFn

  return (
    <button
      type={type}
      disabled={loading || props.disabled}
      className={`${BASE} ${SIZES[size] ?? SIZES.md} ${variantCls} ${className}`}
      {...props}
    >
      {loading ? (
        <Spinner />
      ) : (
        <>
          {leftIcon && <span aria-hidden="true">{leftIcon}</span>}
          {children}
          {rightIcon && <span aria-hidden="true">{rightIcon}</span>}
        </>
      )}
    </button>
  )
}
