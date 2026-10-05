import PageHero from '../components/PageHero.tsx'

export default function Resources() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Support for Your Journey"
        intro="Articles and guides to help you look after your well-being."
      />
      <section className="mx-auto max-w-[1200px] px-5 py-16">
        <p className="rounded-card border border-line bg-teal-50 p-8 text-center">
          Our first articles are on the way.
        </p>
      </section>
    </>
  )
}
