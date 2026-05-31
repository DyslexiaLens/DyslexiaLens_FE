import React from 'react'

/**
 * Inline loading spinner — use inside buttons or anywhere you need
 * a lightweight spinner that inherits the surrounding text color.
 *
 * Sizes: 'sm' (14px), 'md' (16px, default), 'lg' (20px)
 */
const sizes = { sm: 'h-3.5 w-3.5', md: 'h-4 w-4', lg: 'h-5 w-5' }

export function LoadingSpinner({ size = 'md', className = '' }) {
  return (
    <svg
      className={`animate-spin ${sizes[size] ?? sizes.md} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="3"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  )
}

/**
 * Full-page centered loading screen — shown when a page is still
 * bootstrapping data (e.g. auth check, lazy imports).
 *
 * Props:
 *   message (string) — optional subtitle
 *   isDark  (bool)
 */
export function PageLoader({ message = 'Memuat...', isDark = false }) {
  return (
    <div
      className={`flex min-h-[60vh] flex-col items-center justify-center gap-4 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}
      role="status"
      aria-live="polite"
    >
      <svg
        className="animate-spin h-10 w-10 text-[#2b7fff]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      {message && (
        <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {message}
        </p>
      )}
    </div>
  )
}

export default LoadingSpinner
