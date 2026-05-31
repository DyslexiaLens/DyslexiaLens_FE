import React from 'react'

/**
 * Base Skeleton block — an animated shimmer placeholder.
 *
 * Props:
 *   - className (string) – pass width / height / rounded etc.
 *   - isDark    (bool)
 */
export function Skeleton({ className = '', isDark = false }) {
  return (
    <div
      className={[
        'skeleton-shimmer rounded-md',
        isDark ? 'bg-gray-700/40' : 'bg-gray-200/80',
        className,
      ].join(' ')}
      aria-hidden="true"
    />
  )
}

/**
 * A full skeleton card matching the History list item layout.
 */
export function HistoryCardSkeleton({ isDark = false }) {
  const cardCls = `w-full p-6 rounded-2xl border shadow-sm ${
    isDark ? 'bg-[#1e2939] border-gray-700' : 'bg-white border-gray-100'
  }`

  return (
    <div className={cardCls} aria-hidden="true">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        {/* Left: thumbnail + meta */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <Skeleton isDark={isDark} className="w-16 h-16 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-2">
            <Skeleton isDark={isDark} className="h-4 w-24 rounded" />
            <Skeleton isDark={isDark} className="h-5 w-48 rounded" />
          </div>
        </div>

        {/* Middle: badge */}
        <Skeleton isDark={isDark} className="h-6 w-16 rounded-full" />

        {/* Right: actions */}
        <div className="flex items-center gap-2">
          <Skeleton isDark={isDark} className="h-10 w-24 rounded-lg" />
          <Skeleton isDark={isDark} className="h-10 w-10 rounded-lg" />
        </div>
      </div>
    </div>
  )
}

export default Skeleton
