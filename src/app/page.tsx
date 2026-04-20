import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { SECTION_LABEL, SECTION_ORDER } from '@/lib/sections'
import type { ArticleMeta } from '@/types/article'
import { StoryCard } from '@/components/StoryCard'
import { FadeInCard } from '@/components/FadeInCard'
import { GrainImage } from '@/components/GrainImage'
import { SectionRail } from '@/components/SectionRail'
import { formatShortDate, formatTime } from '@/lib/format'

function pickHero(articles: ArticleMeta[]): ArticleMeta | undefined {
  const featured = articles.find((a) => a.featured)
  return featured ?? articles[0]
}

export default function HomePage() {
  const articles = getAllArticles()
  const hero = pickHero(articles)
  if (!hero) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <p className="font-body text-muted">No stories published yet.</p>
      </div>
    )
  }

  const rest = articles.filter((a) => a.slug !== hero.slug)
  const rail = rest.slice(0, 4)
  const desk = rest.slice(4, 7)

  const bySection = (id: ArticleMeta['section']) =>
    articles.filter((a) => a.section === id).slice(0, 3)

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-8">
          <article>
            <p className="font-label text-[0.65rem] uppercase tracking-[0.22em] text-gold-dim">
              {SECTION_LABEL[hero.section]}
            </p>
            <h1 className="font-display mt-3 text-[clamp(1.75rem,4vw,2.75rem)] font-semibold leading-[1.1] tracking-tight text-ink">
              <Link href={`/articles/${hero.slug}`} className="headline-link">
                {hero.title}
              </Link>
            </h1>
            <p className="mt-4 font-body text-lg italic leading-relaxed text-muted md:text-xl">{hero.deck}</p>
            <p className="mt-4 font-label text-xs text-muted">
              {hero.author.name} ·{' '}
              <time dateTime={hero.publishedAt}>
                {formatShortDate(hero.publishedAt)} · {formatTime(hero.publishedAt)}
              </time>
            </p>
            {hero.heroImage ? (
              <Link href={`/articles/${hero.slug}`} className="mt-8 block">
                <GrainImage
                  src={hero.heroImage.src}
                  alt={hero.heroImage.alt}
                  width={1200}
                  height={675}
                  priority
                  className="w-full"
                />
              </Link>
            ) : null}
          </article>
        </div>

        <aside className="border-t border-line pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <h2 className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-muted">Latest lines</h2>
          <ul className="mt-6 divide-y divide-line">
            {rail.map((article) => (
              <li key={article.slug} className="py-5 first:pt-0">
                <FadeInCard>
                  <StoryCard article={article} />
                </FadeInCard>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {desk.length > 0 ? (
        <section className="mt-16 border-t border-line pt-12" aria-labelledby="desk-rail">
          <h2 id="desk-rail" className="font-display text-2xl font-semibold tracking-tight text-ink">
            More from the desk
          </h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {desk.map((article) => (
              <FadeInCard key={article.slug}>
                <StoryCard article={article} />
              </FadeInCard>
            ))}
          </div>
        </section>
      ) : null}

      {SECTION_ORDER.map((sectionId) => (
        <SectionRail
          key={sectionId}
          sectionId={sectionId}
          label={SECTION_LABEL[sectionId]}
          articles={bySection(sectionId)}
        />
      ))}
    </div>
  )
}
