import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getArticlesBySection } from '@/lib/articles'
import { isSection, SECTION_LABEL, SECTION_ORDER } from '@/lib/sections'
import type { Section } from '@/types/article'
import { StoryCard } from '@/components/StoryCard'

type Props = { params: Promise<{ section: string }> }

export function generateStaticParams() {
  return SECTION_ORDER.map((section) => ({ section }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params
  if (!isSection(section)) return { title: 'Not found' }
  const label = SECTION_LABEL[section]
  return {
    title: label,
    description: `Reporting and analysis from the ${label} desk at Rockefeller.press.`,
    openGraph: {
      title: `${label} · Rockefeller.press`,
    },
  }
}

export default async function SectionPage({ params }: Props) {
  const { section: raw } = await params
  if (!isSection(raw)) notFound()
  const section = raw as Section
  const articles = getArticlesBySection(section)
  const label = SECTION_LABEL[section]

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="border-b border-line pb-8">
        <p className="font-label text-[0.65rem] uppercase tracking-[0.22em] text-gold-dim">Section</p>
        <h1 className="font-display mt-3 text-4xl font-semibold tracking-tight text-ink md:text-5xl">{label}</h1>
        <p className="mt-4 max-w-2xl font-body text-lg text-muted">
          Stories filed under {label.toLowerCase()}, updated as the news breaks.
        </p>
      </header>

      {articles.length === 0 ? (
        <p className="mt-12 font-body text-muted">No stories in this section yet.</p>
      ) : (
        <ul className="mt-12 divide-y divide-line">
          {articles.map((article) => (
            <li key={article.slug} className="py-10 first:pt-0">
              <StoryCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
