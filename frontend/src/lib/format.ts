// Kenyan formats. See docs/content-style-guide.md.
const TIME_ZONE = 'Africa/Nairobi'

export function formatKes(amount: number): string {
  return `KES ${new Intl.NumberFormat('en-KE', { maximumFractionDigits: 0 }).format(amount)}`
}

// Always East Africa Time, whatever the device's time zone.
export function formatDateTime(value: string | Date): string {
  const formatted = new Intl.DateTimeFormat('en-KE', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(value))
  return `${formatted} EAT`
}

export function currentYear(): string {
  return new Intl.DateTimeFormat('en-KE', { timeZone: TIME_ZONE, year: 'numeric' }).format(
    new Date(),
  )
}
