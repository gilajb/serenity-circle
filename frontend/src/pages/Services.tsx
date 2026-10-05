import { CalendarDays } from 'lucide-react'
import ButtonLink from '../components/ButtonLink.tsx'
import PageHero from '../components/PageHero.tsx'
import ServiceCard from '../components/ServiceCard.tsx'
import { services } from '../content/services.ts'
import { bookingHref } from '../lib/site.ts'

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Professional Support for a Healthier, Happier You"
        intro="At Serenity Circle+, we offer compassionate counselling to help you heal, grow and thrive — at every stage of life."
        accent="Your well-being is our priority"
      >
        <ButtonLink to={bookingHref}>
          <CalendarDays size={18} aria-hidden="true" />
          Book a Session
        </ButtonLink>
      </PageHero>

      <section className="mx-auto max-w-[1200px] px-5 py-16">
        <h2 className="text-3xl">What We Offer</h2>
        <p className="mt-3 max-w-2xl">
          One-to-one sessions by video call, for adults and children. Every session lasts 45
          minutes.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-5">
          {services.map((service) => (
            <div key={service.slug} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
