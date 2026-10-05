import { CalendarDays } from 'lucide-react'
import ButtonLink from '../components/ButtonLink.tsx'
import PageHero from '../components/PageHero.tsx'
import { bookingHref } from '../lib/site.ts'

export default function About() {
  return (
    <PageHero
      eyebrow="About Us"
      title="Therapy Designed Around You"
      intro="Serenity Circle+ is a virtual individual therapy and counselling practice, focused on making professional emotional support more accessible, flexible, confidential and client-centred."
      accent="Your well-being matters."
    >
      <ButtonLink to={bookingHref}>
        <CalendarDays size={18} aria-hidden="true" />
        Book a Session
      </ButtonLink>
    </PageHero>
  )
}
