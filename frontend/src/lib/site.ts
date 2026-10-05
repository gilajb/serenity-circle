// The practice's real details. See docs/content-style-guide.md.
export const site = {
  name: 'Serenity Circle+',
  tagline: 'Heal, Grow and Thrive',
  description: 'Compassionate, professional counselling and therapy, for a healthier tomorrow.',
  phoneDisplay: '0707 176 183',
  phoneHref: 'tel:+254707176183',
  whatsappHref: 'https://wa.me/254707176183',
  email: 'evecmain@gmail.com',
  emailHref: 'mailto:evecmain@gmail.com',
} as const

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/services', label: 'Services' },
  { to: '/directory', label: 'Directory' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
] as const

// Online booking is off until the first therapist is published (FR-BKG-16),
// so "Book a Session" leads to the Contact page.
export const bookingHref = '/contact'
