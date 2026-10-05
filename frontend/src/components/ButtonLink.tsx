import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'outline'

const variants: Record<Variant, string> = {
  primary: 'bg-gold-500 text-navy-900 hover:bg-gold-600',
  secondary: 'bg-teal-600 text-white hover:bg-navy-700',
  outline: 'border border-teal-600 bg-white text-teal-600 hover:bg-teal-50',
}

interface Props {
  to: string
  variant?: Variant
  className?: string
  onClick?: () => void
  children: ReactNode
}

export default function ButtonLink({
  to,
  variant = 'primary',
  className = '',
  onClick,
  children,
}: Props) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition-colors ${variants[variant]} ${className}`
  // External links (tel:, mailto:, https:) are plain anchors.
  if (/^[a-z]+:/i.test(to)) {
    return (
      <a href={to} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <Link to={to} className={classes} onClick={onClick}>
      {children}
    </Link>
  )
}
