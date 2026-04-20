import type { Section } from '@/types/article'

export const SECTION_LABEL: Record<Section, string> = {
  politics: 'Politics',
  business: 'Business',
  culture: 'Culture',
  opinion: 'Opinion',
  tech: 'Tech',
}

export const SECTION_ORDER: Section[] = [
  'politics',
  'business',
  'culture',
  'opinion',
  'tech',
]

export function isSection(value: string): value is Section {
  return (
    value === 'politics' ||
    value === 'business' ||
    value === 'culture' ||
    value === 'opinion' ||
    value === 'tech'
  )
}
