import React, { useEffect, useRef } from 'react'

/**
 * Accessible Modal component.
 *
 * Props:
 *   - isOpen      (bool)   – controls visibility
 *   - onClose     (fn)     – called when backdrop or close button is clicked
 *   - title       (string) – modal heading shown in the header
 *   - isDark      (bool)   – dark mode flag
 *   - maxWidth    (string) – Tailwind max-w class, default "max-w-md"
 *   - children              – modal body content
 *
 * Accessibility:
 *   - role="dialog" + aria-modal="true"
 *   - aria-labelledby tied to the h2 heading
 *   - Escape key closes the modal
 *   - Focus is trapped inside the dialog while open
 *   - On open, focus moves to the dialog container
 */
export default function Modal({ isOpen, onClose, title, isDark = false, maxWidth = 'max-w-md', children }) {
  const dialogRef = useRef(null)
  const titleId = React.useId()

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Focus trap: cyclically trap focus inside the dialog when opened
  useEffect(() => {
    if (!isOpen || !dialogRef.current) return
    const dialog = dialogRef.current
    
    const focusableElements = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (!focusableElements.length) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleTabKey = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement.focus()
        }
      }
    }

    dialog.addEventListener('keydown', handleTabKey)
    firstElement.focus()

    return () => dialog.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      aria-labelledby={titleId}
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Panel */}
      <div
        ref={dialogRef}
        className={[
          'relative w-full rounded-2xl border shadow-2xl p-6',
          'animate-in zoom-in-95 fade-in duration-200',
          maxWidth,
          isDark
            ? 'bg-[#1e2939] border-gray-700 text-white'
            : 'bg-white border-gray-200 text-gray-900',
        ].join(' ')}
        tabIndex={-1}
        style={{ outline: 'none' }}
      >
        {/* Header */}
        {title && (
          <h2
            id={titleId}
            className="text-xl font-bold mb-4"
          >
            {title}
          </h2>
        )}

        {/* Body */}
        {children}
      </div>
    </div>
  )
}
