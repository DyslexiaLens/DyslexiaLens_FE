import React from 'react'

/**
 * Reusable EmptyState component.
 *
 * Props:
 *   - icon       (string | React node)  – image src OR a React element (e.g. an SVG component)
 *   - iconAlt    (string)               – alt text for img (if icon is a string src)
 *   - title      (string)               – bold heading
 *   - description (string | React node) – supporting text
 *   - action     (React node)           – optional CTA (e.g. a <Button> or <Link>)
 *   - isDark     (bool)
 *   - className  (string)               – extra wrapper classes
 */
export default function EmptyState({
  icon,
  iconAlt = '',
  title,
  description,
  action,
  isDark = false,
  className = '',
}) {
  return (
    <div
      className={[
        'flex flex-col items-center justify-center text-center p-12 rounded-2xl border shadow-sm',
        isDark ? 'bg-[#1e2939] border-gray-700' : 'bg-white border-gray-100',
        className,
      ].join(' ')}
    >
      {/* Icon */}
      {icon && (
        typeof icon === 'string' ? (
          <img
            src={icon}
            alt={iconAlt}
            className="w-40 h-40 mb-6 object-contain"
            aria-hidden={!iconAlt}
          />
        ) : (
          <div className="mb-6">{icon}</div>
        )
      )}

      {/* Title */}
      {title && (
        <h3 className="text-xl font-bold mb-2">{title}</h3>
      )}

      {/* Description */}
      {description && (
        <p className={`text-sm max-w-md leading-relaxed mb-8 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          {description}
        </p>
      )}

      {/* Action */}
      {action && <div>{action}</div>}
    </div>
  )
}
