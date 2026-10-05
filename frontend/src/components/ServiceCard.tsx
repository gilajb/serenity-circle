import type { Service } from '../content/services.ts'

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon
  return (
    <article className="rounded-card border border-line bg-white p-6 shadow-sm">
      <span className="flex size-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
        <Icon size={30} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="mt-4 text-lg">{service.name}</h3>
      <p className="mt-2 text-sm">{service.summary}</p>
      <p className="mt-4 inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold text-teal-600">
        45 min · Video Call
      </p>
    </article>
  )
}
