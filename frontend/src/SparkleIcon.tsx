import React from 'react'

export function SparkleIcon({ className = 'w-4 h-4 text-gold' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Central 4-pointed sparkle star outline */}
      <path d="M12 4.5C12 8.2 15.8 12 19.5 12C15.8 12 12 15.8 12 19.5C12 15.8 8.2 12 4.5 12C8.2 12 12 8.2 12 4.5Z" />
      {/* Plus sign at top right */}
      <path d="M19.2 2.5v3.5M17.5 4.25h3.5" strokeWidth="1.6" />
      {/* Solid dot at bottom left */}
      <circle cx="6.5" cy="18.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default SparkleIcon
