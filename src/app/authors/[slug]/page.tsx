import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllArticles } from '@/lib/articles'
import { SECTION_LABEL } from '@/lib/sections'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const slugs = [...new Set(getAllArticles().map((a) => a.author.slug))]
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sample = getAllArticles().find((a) => a.author.slug === slug)
  if (!sample) return { title: 'Contributor' }
  return {
    title: sample.author.name,
    description: `${sample.author.name} — ${sample.author.role}`,
  }
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params
  const articles = getAllArticles().filter((a) => a.author.slug === slug)
  if (articles.length === 0) notFound()

  const { name, role } = articles[0].author

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="border-b border-line pb-8">
        <h1 className="font-display text-4xl font-semibold text-ink">{name}</h1>
        <p className="mt-2 font-body text-lg text-muted">{role}</p>
      </header>
      <ul className="mt-10 divide-y divide-line">
        {articles.map((a) => (
          <li key={a.slug} className="py-8 first:pt-0">
            <p className="font-label text-[0.65rem] uppercase tracking-[0.2em] text-gold-dim">{SECTION_LABEL[a.section]}</p>
            <Link href={`/articles/${a.slug}`} className="headline-link mt-2 inline-block font-display text-xl font-semibold text-ink">
              {a.title}
            </Link>
            <p className="mt-2 font-body italic text-muted">{a.deck}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
