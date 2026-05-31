import React from 'react'

export default function PasswordStrength({ password, theme }) {
  if (!password) return null

  const hasLetter = /[a-zA-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasLower = /[a-z]/.test(password)
  const hasUpper = /[A-Z]/.test(password)
  const hasSpecial = /[^A-Za-z0-9]/.test(password)

  let score = 0
  if (password.length >= 6) {
    if (hasLetter && hasNumber) {
      score = 2 // Medium
      if (password.length >= 8 && hasLower && hasUpper && hasSpecial) {
        score = 3 // Strong
      }
    } else {
      score = 1 // Weak
    }
  } else {
    score = 1 // Weak
  }

  let label = ''
  let barColor = ''
  let textColor = ''
  let progressWidth = ''

  if (score === 1) {
    label = 'Lemah'
    barColor = 'bg-[#fb2c36]'
    textColor = 'text-[#fb2c36]'
    progressWidth = 'w-1/3'
  } else if (score === 2) {
    label = 'Sedang'
    barColor = 'bg-[#f0b100]'
    textColor = 'text-[#f0b100]'
    progressWidth = 'w-2/3'
  } else {
    label = 'Kuat'
    barColor = 'bg-[#00c950]'
    textColor = 'text-[#00c950]'
    progressWidth = 'w-full'
  }

  return (
    <div className="mt-2 flex h-[16px] w-full items-center gap-[8px] justify-between">
      {/* Outer progress bar */}
      <div 
        className={`h-[4px] flex-1 rounded-[24403200px] overflow-hidden ${
          theme === 'dark' ? 'bg-[#364153]' : 'bg-[#e5e7eb]'
        }`}
      >
        {/* Inner dynamic fill */}
        <div className={`h-full ${barColor} ${progressWidth} transition-all duration-300 rounded-[24403200px]`} />
      </div>
      {/* Label Text */}
      <div className="shrink-0 flex items-start">
        <p className={`font-sans font-medium text-[12px] leading-[16px] whitespace-nowrap ${textColor}`}>
          {label}
        </p>
      </div>
    </div>
  )
}
