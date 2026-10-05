import type { ReactNode } from 'react'

interface Props {
  eyebrow?: string
  title: ReactNode
  intro: string
  accent?: string
  children?: ReactNode
}

export default function PageHero({ eyebrow, title, intro, accent, children }: Props) {
  return (
    <section className="bg-gradient-to-r from-cream-50 via-white to-teal-100">
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 px-5 py-14 md:grid-cols-[3fr_2fr] md:py-20">
        <div>
          {eyebrow && (
            <p className="mb-3 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.15em] text-teal-600">
              {eyebrow}
              <span className="h-px w-10 bg-gold-500" aria-hidden="true" />
            </p>
          )}
          <h1 className="text-4xl leading-tight md:text-5xl">{title}</h1>
          <p className="mt-4 max-w-xl text-lg">{intro}</p>
          {children && <div className="mt-7 flex flex-wrap gap-3">{children}</div>}
        </div>
        {accent && (
          <p
            aria-hidden="true"
            className="hidden -rotate-6 text-center font-script text-4xl text-teal-600 md:block"
          >
            {accent}
            <span className="mx-auto mt-2 block h-1 w-32 rounded-full bg-gold-500" />
          </p>
        )}
      </div>
    </section>
  )
}
