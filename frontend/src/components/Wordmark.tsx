import { Link } from 'react-router-dom'
import { site } from '../lib/site.ts'

// Text wordmark. Swap for the logo artwork once the source file is supplied.
export default function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="inline-block leading-none" aria-label={`${site.name} home`}>
      <span className="block font-serif text-2xl font-bold text-white">
        Serenity <span className="text-gold-500">Circle+</span>
      </span>
      <span className="mt-1 block text-[11px] font-semibold tracking-wide text-teal-500">
        {site.tagline}
      </span>
    </Link>
  )
}
