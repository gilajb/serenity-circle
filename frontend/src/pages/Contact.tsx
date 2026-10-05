import { Mail, MessageCircle, Phone } from 'lucide-react'
import PageHero from '../components/PageHero.tsx'
import { site } from '../lib/site.ts'

const methods = [
  { href: site.phoneHref, title: 'Call us', label: site.phoneDisplay, icon: Phone },
  { href: site.whatsappHref, title: 'WhatsApp', label: 'Chat on WhatsApp', icon: MessageCircle },
  { href: site.emailHref, title: 'Email', label: site.email, icon: Mail },
]

export default function Contact() {
  return (
    <>
      <PageHero
        title="Let’s Connect"
        intro="We’re here to listen and support you. Reach out with any questions, concerns or to simply start a conversation."
        accent="You’re not alone. We’re here."
      />

      <section className="mx-auto max-w-[1200px] px-5 py-16">
        <div className="rounded-card border border-line bg-white p-8 shadow-sm">
          <h2 className="text-2xl">Get in Touch</h2>
          <p className="mt-2">All our sessions are held online, by video call.</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {methods.map(({ href, title, label, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="flex items-center gap-4 rounded-field border border-line bg-teal-50 p-4 hover:border-teal-600"
                >
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                    <Icon size={22} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy-900">{title}</span>
                    <span className="block text-sm break-all">{label}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
