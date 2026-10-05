import { CalendarDays, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { bookingHref, navLinks } from '../lib/site.ts'
import ButtonLink from './ButtonLink.tsx'
import Wordmark from './Wordmark.tsx'

function navClass({ isActive }: { isActive: boolean }) {
  return `border-b-2 py-1 text-sm font-semibold transition-colors ${
    isActive ? 'border-teal-500 text-teal-500' : 'border-transparent text-white hover:text-teal-500'
  }`
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 bg-navy-900">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-5 py-4">
        <Wordmark onClick={close} />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink to={bookingHref} onClick={close} className="px-4 sm:px-6">
            <CalendarDays size={18} aria-hidden="true" />
            Book a Session
          </ButtonLink>
          <button
            type="button"
            className="flex size-11 items-center justify-center rounded-full text-white hover:bg-navy-700 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="border-t border-navy-700 px-5 pb-5 lg:hidden"
        >
          <ul>
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  onClick={close}
                  className={({ isActive }) =>
                    `block py-3 text-base font-semibold ${isActive ? 'text-teal-500' : 'text-white'}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
