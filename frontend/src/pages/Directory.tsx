import { Users } from 'lucide-react'
import ButtonLink from '../components/ButtonLink.tsx'
import PageHero from '../components/PageHero.tsx'

export default function Directory() {
  return (
    <>
      <PageHero
        eyebrow="Directory"
        title="Find Your Psychologist"
        intro="Connect with compassionate professionals dedicated to your mental well-being."
        accent="Your well-being matters"
      />

      {/* Coming-soon state (FR-DIR-07). Replaced by the live directory once
          the therapists API returns a published profile. */}
      <section className="mx-auto max-w-[1200px] px-5 py-16">
        <div className="mx-auto max-w-xl rounded-card border border-line bg-teal-50 p-10 text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
            <Users size={30} strokeWidth={1.75} aria-hidden="true" />
          </span>
          <h2 className="mt-5 text-2xl">Our therapists are coming soon</h2>
          <p className="mt-3">
            We are putting our team together. In the meantime, get in touch and we will be glad to
            help.
          </p>
          <ButtonLink to="/contact" variant="outline" className="mt-6">
            Contact Us
          </ButtonLink>
        </div>
      </section>
    </>
  )
}
