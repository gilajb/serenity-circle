import { CalendarDays, Mail, MessageCircle, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { currentYear } from '../lib/format.ts'
import { bookingHref, navLinks, site } from '../lib/site.ts'
import ButtonLink from './ButtonLink.tsx'
import Wordmark from './Wordmark.tsx'

const contactLinks = [
  { href: site.phoneHref, label: site.phoneDisplay, icon: Phone },
  { href: site.whatsappHref, label: 'Chat on WhatsApp', icon: MessageCircle },
  { href: site.emailHref, label: site.email, icon: Mail },
]

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-12 md:grid-cols-3">
        <div>
          <Wordmark />
          <p className="mt-4 max-w-xs text-sm text-white/80">{site.description}</p>
        </div>

        <nav aria-label="Quick links">
          <h2 className="font-sans text-sm font-bold text-white">Quick Links</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-white/80 hover:text-teal-500">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-sans text-sm font-bold text-white">Connect With Us</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {contactLinks.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a href={href} className="inline-flex items-center gap-2 text-white/80 hover:text-teal-500">
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <ButtonLink to={bookingHref} className="mt-5">
            <CalendarDays size={18} aria-hidden="true" />
            Book a Session
          </ButtonLink>
        </div>
      </div>

      <div className="border-t border-navy-700">
        <p className="mx-auto max-w-[1200px] px-5 py-5 text-xs text-white/70">
          © {currentYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
