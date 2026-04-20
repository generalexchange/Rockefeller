export function formatLongDate(iso: string, timeZone = 'America/New_York'): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone,
  }).format(d)
}

export function formatShortDate(iso: string, timeZone = 'America/New_York'): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone,
  }).format(d)
}

export function formatTime(iso: string, timeZone = 'America/New_York'): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone,
    timeZoneName: 'short',
  }).format(d)
}

export function estimateReadingTimeMinutes(text: string, wordsPerMinute = 200): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / wordsPerMinute))
}

export function absoluteUrl(path: string): string {
  const base = process.env.SITE_URL || 'https://rockefeller.press'
  const clean = path.startsWith('/') ? path : `/${path}`
  return `${base.replace(/\/$/, '')}${clean}`
}
