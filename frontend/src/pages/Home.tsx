import { ArrowRight, CalendarDays } from 'lucide-react'
import ButtonLink from '../components/ButtonLink.tsx'
import PageHero from '../components/PageHero.tsx'
import ServiceCard from '../components/ServiceCard.tsx'
import { services } from '../content/services.ts'
import { bookingHref } from '../lib/site.ts'

export default function Home() {
  return (
    <>
      <PageHero
        eyebrow="Individual Counselling"
        title={
          <>
            You Matter. Your Healing <em className="text-teal-600">Matters.</em>
          </>
        }
        intro="At Serenity Circle+, we provide a safe, supportive and confidential space where you can explore your thoughts, emotions and challenges — and find the tools to live a healthier, more fulfilling life."
        accent="A healthier you is possible"
      >
        <ButtonLink to={bookingHref}>
          <CalendarDays size={18} aria-hidden="true" />
          Book a Session
        </ButtonLink>
        <ButtonLink to="/about" variant="outline">
          Learn More
          <ArrowRight size={18} aria-hidden="true" />
        </ButtonLink>
      </PageHero>

      <section className="bg-navy-900 py-16">
        <div className="mx-auto max-w-[1200px] px-5">
          <p className="text-center text-sm font-bold uppercase tracking-[0.15em] text-teal-500">
            Our Services
          </p>
          <h2 className="mt-2 text-center text-3xl text-white">Individual Counselling Services</h2>
          <p className="mt-2 text-center text-white/80">
            Personalised support for your unique needs and goals.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-5">
            {services.map((service) => (
              <div key={service.slug} className="w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
